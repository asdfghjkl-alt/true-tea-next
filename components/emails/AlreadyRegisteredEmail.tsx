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

interface AlreadyRegisteredEmailProps {
  fname: string;
}

// React Component for already registered email
export const AlreadyRegisteredEmail = ({
  fname,
}: AlreadyRegisteredEmailProps) => {
  const webLink = process.env.WEBLINK || "https://www.true-tea.com.au";
  const webDomain = process.env.WEBDOMAIN || "www.true-tea.com.au";
  const webLogo = process.env.WEBLOGO || "/logo-true-tea-origin.jpeg";
  const loginLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/login`;
  const abn = process.env.ABN_NUMBER || "49168458580";

  return (
    <Html>
      <Head />
      <Preview>Registration Attempt - True Tea</Preview>
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
              You already have an account
            </Heading>

            {/* Greeting */}
            <Text className="text-base leading-6 text-gray-800">
              Dear {fname},
            </Text>
            <Text className="text-base leading-6 text-gray-800">
              We noticed a registration attempt with your email address.
              However, you already have an existing account with True Tea.
            </Text>
            <Text className="text-base leading-6 text-gray-800">
              If this was you, you can log in to your account using the button
              below:
            </Text>

            {/* Login button */}
            <Section className="my-5 text-center">
              <Link
                className="block rounded bg-emerald-600 px-5 py-3 text-center text-base text-white no-underline"
                href={loginLink}
              >
                Log In to True Tea
              </Link>
            </Section>

            {/* If you did not register */}
            <Text className="text-base leading-6 text-gray-800">
              If you did not attempt to register, you can safely ignore this
              email. Your account is secure.
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

export default AlreadyRegisteredEmail;
