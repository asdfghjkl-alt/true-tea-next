"use client";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useOrder } from "@/contexts/OrderContext";
import { IUserDetails } from "@/database";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import { ValidatedCartItem } from "@/app/checkout/page";

interface CheckoutPaymentProps {
  userDetails: {
    billing: IUserDetails;
    delivery: IUserDetails;
  } | null;
  validatedCart: ValidatedCartItem[];
  onSuccess: () => void;
  onError: (message: string, paymentId?: string) => void;
  onBack: () => void;
}

export default function CheckoutPayment({
  userDetails,
  validatedCart,
  onSuccess,
  onError,
  onBack,
}: CheckoutPaymentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { resetCart } = useOrder();
  const { user } = useAuth();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !userDetails) {
      return;
    }

    setLoading(true);

    try {
      // Confirm Payment Success with Stripe
      const { error: paymentError, paymentIntent } =
        await stripe.confirmPayment({
          elements,
          redirect: "if_required", // Important: handling redirect manually if needed, or staying on page
          confirmParams: {
            payment_method_data: {
              billing_details: {
                name: `${userDetails.billing.fname} ${userDetails.billing.lname}`,
                email: userDetails.billing.email,
                phone: userDetails.billing.phone,
                address: {
                  line1: userDetails.billing.address.line1,
                  line2: userDetails.billing.address.line2 || undefined,
                  city: userDetails.billing.address.suburb,
                  state: userDetails.billing.address.state,
                  postal_code: userDetails.billing.address.postcode,
                  country: "AU",
                },
              },
            },
          },
        });

      // Handle Payment Error
      if (paymentError) {
        toast.error(paymentError.message || "An unexpected error occurred.");
        setLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        // Create Order in Backend
        try {
          await api.post("/orders", {
            cart: validatedCart,
            buyer: userDetails.billing,
            delivery: userDetails.delivery,
            paymentId: paymentIntent.id,
            amount: paymentIntent.amount,
            owner_id: user?._id || "guest",
          });
        } catch (e) {
          if (e instanceof AxiosError) {
            onError(
              e.response?.data.message || "An unexpected error occurred.",
              paymentIntent.id,
            );
          } else if (e instanceof Error) {
            onError(e.message, paymentIntent.id);
          } else {
            onError("An unexpected error occurred.", paymentIntent.id);
          }
          return;
        }

        // On Success
        resetCart();
        onSuccess();
      }
    } catch (error: any) {
      // Handle Unexpected Errors
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message ||
            "An error occurred during payment processing.",
        );
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Payment</h2>
      <form onSubmit={handleSubmit}>
        <PaymentElement
          options={{
            fields: { billingDetails: { address: { country: "never" } } },
          }}
        />

        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!stripe || loading}
            className="px-6 py-2 bg-primary text-white rounded font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay now"}
          </button>
        </div>
      </form>
    </div>
  );
}
