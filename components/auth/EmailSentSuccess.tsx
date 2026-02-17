import Image from "next/image";
import Link from "next/link";

interface EmailSentSuccessProps {
  message: string;
  buttonText?: string;
}

export default function EmailSentSuccess({
  message,
  buttonText = "Proceed to Login",
}: EmailSentSuccessProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 text-center shadow-lg">
        {/* Logo */}
        <Image
          src="/logo-true-tea-origin.jpeg"
          alt="True Tea Logo"
          width={120}
          height={72}
          className="mb-4 mx-auto"
        />

        {/* Heading */}
        <h3 className="text-2xl font-bold mb-4 text-green-600">
          Check Your Email
        </h3>

        {/* Description */}
        <p className="mb-6">{message}</p>
        <p className="mb-6">
          If you didn't recieve an email or request a new verification email
        </p>

        {/* Button to go to login page */}
        <Link href="/auth/login" className="btn btn-submit p-4 w-full">
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
