/**
 * Send a test email for every email type.
 *
 * Usage:
 *   npx tsx scripts/test-all-emails.ts [recipient-email]
 *
 * If no recipient is provided, it defaults to EMAIL_TO from .env.
 * Requires RESEND_API_KEY and EMAIL_FROM to be set.
 */

import "dotenv/config";
import mongoose from "mongoose";
import {
  sendVerificationEmail,
  sendOrderConfirmationEmail,
  sendDeliveryEmail,
  sendAlreadyRegisteredEmail,
  sendAlreadyActivatedEmail,
  sendAccountNotFoundEmail,
  sendResetPasswordEmail,
  sendRefundSuccessEmail,
  sendRefundFailedEmail,
  sendOrderCancelledEmail,
  OrderEmailData,
} from "../lib/email";

// Mock Data
const randomOrderId = Array.from({ length: 24 }, () =>
  Math.floor(Math.random() * 16).toString(16),
).join("");

const sampleUser = {
  fname: "TestUser",
  lname: "Smith",
  email: "test@example.com", // Will be overwritten by recipient arg
  phone: "0412345678",
  address: {
    line1: "123 Tea Street",
    line2: "Unit 1",
    suburb: "Sydney",
    state: "NSW",
    postcode: "2000",
    country: "Australia",
  },
};

const sampleOrder: OrderEmailData = {
  orderId: randomOrderId,
  buyer: sampleUser,
  delivery: sampleUser,
  productList: [
    {
      product_id: new mongoose.Types.ObjectId("64e62a221234567890abcdef"), // Valid mock ID
      name: "Organic Oolong Tea",
      imageUrl: "",
      nameCN: "有机乌龙茶",
      price: 28.5,
      discount: 0,
      GST: 2.59,
      unit: "50g",
      quantity: 2,
    },
  ],
  postage: 10.0,
  GSTTotal: 6.68,
  orderTotal: 67.0,
  discountTotal: 0,
  paidDate: new Date().toISOString(),
  paymentId: "pi_test_12345",
  receiptUrl: "https://receipt.stripe.com/test",
  receipt: "1234-5678",
};

async function main() {
  const recipient = process.argv[2] || process.env.EMAIL_TO;

  if (!recipient) {
    console.error("❌ No recipient. Pass an email or set EMAIL_TO in .env");
    process.exit(1);
  }

  console.log(`📧 Sending all test emails to: ${recipient}`);

  // Override email in sample data
  sampleUser.email = recipient;
  sampleOrder.buyer.email = recipient;
  sampleOrder.delivery.email = recipient;

  console.log("\n1. Testing Verification Email...");
  await sendVerificationEmail(recipient, "TestUser", "mock-token-123");

  console.log("2. Testing Order Confirmation Email...");
  await sendOrderConfirmationEmail(sampleOrder);

  console.log("3. Testing Delivery Email...");
  await sendDeliveryEmail(sampleOrder);

  console.log("4. Testing Already Registered Email...");
  await sendAlreadyRegisteredEmail(recipient, "TestUser");

  console.log("5. Testing Already Activated Email...");
  await sendAlreadyActivatedEmail(recipient, "TestUser");

  console.log("6. Testing Account Not Found Email...");
  await sendAccountNotFoundEmail(recipient);

  console.log("7. Testing Reset Password Email...");
  await sendResetPasswordEmail(recipient, "TestUser", "mock-reset-token-456");

  console.log("8. Testing Refund Success Email...");
  await sendRefundSuccessEmail(
    recipient,
    randomOrderId,
    25.0,
    "Customer Request",
  );

  console.log("9. Testing Refund Failed Email...");
  await sendRefundFailedEmail(recipient, randomOrderId, 25.0);

  console.log(
    "10. Testing Order Cancelled Email (Does not trigger Stripe refund in this script)...",
  );
  await sendOrderCancelledEmail({
    ...sampleOrder,
  });

  console.log("\n✅ All test emails triggered!");
}

main();
