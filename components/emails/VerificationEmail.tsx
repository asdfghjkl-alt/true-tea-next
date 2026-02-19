import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface VerificationEmailProps {
  confirmLink: string;
  fname: string;
}

// React Component for verification email
export const VerificationEmail = ({
  confirmLink,
  fname,
}: VerificationEmailProps) => {
  const webLink = process.env.WEBLINK || "https://www.true-tea.com.au";
  const webDomain = process.env.WEBDOMAIN || "www.true-tea.com.au";
  const webLogo = process.env.WEBLOGO || "/logo-true-tea-origin.jpeg";
  const abn = process.env.ABN_NUMBER || "49168458580";

  return (
    <Html>
      <Head />
      <Preview>Verify your email for True Tea</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto p-5 pb-12">
            <Section>
              {/* Logo */}
              <Img
                src={`${webLink}${webLogo}`}
                width={200}
                height={200}
                alt="True Tea Logo"
                className="mx-auto"
              />
            </Section>

            {/* Heading */}
            <Heading className="my-10 text-center text-2xl font-bold">
              Verify your email address
            </Heading>

            {/* Greeting */}
            <Text className="text-base leading-6 text-gray-800">
              Dear {fname},
            </Text>
            <Text className="text-base leading-6 text-gray-800">
              Thank you for registering with True Tea!
            </Text>
            <Text className="text-base leading-6 text-gray-800">
              To activate your account, please click on the following link (or
              paste it into your browser) to complete the account activation
              process within one hour of receiving it:
            </Text>

            {/* Verify Email button */}
            <Section className="my-5 text-center">
              <Link
                className="block rounded bg-emerald-600 px-5 py-3 text-center text-base text-white no-underline"
                href={confirmLink}
              >
                Verify Email
              </Link>
            </Section>

            {/* Alternative verification link */}
            <Text className="text-base leading-6 text-gray-800">
              Or copy and paste this URL into your browser:{" "}
              <Link href={confirmLink} className="text-emerald-600 underline">
                {confirmLink}
              </Link>
            </Text>

            {/* If you did not register */}
            <Text className="text-base leading-6 text-gray-800">
              If you did not register, please reply to this email to request
              removal of this registration.
            </Text>

            {/* Best regards */}
            <Text className="text-base leading-6 text-gray-800">
              Best regards,
              <br />
              Operation Support
            </Text>

            {/* Company information */}
            <Section className="mt-5 border-t border-gray-200 pt-5 text-center">
              <Text className="text-xs text-gray-500 mb-4">
                If you have any questions, contact us at{" "}
                <Link
                  href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_TO}`}
                  className="text-blue-600 underline"
                >
                  {process.env.NEXT_PUBLIC_EMAIL_TO}
                </Link>
              </Text>
              <Text className="text-xs text-gray-500 mb-2">
                Please do not reply to this email.
              </Text>
              <Text className="text-xs text-gray-500 leading-5">
                <b>Valleyview Enterprises Pty. Ltd.</b>
                <br />
                ABN: {abn}
                <br />
                <Link href={webLink} className="text-[#5f51e8] underline">
                  {webDomain}
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;
