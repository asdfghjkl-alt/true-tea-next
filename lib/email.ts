import { Resend } from "resend";
import VerificationEmail from "@/components/emails/VerificationEmail";

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
