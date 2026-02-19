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
  Hr,
} from "@react-email/components";

interface RefundEmailProps {
  orderId: string;
  refundAmount: number;
  reason: string;
  success: boolean;
  currency?: string;
}

const previewProps: RefundEmailProps = {
  orderId: "67abcdef12345678aabbccdd",
  refundAmount: 102.0,
  reason: "Order fulfillment failed due to out of stock item.",
  success: true,
  currency: "AUD",
};

export const RefundEmail = ({
  orderId = previewProps.orderId,
  refundAmount = previewProps.refundAmount,
  reason = previewProps.reason,
  success = previewProps.success,
  currency = previewProps.currency,
}: RefundEmailProps) => {
  const webLink = process.env.WEBLINK || "https://www.true-tea.com.au";
  const webDomain = process.env.WEBDOMAIN || "www.true-tea.com.au";
  const webLogo = process.env.WEBLOGO || "/logo-true-tea-origin.jpeg";
  const abn = process.env.ABN_NUMBER || "49168458580";

  const title = success ? "Refund Processed" : "Refund Failed";
  const message = success
    ? `A refund of $${refundAmount.toFixed(2)} ${currency} has been initiated for your order.`
    : `We attempted to refund $${refundAmount.toFixed(2)} ${currency} for your order, but the process failed. Please contact support immediately.`;

  return (
    <Html>
      <Tailwind>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <style>{`
            body, table, td {
               font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif !important;
            }
          `}</style>
        </Head>
        <Preview>
          {title} - True Tea #{orderId?.slice(-6)}
        </Preview>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-gray-200 rounded-lg max-w-[600px] mx-auto my-[40px] shadow-sm overflow-hidden">
            <Section className="bg-white p-6 pb-0 text-center">
              <Img
                src={`${webLink}${webLogo}`}
                width={200}
                height={200}
                alt="True Tea Logo"
                className="mx-auto"
              />
              <Heading
                className={`mt-4 text-xl font-bold ${
                  success ? "text-gray-800" : "text-red-600"
                }`}
              >
                {title}
              </Heading>
              <Text className="mt-2 text-sm text-gray-500">
                Order #{orderId.slice(-6)}
              </Text>
            </Section>

            <Section className="p-6 text-center">
              <Text className="text-gray-700 text-base mb-4">{message}</Text>
              {reason && (
                <Text className="text-gray-500 text-sm italic">
                  Reason: {reason}
                </Text>
              )}
            </Section>

            <Section className="px-6 pb-6 text-center">
              <Hr className="border-gray-200 my-4" />
              <Text className="text-xs text-gray-500">
                If you have any questions, contact us at{" "}
                <Link
                  href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_TO}`}
                  className="text-blue-600 underline"
                >
                  {process.env.NEXT_PUBLIC_EMAIL_TO}
                </Link>
              </Text>
            </Section>

            <Section className="bg-gray-50 border-t border-gray-200 py-5 text-center">
              <Text className="text-xs text-gray-500 mb-2">
                Please do not reply to this email.
              </Text>
              <Text className="text-xs text-gray-500 leading-5 m-0">
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

export default RefundEmail;
