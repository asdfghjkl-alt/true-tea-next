"use client";

import { IUserDetails } from "@/database";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "@/components/ui/inputs/InputField";
import { joiResolver } from "@hookform/resolvers/joi";
import { userDetailsSchema } from "@/lib/schemas";
import api from "@/lib/axios";

interface CheckoutDetailsProps {
  // Function for handling proceeding to next step
  onProceed: (billing: IUserDetails, delivery: IUserDetails) => void;
  // Function for handling going back to previous step
  onBack: () => void;
}

export default function CheckoutDetails({
  onProceed,
  onBack,
}: CheckoutDetailsProps) {
  // State for toggling between same as billing and different delivery address
  const [sameAsBilling, setSameAsBilling] = useState(true);

  // React Hook Form for billing details
  const {
    register: registerBilling,
    formState: { errors: errorsBilling },
    trigger: triggerBilling,
    getValues: getValuesBilling,
    reset: resetBilling,
  } = useForm<IUserDetails>({
    resolver: joiResolver(userDetailsSchema),
    mode: "onTouched",
    defaultValues: {
      address: { country: "Australia" },
    },
  });

  // Fetch user details locally to pre-fill form
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/users/me");
        if (data.user) {
          const u = data.user;

          // Default user billing details
          const billingDefaults: IUserDetails = {
            fname: u.fname || "",
            lname: u.lname || "",
            email: u.email || "",
            phone: u.phone || "",
            address: {
              line1: u.address?.line1 || "",
              line2: u.address?.line2 || "",
              suburb: u.address?.suburb || "",
              state: u.address?.state || "",
              postcode: u.address?.postcode || "",
              country: "Australia",
            },
          };

          resetBilling(billingDefaults);
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };
    fetchUser();
  }, [resetBilling]);

  // React Hook Form for delivery details
  const {
    register: registerDelivery,
    formState: { errors: errorsDelivery },
    trigger: triggerDelivery,
    getValues: getValuesDelivery,
  } = useForm<IUserDetails>({
    resolver: joiResolver(userDetailsSchema),
    mode: "onTouched",
    defaultValues: {
      address: { country: "Australia" },
    },
  });

  // Function for handling form submission
  const onSubmit = async () => {
    // Run all validations on billing
    const isBillingValid = await triggerBilling();
    let isDeliveryValid = true;

    // Run all validators on delivery if not same as billing
    if (!sameAsBilling) {
      isDeliveryValid = await triggerDelivery();
    }

    if (isBillingValid && isDeliveryValid) {
      const billingData = getValuesBilling();
      const deliveryData = sameAsBilling ? billingData : getValuesDelivery();

      // Calls proceeding, with storing of billing data and delivery data
      onProceed(billingData, sameAsBilling ? billingData : deliveryData);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Heading */}
      <h2 className="text-xl font-semibold mb-6">Billing & Delivery Details</h2>

      {/* Form for billing and delivery details */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {/* Billing Details */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Billing Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name Input */}
            <InputField
              label="First Name"
              name="fname"
              placeholder=""
              register={registerBilling}
              error={errorsBilling.fname}
            />
            {/* Last Name Input */}
            <InputField
              label="Last Name"
              name="lname"
              placeholder=""
              register={registerBilling}
              error={errorsBilling.lname}
            />
            {/* Email Input */}
            <div className="md:col-span-2">
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder=""
                register={registerBilling}
                error={errorsBilling.email}
              />
            </div>
            {/* Phone Input */}
            <div>
              <InputField
                label="Phone"
                name="phone"
                placeholder=""
                register={registerBilling}
                error={errorsBilling.phone}
              />
            </div>
            {/* Address Line 1 Input */}
            <div className="md:col-span-2">
              <InputField
                label="Address Line 1"
                name="address.line1"
                placeholder=""
                register={registerBilling}
                error={errorsBilling.address?.line1}
              />
            </div>
            {/* Address Line 2 Input */}
            <div className="md:col-span-2">
              <InputField
                label="Address Line 2 (Optional)"
                name="address.line2"
                placeholder=""
                register={registerBilling}
                error={errorsBilling.address?.line2}
              />
            </div>
            {/* Suburb Input */}
            <div>
              <InputField
                label="Suburb"
                name="address.suburb"
                placeholder=""
                register={registerBilling}
                error={errorsBilling.address?.suburb}
              />
            </div>
            {/* State Input */}
            <div>
              <InputField
                label="State"
                name="address.state"
                placeholder=""
                register={registerBilling}
                error={errorsBilling.address?.state}
              />
            </div>
            {/* Postcode Input */}
            <div>
              <InputField
                label="Postcode"
                name="address.postcode"
                placeholder=""
                register={registerBilling}
                error={errorsBilling.address?.postcode}
              />
            </div>
            {/* Country Input - Hardcoded to Australia */}
            <div>
              <label className="font-medium block text-left">Country</label>
              <div className="p-3 bg-gray-100 border border-gray-300 rounded text-gray-500">
                Australia
              </div>
              <input
                type="hidden"
                {...registerBilling("address.country")}
                value="Australia"
              />
            </div>
          </div>
        </div>

        {/* Delivery Details Toggle */}
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="sameAsBilling"
            checked={sameAsBilling}
            onChange={(e) => setSameAsBilling(e.target.checked)}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label
            htmlFor="sameAsBilling"
            className="ml-2 block text-sm text-gray-900"
          >
            Delivery details same as billing
          </label>
        </div>

        {/* Delivery Details Form */}
        {!sameAsBilling && (
          <div className="mb-8 border-t pt-6">
            {/* Delivery Details Heading */}
            <h3 className="text-lg font-medium mb-4">Delivery Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name Input */}
              <InputField
                label="First Name"
                name="fname"
                placeholder=""
                register={registerDelivery}
                error={errorsDelivery.fname}
              />
              {/* Last Name Input */}
              <InputField
                label="Last Name"
                name="lname"
                placeholder=""
                register={registerDelivery}
                error={errorsDelivery.lname}
              />
              {/* Email Input */}
              <div className="md:col-span-2">
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder=""
                  register={registerDelivery}
                  error={errorsDelivery.email}
                />
              </div>
              {/* Phone Input */}
              <div>
                <InputField
                  label="Phone"
                  name="phone"
                  placeholder=""
                  register={registerDelivery}
                  error={errorsDelivery.phone}
                />
              </div>
              {/* Address Line 1 Input */}
              <div className="md:col-span-2">
                <InputField
                  label="Address Line 1"
                  name="address.line1"
                  placeholder=""
                  register={registerDelivery}
                  error={errorsDelivery.address?.line1}
                />
              </div>
              {/* Address Line 2 Input */}
              <div className="md:col-span-2">
                <InputField
                  label="Address Line 2 (Optional)"
                  name="address.line2"
                  placeholder=""
                  register={registerDelivery}
                  error={errorsDelivery.address?.line2}
                />
              </div>
              {/* Suburb Input */}
              <div>
                <InputField
                  label="Suburb"
                  name="address.suburb"
                  placeholder=""
                  register={registerDelivery}
                  error={errorsDelivery.address?.suburb}
                />
              </div>
              {/* State Input */}
              <div>
                <InputField
                  label="State"
                  name="address.state"
                  placeholder=""
                  register={registerDelivery}
                  error={errorsDelivery.address?.state}
                />
              </div>
              {/* Postcode Input */}
              <div>
                <InputField
                  label="Postcode"
                  name="address.postcode"
                  placeholder=""
                  register={registerDelivery}
                  error={errorsDelivery.address?.postcode}
                />
              </div>
              {/* Country Input - Hardcoded to Australia */}
              <div>
                <label className="font-medium block text-left">Country</label>
                <div className="p-3 bg-gray-100 border border-gray-300 rounded text-gray-500">
                  Australia
                </div>
                <input
                  type="hidden"
                  {...registerDelivery("address.country")}
                  value="Australia"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded font-medium hover:bg-primary/90 transition-colors"
          >
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
}
