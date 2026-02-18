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

interface AccountNotFoundEmailProps {
  email: string;
}

// React Component for account not found email
export const AccountNotFoundEmail = ({ email }: AccountNotFoundEmailProps) => {
  const webLink = process.env.WEBLINK || "https://www.true-tea.com.au";
  const webDomain = process.env.WEBDOMAIN || "www.true-tea.com.au";
  const webLogo = process.env.WEBLOGO || "/logo-true-tea-origin.jpeg";
  const registerLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/register`;
  const abn = process.env.ABN_NUMBER || "49168458580";

  return (
    <Html>
      <Head />
      <Preview>Verification Request - True Tea</Preview>
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
              Verification Request Received
            </Heading>

            {/* Content */}
            <Text className="text-base leading-6 text-gray-800">Hello,</Text>
            <Text className="text-base leading-6 text-gray-800">
              We received a request to resend a verification email for the
              address <span className="font-semibold">{email}</span>.
            </Text>
            <Text className="text-base leading-6 text-gray-800">
              However, we could not find an account associated with this email
              address.
            </Text>
            <Text className="text-base leading-6 text-gray-800">
              If you would like to create an account, you can do so by clicking
              the button below:
            </Text>

            {/* Register button */}
            <Section className="my-5 text-center">
              <Link
                className="block rounded bg-emerald-600 px-5 py-3 text-center text-base text-white no-underline"
                href={registerLink}
              >
                Create an Account
              </Link>
            </Section>

            {/* If you did not request */}
            <Text className="text-base leading-6 text-gray-800">
              If you did not make this request, you can safely ignore this
              email.
            </Text>

            {/* Best regards */}
            <Text className="text-base leading-6 text-gray-800">
              Best regards,
              <br />
              Operation Support
            </Text>

            {/* Company information */}
            <Section className="mt-5 border-t border-gray-200 pt-5 text-center">
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

export default AccountNotFoundEmail;
