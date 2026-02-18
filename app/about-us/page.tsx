import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - True Tea",
  description: "Learn about True Tea's passion and mission.",
  openGraph: {
    title: "About Us - True Tea",
    description:
      "Learn about True Tea's passion for sourcing authentic, premium Chinese teas directly from the origin.",
    url: "/about-us",
  },
  twitter: {
    title: "About Us - True Tea",
    description:
      "Learn about True Tea's passion for sourcing authentic, premium Chinese teas directly from the origin.",
  },
};

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="prose prose-emerald max-w-none">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            <span className="font-semibold text-emerald-700">
              Our passion is
            </span>
            , based on the classical foundation, to source the right teas, to
            promote the elegant and practical tea culture, for your overall
            enjoyment.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2
              className="text-2xl font-bold text-gray-800 mb-4 scroll-mt-40"
              id="faq"
            >
              FAQs
            </h2>
            <div className="space-y-6">
              <div id="shopping-cart" className="scroll-mt-40">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Select the products and quantity you want to purchase –
                  Shopping Cart
                </h3>
                <p className="text-gray-600">
                  In Our Teas section, select the tea and quantity, they will be
                  dropped to the Shopping Cart.
                </p>
              </div>

              <div id="checkout" className="scroll-mt-40">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Check out to complete the purchase
                </h3>
                <p className="text-gray-600">
                  Click the Shopping Cart, review the selected product and
                  quantity, check out to complete the purchase. You need to
                  provide the shipping address if this is the first time
                  purchase or if you need to change the shipping address.
                  Provide your payment details and submit, the order is placed
                  once the payment is complete.
                </p>
              </div>

              <div id="payment-options" className="scroll-mt-40">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Payment options
                </h3>
                <p className="text-gray-600 mb-2">
                  We use{" "}
                  <a
                    href="https://stripe.com/au"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 hover:underline"
                  >
                    Stripe Payment
                  </a>{" "}
                  to facilitate credit card transactions. We support payments
                  from credit cards like Visa, Master, American Express, Union
                  Pay, we also support Afterpay, Wechat Pay and Alipay.
                </p>
                <p className="text-gray-600">
                  The credit card information and payment are processed by{" "}
                  <a
                    href="https://stripe.com/au"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 hover:underline"
                  >
                    Stripe Payment
                  </a>{" "}
                  system, we do not keep your credit card details.
                </p>
              </div>

              <div id="register" className="scroll-mt-40">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Register to become ‘Friend of True Tea’ (under construction)
                </h3>
                <p className="text-gray-600 mb-2">
                  You need to Register to become a ‘Friend of True Tea’ to
                  receive discount on your purchase from us and participate
                  related activities.
                </p>
                <p className="text-gray-600 mb-2">
                  Click the ‘Log on or Register’ sign can lead you to the page,
                  ‘Register’ if you haven’t registered before. The process is
                  quite straight forward, the required information includes your
                  names, email address, mobile number, age range, and select
                  your password. We believe these are minimum information and we
                  will record the information (password is encrypted), together
                  with your purchase history and shopping cart record in your
                  ‘Profile’.
                </p>
                <p className="text-gray-600 mb-2">
                  You can ‘Log on’ to the site if you have Registered.
                </p>
                <p className="text-gray-600 mb-2">
                  We will also maintain your post address in your Profile which
                  will be provided at your first purchase for your convenience,
                  we will not keep your payment details such as credit card
                  information.
                </p>
                <p className="text-gray-600">
                  By registering on our web site, you can communicate with us
                  and agree with us to communicate with you.
                </p>
              </div>

              <div id="logon" className="scroll-mt-40">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Log on to our web site
                </h3>
                <p className="text-gray-600">
                  Click the ‘Log on or Register’ sign can lead you to the page,
                  you can ‘Log on’ to the site if you have registered. It will
                  bring up your Profile including your earlier purchase, your
                  shopping cart, your shipping address, etc. (we do not keep
                  your payment details such as credit card information).
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-emerald-50 p-6 rounded-lg sticky top-24">
              <h2
                className="text-xl font-bold text-emerald-900 mb-4 scroll-mt-40"
                id="contact"
              >
                Contact Us
              </h2>
              <ul className="space-y-3 text-emerald-800">
                <li className="font-medium">We can be contacted at:</li>
                <li>
                  <span className="font-semibold block text-sm text-emerald-700">
                    Email:
                  </span>
                  <a
                    href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_TO || "info@true-tea.com.au"}`}
                    className="hover:underline hover:text-emerald-600 break-all"
                  >
                    {process.env.NEXT_PUBLIC_EMAIL_TO || "info@true-tea.com.au"}
                  </a>
                </li>
                <li>
                  <span className="font-semibold block text-sm text-emerald-700">
                    Phone:
                  </span>
                  0417 440 452
                </li>
                <li>
                  <span className="font-semibold block text-sm text-emerald-700">
                    Post:
                  </span>
                  P.O. Box 1120, Epping, NSW, 2121
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-emerald-200">
                <h3 className="font-semibold text-emerald-900 mb-2">
                  Quick Links
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#shopping-cart"
                      className="text-emerald-700 hover:text-emerald-500 hover:underline"
                    >
                      Shopping Cart
                    </a>
                  </li>
                  <li>
                    <a
                      href="#checkout"
                      className="text-emerald-700 hover:text-emerald-500 hover:underline"
                    >
                      Checkout
                    </a>
                  </li>
                  <li>
                    <a
                      href="#payment-options"
                      className="text-emerald-700 hover:text-emerald-500 hover:underline"
                    >
                      Payment Options
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/terms-and-conditions"
                      className="text-emerald-700 hover:text-emerald-500 hover:underline"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="text-emerald-700 hover:text-emerald-500 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
