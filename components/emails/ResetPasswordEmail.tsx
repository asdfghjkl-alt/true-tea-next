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

interface ResetPasswordEmailProps {
  resetLink: string;
  fname: string;
}

export const ResetPasswordEmail = ({
  resetLink,
  fname,
}: ResetPasswordEmailProps) => {
  const webLink = process.env.WEBLINK || "https://www.true-tea.com.au";
  const webDomain = process.env.WEBDOMAIN || "www.true-tea.com.au";
  const webLogo = process.env.WEBLOGO || "/logo-true-tea-origin.jpeg";
  const abn = process.env.ABN_NUMBER || "49168458580";

  return (
    <Html>
      <Head />
      <Preview>Reset your password for True Tea</Preview>
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
              Reset your password
            </Heading>

            {/* Greeting */}
            <Text className="text-base leading-6 text-gray-800">
              Dear {fname},
            </Text>
            <Text className="text-base leading-6 text-gray-800">
              We received a request to reset the password for your True Tea
              account.
            </Text>
            <Text className="text-base leading-6 text-gray-800">
              To reset your password, please click on the button below:
            </Text>

            {/* Reset Password button */}
            <Section className="my-5 text-center">
              <Link
                className="block rounded bg-emerald-600 px-5 py-3 text-center text-base text-white no-underline"
                href={resetLink}
              >
                Reset Password
              </Link>
            </Section>

            {/* Alternative link */}
            <Text className="text-base leading-6 text-gray-800">
              Or copy and paste this URL into your browser:{" "}
              <Link href={resetLink} className="text-emerald-600 underline">
                {resetLink}
              </Link>
            </Text>

            {/* Expiry warning */}
            <Text className="text-base leading-6 text-gray-800">
              This link will expire in 1 hour.
            </Text>

            {/* If you did not request */}
            <Text className="text-base leading-6 text-gray-800">
              If you did not request a password reset, you can safely ignore
              this email. Your password will remain unchanged.
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

export default ResetPasswordEmail;
