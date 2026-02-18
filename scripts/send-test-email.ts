/**
 * Send a test order confirmation email with sample data.
 *
 * Usage:
 *   npx tsx scripts/send-test-email.ts [recipient-email]
 *
 * If no recipient is provided, it defaults to EMAIL_TO from .env.
 * Requires RESEND_API_KEY and EMAIL_FROM to be set.
 */

import "dotenv/config";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { OrderEmail } from "../components/emails/OrderEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

// Generate a random 24-char hex string to simulate a MongoDB ObjectID
const randomOrderId = Array.from({ length: 24 }, () =>
  Math.floor(Math.random() * 16).toString(16),
).join("");

const sampleOrder = {
  orderId: randomOrderId,
  buyer: {
    fname: "Jane",
    lname: "Smith",
    email: "jane@example.com",
    phone: "0412345678",
    address: {
      line1: "123 Tea Street",
      line2: "",
      suburb: "Chatswood",
      state: "NSW",
      postcode: "2067",
      country: "Australia",
    },
  },
  delivery: {
    fname: "Jane",
    lname: "Smith",
    email: "jane@example.com",
    phone: "0412345678",
    address: {
      line1: "123 Tea Street",
      line2: "Unit 4",
      suburb: "Chatswood",
      state: "NSW",
      postcode: "2067",
      country: "Australia",
    },
  },
  productList: [
    {
      product_id: "1",
      name: "Organic Oolong Tea",
      imageUrl: "",
      nameCN: "有机乌龙茶",
      price: 28.5,
      discount: 0,
      GST: 2.59,
      unit: "50g",
      quantity: 2,
    },
    {
      product_id: "2",
      name: "Premium Pu-erh Cake",
      imageUrl: "",
      nameCN: "普洱茶饼",
      price: 45.0,
      discount: 10,
      GST: 4.09,
      unit: "357g",
      quantity: 1,
    },
  ],
  postage: 0,
  GSTTotal: 6.68,
  orderTotal: 102.0,
  discountTotal: 4.5,
  paidDate: new Date().toISOString(),
  paymentId: "pi_3ABC123DEF456GHI789JKL0",
  receiptUrl: "https://receipt.stripe.com/example",
  receipt: "1234-5678",
};

async function main() {
  const recipient = process.argv[2] || process.env.EMAIL_TO;

  if (!recipient) {
    console.error("❌ No recipient. Pass an email or set EMAIL_TO in .env");
    process.exit(1);
  }
  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY is not set in .env");
    process.exit(1);
  }
  if (!process.env.EMAIL_FROM) {
    console.error("❌ EMAIL_FROM is not set in .env");
    process.exit(1);
  }

  console.log(`📧 Sending test order email to: ${recipient}`);

  const html = await render(OrderEmail(sampleOrder));

  const { data, error } = await resend.emails.send({
    from: `True Tea <${process.env.EMAIL_FROM}>`,
    to: recipient,
    subject: `[TEST] Order Confirmation - #${sampleOrder.orderId.slice(-6)}`,
    html,
  });

  if (error) {
    console.error("❌ Failed to send:", error);
    process.exit(1);
  }

  console.log("✅ Email sent successfully!");
  console.log("   ID:", data?.id);
}

main();
