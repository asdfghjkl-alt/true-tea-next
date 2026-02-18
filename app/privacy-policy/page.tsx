import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - True Tea",
  description: "Privacy policy for True Tea.",
  openGraph: {
    title: "Privacy Policy - True Tea",
    description:
      "How True Tea collects, uses, and protects your personal information in accordance with Australian privacy law.",
    url: "/privacy-policy",
  },
  twitter: {
    title: "Privacy Policy - True Tea",
    description:
      "How True Tea collects, uses, and protects your personal information in accordance with Australian privacy law.",
  },
};

export default function PrivacyPolicyPage() {
  const email = process.env.NEXT_PUBLIC_EMAIL_TO || "info@true-tea.com.au";

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

      <div className="prose prose-emerald max-w-none text-gray-700 space-y-8">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Overview</h2>
          <p>
            This Privacy Policy describes how Valleyview Enterprises Pty. Ltd.
            ABN 49 168 458 580, trading as True Tea (&quot;we&quot;,
            &quot;us&quot;, &quot;our&quot;), collects, uses, and discloses your
            personal information when you visit or make a purchase from our
            website.
          </p>
          <p>
            We are committed to protecting your privacy in accordance with the{" "}
            <em>Privacy Act 1988</em> (Cth) and the Australian Privacy
            Principles (APPs).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Section 1 - What Personal Information We Collect
          </h2>
          <p>
            When you visit our site, we automatically collect certain
            information about your device, including information about your web
            browser, IP address, time zone, and some of the cookies that are
            installed on your device.
          </p>
          <p>
            When you register an account or make a purchase, we collect the
            following personal information:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Identity information:</strong> First name, last name.
            </li>
            <li>
              <strong>Contact information:</strong> Email address, phone number,
              postal/shipping address.
            </li>
            <li>
              <strong>Demographic information:</strong> Age range, postcode.
            </li>
            <li>
              <strong>Account information:</strong> Password (stored in
              encrypted form only — we never store or have access to your
              plain-text password).
            </li>
            <li>
              <strong>Transaction information:</strong> Order history, products
              purchased, quantities, and order status.
            </li>
          </ul>
          <p>
            We refer to this information collectively as &quot;Personal
            Information&quot;.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Section 2 - How We Use Your Personal Information
          </h2>
          <p>We use the Personal Information we collect to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Process and fulfil your orders.</li>
            <li>
              Communicate with you about your orders, account, or enquiries.
            </li>
            <li>
              Send you order confirmation and shipping notification emails.
            </li>
            <li>
              Maintain your account profile (including shipping address and
              order history) for your convenience.
            </li>
            <li>Improve our website, products, and customer service.</li>
            <li>Comply with legal obligations.</li>
          </ul>
          <p>
            We will not use your personal information for marketing purposes
            without your explicit consent.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Section 3 - Payment Information
          </h2>
          <p>
            All payment transactions are processed securely through{" "}
            <a
              href="https://stripe.com/au"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-600 hover:underline"
            >
              Stripe
            </a>
            . We do <strong>not</strong> store, collect, or have access to your
            credit card numbers, CVV, or other payment card details. All payment
            data is handled directly by Stripe in accordance with the Payment
            Card Industry Data Security Standard (PCI-DSS).
          </p>
          <p>
            For more information on Stripe&apos;s privacy practices, please
            visit{" "}
            <a
              href="https://stripe.com/au/privacy"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-600 hover:underline"
            >
              Stripe&apos;s Privacy Policy
            </a>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Section 4 - Sharing Your Personal Information
          </h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to third parties. We may share your information only
            with the following service providers who assist us in operating our
            website and business:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Stripe:</strong> For secure payment processing.
            </li>
            <li>
              <strong>MongoDB (Atlas):</strong> For secure data storage.
            </li>
            <li>
              <strong>Resend:</strong> For sending transactional emails (order
              confirmations, notifications).
            </li>
            <li>
              <strong>Cloudinary:</strong> For product image hosting.
            </li>
            <li>
              <strong>Australia Post:</strong> For order delivery (we share your
              shipping address and name for this purpose).
            </li>
          </ul>
          <p>
            These service providers are obligated to keep your information
            confidential and use it only for the purposes for which we disclose
            it to them.
          </p>
          <p>
            We may also disclose your personal information if required to do so
            by law or if we believe that such action is necessary to comply with
            a legal obligation, protect and defend our rights or property, or
            protect the personal safety of our users or the public.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Section 5 - Data Storage and Security
          </h2>
          <p>
            Your personal information is stored securely using industry-standard
            practices. We use encrypted connections (HTTPS/TLS) to protect data
            in transit, and passwords are stored using one-way encryption
            (hashing) so that they cannot be read by anyone, including us.
          </p>
          <p>
            Our data is hosted by reputable cloud service providers with data
            centres that may be located outside Australia. By using our website,
            you consent to this transfer. We take reasonable steps to ensure
            that overseas recipients handle your information in accordance with
            the Australian Privacy Principles.
          </p>
          <p>
            While we strive to protect your personal information, no method of
            transmission over the Internet or electronic storage is 100% secure.
            We cannot guarantee its absolute security.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Section 6 - Cookies
          </h2>
          <p>
            We use cookies and similar technologies to maintain your session,
            remember your preferences, and understand how you interact with our
            website. Cookies are small data files stored on your device.
          </p>
          <p>The types of cookies we use include:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Essential cookies:</strong> Required for the website to
              function (e.g., authentication, shopping cart).
            </li>
            <li>
              <strong>Functional cookies:</strong> Used to remember your
              preferences and settings.
            </li>
          </ul>
          <p>
            We do not use advertising or tracking cookies. You can choose to
            disable cookies through your browser settings, but this may affect
            the functionality of the website.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Section 7 - Your Rights
          </h2>
          <p>
            Under the <em>Privacy Act 1988</em> (Cth) and the Australian Privacy
            Principles, you have the right to:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Access:</strong> Request a copy of the personal
              information we hold about you.
            </li>
            <li>
              <strong>Correction:</strong> Request that we correct any
              inaccurate or incomplete personal information. You can also update
              your profile information directly through your account settings.
            </li>
            <li>
              <strong>Complaint:</strong> Lodge a complaint if you believe we
              have breached the Australian Privacy Principles. We will
              investigate and respond to your complaint within a reasonable
              time.
            </li>
          </ul>
          <p>
            If you are not satisfied with our response, you may lodge a
            complaint with the{" "}
            <a
              href="https://www.oaic.gov.au/"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-600 hover:underline"
            >
              Office of the Australian Information Commissioner (OAIC)
            </a>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Section 8 - Data Retention
          </h2>
          <p>
            We retain your personal information for as long as your account is
            active or as needed to provide you services, comply with our legal
            obligations, resolve disputes, and enforce our agreements.
          </p>
          <p>
            If you wish to have your account and associated data deleted, please
            contact us and we will process your request within a reasonable
            timeframe.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Section 9 - Children&apos;s Privacy
          </h2>
          <p>
            Our website is not intended for individuals under the age of 18. We
            do not knowingly collect personal information from children. If we
            become aware that we have collected personal information from a
            child without parental consent, we will take steps to delete that
            information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Section 10 - Changes to This Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. The updated policy will be posted on this page.
            We encourage you to review this Privacy Policy periodically.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Section 11 - Contact Us
          </h2>
          <p>
            For more information about our privacy practices, if you have
            questions, or if you would like to make a complaint, please contact
            us by email at{" "}
            <a
              href={`mailto:${email}`}
              className="text-emerald-600 hover:underline"
            >
              {email}
            </a>{" "}
            or by mail at:
          </p>
          <p>
            True Tea
            <br />
            Valleyview Enterprises Pty. Ltd.
            <br />
            P.O. Box 1120, Epping, NSW, 2121
            <br />
            Australia
          </p>
        </section>
      </div>
    </div>
  );
}
