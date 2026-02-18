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
  Row,
  Column,
  Hr,
  Tailwind,
} from "@react-email/components";

// Types inlined to avoid @/ path alias that react-email preview can't resolve
interface EmailOrderProduct {
  product_id: unknown;
  name: string;
  imageUrl: string;
  nameCN: string;
  price: number;
  discount: number;
  GST: number;
  unit: string;
  quantity: number;
}

interface EmailUserDetails {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
  };
}

interface OrderEmailProps {
  orderId: string;
  buyer: EmailUserDetails;
  delivery: EmailUserDetails;
  productList: EmailOrderProduct[];
  postage: number;
  GSTTotal: number;
  orderTotal: number;
  discountTotal: number;
  paidDate: string; // ISO string
  paymentId: string;
  receiptUrl?: string;
  receipt?: string;
  status?: string; // Added to match OrderCard display logic if needed, though email usually implies 'paid'
  deliveredDate?: string;
}

// Default preview props for the react-email dev server
const previewProps: OrderEmailProps = {
  orderId: "67abcdef12345678aabbccdd",
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
  status: "paid",
};

export const OrderEmail = ({
  orderId = previewProps.orderId,
  buyer = previewProps.buyer,
  delivery = previewProps.delivery,
  productList = previewProps.productList,
  postage = previewProps.postage,
  GSTTotal = previewProps.GSTTotal,
  orderTotal = previewProps.orderTotal,
  discountTotal = previewProps.discountTotal,
  paidDate = previewProps.paidDate,
  paymentId = previewProps.paymentId,
  receiptUrl = previewProps.receiptUrl,
  receipt = previewProps.receipt,
  status = previewProps.status,
  deliveredDate,
}: Partial<OrderEmailProps>) => {
  const webLink = process.env.WEBLINK || "https://www.true-tea.com.au";
  const webDomain = process.env.WEBDOMAIN || "www.true-tea.com.au";
  const webLogo = process.env.WEBLOGO || "/logo-true-tea-origin.jpeg";
  const abn = process.env.ABN_NUMBER || "49168458580";

  const formatDate = (date: string) => {
    const d = new Date(date);
    return (
      d.toLocaleTimeString("en-AU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }) +
      " " +
      d.toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    );
  };

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
            .email-wrapper {
              width: 100% !important;
              margin: 0 auto !important;
            }
            @media only screen and (max-width: 600px) {
              .email-wrapper {
                 width: 100% !important;
              }
               .cols-1 {
                display: block !important;
                width: 100% !important;
              }
              .mb-responsive {
                 margin-bottom: 16px !important;
              }
            }
          `}</style>
        </Head>
        <Preview>Order Confirmation - True Tea #{orderId.slice(-6)}</Preview>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="email-wrapper border border-solid border-gray-200 rounded-lg max-w-[600px] mx-auto my-[40px] shadow-sm overflow-hidden">
            {/* Logo, Heading & Greeting */}
            <Section className="bg-white p-6 pb-0 text-center">
              <Img
                src={`${webLink}${webLogo}`}
                width={200}
                height={200}
                alt="True Tea Logo"
                className="mx-auto"
              />
              <Heading className="mt-4 text-xl font-bold text-gray-800">
                Order Confirmation
              </Heading>
              <Text className="mt-2 text-sm text-gray-500">
                Thank you for your order!
              </Text>
            </Section>

            {/* Header: Buyer & Delivery Info */}
            <Section className="bg-gray-50 border-y border-solid border-gray-100 p-6 text-sm mt-6">
              <Row>
                <Column className="cols-1 align-top w-1/2 pr-4 mb-responsive">
                  <Text className="font-semibold text-gray-700 mb-1 mt-0">
                    Billing Info
                  </Text>
                  <Text className="m-0 text-gray-800">
                    {buyer.fname} {buyer.lname}
                  </Text>
                  <Text className="m-0 text-gray-500 break-all">
                    {buyer.email}
                  </Text>
                  <Text className="m-0 text-gray-500">{buyer.phone}</Text>
                </Column>
                <Column className="cols-1 align-top w-1/2">
                  <Text className="font-semibold text-gray-700 mb-1 mt-0">
                    Delivery
                  </Text>
                  <Text className="m-0 text-gray-800">
                    {delivery.fname} {delivery.lname}
                  </Text>
                  <Text className="m-0 text-gray-500 text-xs">
                    {delivery.address.line1}
                    {delivery.address.line2 && (
                      <>
                        <br />
                        {delivery.address.line2}
                      </>
                    )}
                    <br />
                    {delivery.address.suburb}, {delivery.address.state}{" "}
                    {delivery.address.postcode}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Meta Info */}
            <Section className="p-6 border-b border-solid border-gray-100 text-xs text-gray-500">
              <Row className="mb-4">
                <Column className="cols-1 w-1/2 align-top mb-responsive">
                  <Text className="font-medium text-gray-700 m-0">
                    Order ID:
                  </Text>
                  <Text className="font-mono m-0 mt-1">{orderId}</Text>
                </Column>
                <Column className="cols-1 w-1/2 align-top">
                  <Text className="font-medium text-gray-700 m-0">Date:</Text>
                  <Text className="m-0 mt-1">{formatDate(paidDate)}</Text>
                </Column>
              </Row>
              {status === "delivered" && deliveredDate && (
                <Row className="mb-4">
                  <Column className="w-full">
                    <Text className="font-medium text-gray-700 m-0">
                      Delivered:
                    </Text>
                    <Text className="m-0 mt-1">
                      {formatDate(deliveredDate)}
                    </Text>
                  </Column>
                </Row>
              )}
              <Row>
                <Column className="cols-1 w-1/2 align-top mb-responsive">
                  <Text className="font-medium text-gray-700 m-0">
                    Payment ID:
                  </Text>
                  <Text
                    className="font-mono m-0 mt-1 truncate block w-full"
                    title={paymentId}
                  >
                    {paymentId}
                  </Text>
                </Column>
                <Column className="cols-1 w-1/2 align-top">
                  <Text className="font-medium text-gray-700 m-0">
                    Receipt:
                  </Text>
                  {receiptUrl && receiptUrl !== "receipt_url_not_available" ? (
                    <Link
                      href={receiptUrl}
                      className="text-emerald-600 hover:underline truncate block w-full mt-1"
                    >
                      {receipt && receipt !== "receipt_number_not_available"
                        ? receipt
                        : "View Receipt"}
                    </Link>
                  ) : (
                    <Text className="text-gray-400 italic m-0 mt-1">
                      {receipt && receipt !== "receipt_number_not_available"
                        ? receipt
                        : "No Receipt"}
                    </Text>
                  )}
                </Column>
              </Row>
            </Section>

            {/* Products List */}
            <Section className="p-6">
              <Text className="font-semibold text-gray-700 mb-4 text-sm mt-0">
                Items
              </Text>
              {productList.map((item, index) => (
                <Row key={index} className="mb-4">
                  <Column style={{ width: "48px" }} className="align-top">
                    <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden relative border border-gray-200">
                      {item.imageUrl ? (
                        <Img
                          src={item.imageUrl}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            backgroundColor: "#f3f4f6",
                            textAlign: "center",
                            lineHeight: "48px",
                            fontSize: "10px",
                            color: "#9ca3af",
                          }}
                        >
                          No Img
                        </div>
                      )}
                    </div>
                  </Column>
                  <Column className="pl-3 align-top">
                    <Text className="font-medium text-gray-800 text-sm m-0 truncate">
                      {item.name}
                    </Text>
                    <Row className="mt-1">
                      <Column>
                        {item.discount > 0 ? (
                          <Text className="text-gray-500 text-xs m-0">
                            Price:{" "}
                            <span className="line-through text-gray-400">
                              ${item.price.toFixed(2)}
                            </span>{" "}
                            <span className="text-emerald-600 font-medium">
                              $
                              {(item.price * (1 - item.discount / 100)).toFixed(
                                2,
                              )}
                            </span>{" "}
                            / {item.unit}
                            <span className="text-emerald-600 ml-1">
                              ({item.discount}% off)
                            </span>
                          </Text>
                        ) : (
                          <Text className="text-gray-500 text-xs m-0">
                            Price: ${item.price.toFixed(2)} / {item.unit}
                          </Text>
                        )}
                      </Column>
                      <Column className="text-right">
                        <Text className="text-gray-500 text-xs m-0 whitespace-nowrap">
                          Qty: {item.quantity}
                        </Text>
                      </Column>
                    </Row>
                  </Column>
                </Row>
              ))}
            </Section>

            {/* Footer: Totals */}
            <Section className="bg-gray-50 border-t border-solid border-gray-100 p-6 text-sm">
              {discountTotal > 0 && (
                <Row className="mb-1 text-gray-600">
                  <Column>
                    <Text className="m-0">Total Discount</Text>
                  </Column>
                  <Column className="text-right">
                    <Text className="m-0 text-emerald-600">
                      -${discountTotal.toFixed(2)}
                    </Text>
                  </Column>
                </Row>
              )}
              <Row className="mb-1 text-gray-600">
                <Column>
                  <Text className="m-0">Postage</Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0">${postage.toFixed(2)}</Text>
                </Column>
              </Row>
              <Row className="mb-3 text-gray-600">
                <Column>
                  <Text className="m-0">Included GST</Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0">${GSTTotal.toFixed(2)}</Text>
                </Column>
              </Row>
              <Hr className="border-gray-200 my-3" />
              <Row className="mb-3">
                <Column>
                  <Text className="font-medium text-gray-800 m-0">Total</Text>
                </Column>
                <Column className="text-right">
                  <Text className="text-lg font-bold text-emerald-600 m-0">
                    ${orderTotal.toFixed(2)}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <div
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      status === "paid"
                        ? "bg-green-100 text-green-700"
                        : status === "delivered"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {status}
                  </div>
                </Column>
              </Row>
            </Section>

            <Section className="mt-5 border-t border-gray-200 pt-5 text-center pb-5">
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

export default OrderEmail;
