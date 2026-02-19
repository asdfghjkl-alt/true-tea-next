"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "@/contexts/OrderContext";
import CheckoutReview from "@/components/checkout/CheckoutReview";
import CheckoutDetails from "@/components/checkout/CheckoutDetails";
import CheckoutPayment from "@/components/checkout/CheckoutPayment";
import { IOrderProductFrontend, IUserDetails } from "@/database";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

// Initialize Stripe outside of component to avoid recreating stripe object on every render
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

type CheckoutStep = "review" | "details" | "payment" | "success" | "error";

export interface ValidatedCartItem extends IOrderProductFrontend {
  stock: number;
}

export default function CheckoutPage() {
  // Router for redirects
  const router = useRouter();

  // Gets cart from order context
  const { cart } = useOrder();

  // Stores the current step the user is at in the order
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("review");

  // Sets the validated cart from the backend
  const [validatedCart, setValidatedCart] = useState<ValidatedCartItem[]>([]);

  // User details for billing and delivery (Used in checkout details)
  const [userDetails, setUserDetails] = useState<{
    billing: IUserDetails;
    delivery: IUserDetails;
  } | null>(null);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [errorData, setErrorData] = useState<{
    message: string;
    paymentId?: string;
  } | null>(null);

  // At any step, redirect if cart is empty and not in success state
  useEffect(() => {
    if (cart.length === 0 && currentStep !== "success") {
      router.push("/cart");
    }
  }, [cart, currentStep, router]);

  // Handler when user has reviewed the changes to their order
  const handleReviewComplete = (items: ValidatedCartItem[]) => {
    setValidatedCart(items);
    setCurrentStep("details");
  };

  // Obtains the user's billing details from the form and stores it in state
  const handleDetailsComplete = async (
    billing: IUserDetails,
    delivery: IUserDetails,
  ) => {
    setUserDetails({ billing, delivery });

    // Create PaymentIntent
    try {
      const { data } = await api.post("/checkout/create-payment-intent", {
        cart: validatedCart,
        buyer: billing,
        delivery: delivery,
      });

      setClientSecret(data.clientSecret);
      setCurrentStep("payment");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.error ||
            "Failed to initialize payment. Please try again.",
        );
      } else {
        toast.error("Failed to initialize payment. Please try again.");
      }
    }
  };

  const handlePaymentSuccess = () => {
    setCurrentStep("success");
  };

  const handlePaymentError = (message: string, paymentId?: string) => {
    setErrorData({ message, paymentId });
    setCurrentStep("error");
  };

  // Renders nothing while useEffect processes redirect
  if (cart.length === 0 && currentStep !== "success") {
    return null;
  }

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-primary">Checkout</h1>

      {/* Progress Indicator for steps */}
      {currentStep !== "error" && (
        <div className="flex justify-between max-w-md mx-auto mb-8 text-sm">
          {/* Indicating at Review Stage */}
          <span
            className={
              currentStep === "review"
                ? "font-bold text-primary"
                : "text-gray-500"
            }
          >
            Review
          </span>
          <span className="text-gray-500">&gt;</span>
          {/* Indicating at Details Stage */}
          <span
            className={
              currentStep === "details"
                ? "font-bold text-primary"
                : "text-gray-500"
            }
          >
            Details
          </span>
          <span className="text-gray-500">&gt;</span>
          {/* Indicating at Payment Stage */}
          <span
            className={
              currentStep === "payment"
                ? "font-bold text-primary"
                : "text-gray-500"
            }
          >
            Payment
          </span>
        </div>
      )}

      {/* Review Stage */}
      {currentStep === "review" && (
        <CheckoutReview onProceed={handleReviewComplete} />
      )}

      {/* Details Stage */}
      {currentStep === "details" && (
        <CheckoutDetails
          onProceed={handleDetailsComplete}
          onBack={() => setCurrentStep("review")}
        />
      )}

      {/* Payment Stage */}
      {currentStep === "payment" && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          {/* Stripe Elements wrapper for payment, passes clientSecret to Stripe */}
          {/* This is a context wrapper for Stripe */}
          <CheckoutPayment
            userDetails={userDetails}
            validatedCart={validatedCart}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            onBack={() => setCurrentStep("details")}
          />
        </Elements>
      )}

      {/* Error Stage */}
      {currentStep === "error" && errorData && (
        <div className="text-center py-20 bg-red-50 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-red-600 mb-4">
            Order Creation Failed
          </h2>
          <p className="mb-4 text-lg px-6">
            We processed your payment, but could not create your order. Please
            check your email to see if a refund was automatically processed. If
            you do not receive an email, please contact support immediately.
          </p>
          <div className="bg-white p-6 rounded shadow-sm inline-block text-left mb-6">
            <p className="font-semibold mb-2">Please contact support:</p>
            <p className="mb-1">
              Email:{" "}
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_TO || "info@true-tea.com.au"}`}
                className="text-primary underline"
              >
                {process.env.NEXT_PUBLIC_EMAIL_TO || "info@true-tea.com.au"}
              </a>
            </p>
            {errorData.paymentId && (
              <p className="mb-1 font-mono bg-gray-100 p-1 rounded">
                Payment ID: {errorData.paymentId}
              </p>
            )}
            <p className="text-sm text-gray-500 mt-4">
              Error Details: {errorData.message}
            </p>
          </div>
          <div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 border border-primary text-primary rounded hover:bg-primary/5 mr-4"
            >
              Refresh Page
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              Return Home
            </button>
          </div>
        </div>
      )}

      {/* Success Stage */}
      {currentStep === "success" && (
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Order Placed Successfully!
          </h2>
          <p className="mb-8">Thank you for your purchase.</p>
          <button
            onClick={() => router.push("/products")}
            className="px-6 py-2 bg-primary text-white rounded"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </main>
  );
}
