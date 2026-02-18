import { Resend } from "resend";
import VerificationEmail from "@/components/emails/VerificationEmail";
import OrderEmail from "@/components/emails/OrderEmail";
import DeliveryEmail from "@/components/emails/DeliveryEmail";
import AlreadyRegisteredEmail from "@/components/emails/AlreadyRegisteredEmail";
import AlreadyActivatedEmail from "@/components/emails/AlreadyActivatedEmail";
import AccountNotFoundEmail from "@/components/emails/AccountNotFoundEmail";
import { IOrderProduct, IUserDetails } from "@/database";

const resend = new Resend(process.env.RESEND_API_KEY);
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const sendVerificationEmail = async (
  email: string,
  fname: string,
  token: string,
) => {
  if (!process.env.RESEND_API_KEY) {
    console.log(
      "RESEND_API_KEY is not set. Verification link:",
      `${APP_URL}/verify-email?token=${token}`,
    );
    return true; // Simulate success in dev without key
  }

  const confirmLink = `${APP_URL}/verify-email?token=${token}`;

  try {
    // Sends verification email to user with react component of VerificationEmail
    await resend.emails.send({
      from: `True Tea <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Verify your email",
      react: VerificationEmail({ confirmLink, fname }),
    });
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    return false;
  }
};

interface OrderEmailData {
  orderId: string;
  buyer: IUserDetails;
  delivery: IUserDetails;
  productList: IOrderProduct[];
  postage: number;
  GSTTotal: number;
  orderTotal: number;
  discountTotal: number;
  paidDate: string;
  paymentId: string;
  receiptUrl?: string;
  receipt?: string;
}

/**
 * Sends order confirmation emails to the buyer and store owner
 * @param orderData Order data for the email template
 * @returns true if emails were sent successfully
 */
export const sendOrderConfirmationEmail = async (orderData: OrderEmailData) => {
  if (!process.env.RESEND_API_KEY) {
    console.log("RESEND_API_KEY is not set. Order email skipped.");
    return true;
  }

  const emailContent = OrderEmail(orderData);
  const from = `True Tea <${process.env.EMAIL_FROM}>`;
  const subject = `Order Confirmation - #${orderData.orderId.slice(-6)}`;

  // Build list of recipients: buyer email + store owner (EMAIL_TO)
  const recipients: string[] = [orderData.buyer.email];
  if (process.env.EMAIL_TO && process.env.EMAIL_TO !== orderData.buyer.email) {
    recipients.push(process.env.EMAIL_TO);
  }

  try {
    // Send to all recipients using batch send
    await resend.batch.send(
      recipients.map((to) => ({
        from,
        to,
        subject,
        react: emailContent,
      })),
    );
    return true;
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    return false;
  }
};

/**
 * Sends order delivery email to the buyer
 * @param orderData Order data for the email template
 * @returns true if email was sent successfully
 */
export const sendDeliveryEmail = async (orderData: OrderEmailData) => {
  if (!process.env.RESEND_API_KEY) {
    console.log("RESEND_API_KEY is not set. Delivery email skipped.");
    return true;
  }

  const emailContent = DeliveryEmail(orderData);
  const from = `True Tea <${process.env.EMAIL_FROM}>`;
  const subject = `Order Delivered - #${orderData.orderId.slice(-6)}`;

  try {
    await resend.emails.send({
      from,
      to: orderData.buyer.email,
      subject,
      react: emailContent,
    });
    return true;
  } catch (error) {
    console.error("Error sending delivery email:", error);
    return false;
  }
};

/**
 * Sends email to user indicating they already have an account
 * @param email User's email
 * @param fname User's first name
 * @returns true if email was sent successfully
 */
export const sendAlreadyRegisteredEmail = async (
  email: string,
  fname: string,
) => {
  if (!process.env.RESEND_API_KEY) {
    console.log("RESEND_API_KEY is not set. Already Registered email skipped.");
    return true;
  }

  try {
    await resend.emails.send({
      from: `True Tea <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "You already have an account",
      react: AlreadyRegisteredEmail({ fname }),
    });
    return true;
  } catch (error) {
    console.error("Error sending already registered email:", error);
    return false;
  }
};

/**
 * Sends email to user indicating their account is already activated
 * @param email User's email
 * @param fname User's first name
 * @returns true if email was sent successfully
 */
export const sendAlreadyActivatedEmail = async (
  email: string,
  fname: string,
) => {
  if (!process.env.RESEND_API_KEY) {
    console.log("RESEND_API_KEY is not set. Already Activated email skipped.");
    return true;
  }

  try {
    await resend.emails.send({
      from: `True Tea <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Your account is already active",
      react: AlreadyActivatedEmail({ fname }),
    });
    return true;
  } catch (error) {
    console.error("Error sending already activated email:", error);
    return false;
  }
};

/**
 * Sends email to user indicating no account was found for their email
 * @param email User's email
 * @returns true if email was sent successfully
 */
export const sendAccountNotFoundEmail = async (email: string) => {
  if (!process.env.RESEND_API_KEY) {
    console.log("RESEND_API_KEY is not set. Account Not Found email skipped.");
    return true;
  }

  try {
    await resend.emails.send({
      from: `True Tea <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Verification Request",
      react: AccountNotFoundEmail({ email }),
    });
    return true;
  } catch (error) {
    console.error("Error sending account not found email:", error);
    return false;
  }
};
