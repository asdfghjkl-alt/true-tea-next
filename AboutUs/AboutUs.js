import React from 'react';

export default function AboutUs() {
  return (
    <div className='container'>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb p-2'>
          <li className='breadcrumb-item'>
            <a href='/'>Home</a>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            About Us
          </li>
        </ol>
      </nav>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>
          <a href='#passion'>Our Passion</a>
        </li>
        <li>
          <a href='#contact'>Contact Us</a>
        </li>
        <li>
          <a href='#faq'>FAQs:</a>
        </li>
        <ol>
          <li>
            <a href='#1'>
              Select the products and quantity you want to purchase – Shopping
              Cart
            </a>
          </li>
          <li>
            <a href='#2'>Check out to complete the purchase</a>
          </li>
          <li>
            <a href='#3'>Payment options</a>
          </li>
          <li>
            <a href='#4'>Product delivery</a>
          </li>
          <li>
            <a href='#5'>Product return policy</a>
          </li>
          <li>
            <a href='#6'>Privacy protection policy</a>
          </li>
          <li>
            <a href='#7'>
              Register to become ‘Friend of Ture Tea’ (under construction)
            </a>
          </li>
          <li>
            <a href='#8'>Log on to our web site</a>
          </li>
          <li>
            <a href='#9'>Our operation</a>
          </li>
        </ol>
      </ul>

      <p>
        <span id='passion' style={{ fontSize: '1.25rem', fontWeight: '500' }}>
          Our passion is
        </span>
        , base on the classical foundation, to source the right teas, to promote
        the elegant and practical tea culture, for your overall enjoyment.
      </p>

      <h5 id='contact'>Contact us:</h5>
      <ul style={{ listStyleType: 'none' }}>
        <li>We can be contacted at:</li>
        <li>
          Email：{' '}
          <a href='mailto: info@true-tea.com.au'>info@true-tea.com.au</a>
        </li>
        <li>Phone: 0417 440 452</li>
        <li>Post: P.O. Box 1120, Epping, NSW, 2121</li>
      </ul>

      <h5 id='faq'>FAQs:</h5>
      <ol>
        <li id='1'>
          Select the product and quantity you want to purchase – Shopping Cart
        </li>
        <p>
          In Our Teas section, select the tea and quantity, they will be dropped
          to the Shopping Cart.
        </p>

        <li id='2'>Check out to complete the purchase</li>
        <p>
          Click the Shopping Cart, review the selected product and quantity,
          check out to complete the purchase. You need to provide the shipping
          address if this is the first time purchase or if you need to change
          the shipping address. Provide your payment details and submit, the
          order is placed once the payment is complete.
        </p>

        <li id='3'>Payment options</li>
        <p>
          We use{' '}
          <a href='https://stripe.com/au' target='_blank' rel='noreferrer'>
            Stripe Payment
          </a>{' '}
          to facilitate credit card transactions. We support payments from
          credit cards like Visa, Master, American Express, Union Pay, we also
          support Afterpay, Wechat pay and Alipay.
        </p>
        <p>
          The credit card information and payment are processed by{' '}
          <a href='https://stripe.com/au' target='_blank' rel='noreferrer'>
            Stripe Payment
          </a>{' '}
          system, we do not keep your credit card details.
        </p>

        <li id='4'>Product delivery</li>
        <p>
          Unless otherwise processed, we use Australia Post for our delivery,
          and we deliver to Australia address.
        </p>
        <p>Our standard delivery will be Australia Post’s Standard Post.</p>
        <p>We provide free shipping for all purchases.</p>
        <p>
          For purchases more than $40, we will provide complimentary gift
          package.
        </p>

        <li id='5'>Product return policy</li>
        <p>
          Given the hygiene consideration, we will not accept return once the
          product is shipped.
        </p>

        <li id='6'>Privacy protection policy</li>
        <p>We endeavour to protect your privacy.</p>
        <p>
          We collect the minimum information when you register and purchase, we
          will keep your profile data and purchase information, the data be
          stored with reliable service providers. We will not disclose these
          data to any other parties.
        </p>

        <li id='7'>
          Register to become ‘Friend of Ture Tea’ (under construction)
        </li>
        <p>
          You need to Register to become a ‘Friend of True Tea’ to receive
          discount on your purchase from us and participate related activities.
        </p>
        <p>
          Click the ‘Log on or Register’ sign can lead you to the page,
          ‘Register’ if you haven’t registered before. The process is quite
          straight forward, the required information includes your names, email
          address, mobile number, gender, age range, and select your password.
          We believe these are minimum information and we will record the
          information (password is encrypted), together with your purchase
          history and shopping cart record in your ‘Profile’.
        </p>
        <p>You can ‘Log on’ to the site if you have Registered.</p>
        <p>
          We will also maintain your post address in your Profile which will be
          provided at your first purchase for your convenience, we will not keep
          your payment details such as credit card information.
        </p>
        <p>
          By registering on our web site, you can communicate with us and agree
          with us to communicate with you.
        </p>

        <li id='8'>Log on to our web site</li>
        <p>
          Click the ‘Log on or Register’ sign can lead you to the page, you can
          ‘Log on’ to the site if you have registered. It will bring up your
          Profile including your earlier purchase, your shopping cart, your
          shipping address, etc. (we do not keep your payment details such as
          credit card information).
        </p>

        <li id='9'>Our operation</li>
        <p>
          The <a href='/'>www.true-tea.com.au</a> is a Valleyview Enterprises
          Pty. Ltd. ABN 49168458580 operation.
        </p>
      </ol>
    </div>
  );
}
