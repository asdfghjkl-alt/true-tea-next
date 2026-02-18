# True Tea Next

A premium e-commerce platform dedicated to bringing high-quality, authentic tea culture to customers. Built with modern web technologies to ensure a seamless and elegant user experience.

## 🍵 Purpose

True Tea Next is designed to be a comprehensive online store for tea enthusiasts. It bridges the gap between traditional tea culture and modern convenience, offering:

- A curated selection of premium teas.
- Detailed product information and brewing guides.
- A secure and streamlined shopping experience.
- An educational resource for tea history and preparation.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **Emails**: [React Email](https://react.email/) & [Resend](https://resend.com/)
- **Authentication**: Custom JWT-based auth (Jose/Bcrypt)
- **Forms**: React Hook Form with Zod validation

## 🛠️ Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v18+)
- npm or yarn
- MongoDB instance (local or Atlas)

### Environment Variables

Create a `.env.local` file in the root directory and configure the following:

- `MONGODB_URI` (MongoDB URI to connect via mongodb)
- `JWT_SECRET` (JWT secret)
- `JWT_NAME` (JWT name)
- `NEXT_PUBLIC_BASE_URL` (Base URL of the website, set to localhost:3000 for local development)
- `EMAIL_FROM` (Who the email should be sent from on Resend)
- `WEBLINK` (Website link)
- `WEBDOMAIN` (Website domain)
- `WEBLOGO` (Website logo)
- `CLOUDINARY_CLOUD_NAME` (Cloudinary cloud name)
- `CLOUDINARY_API_KEY` (Cloudinary API key)
- `CLOUDINARY_API_SECRET` (Cloudinary API secret)
- `STRIPE_SECRET_KEY` (Stripe secret key)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (Stripe publishable key)
- `EMAIL_TO` (Email to send notifications to)
- `ABN_NUMBER` (ABN number)
- `RESEND_API_KEY` (for emails)

### Installation

```bash
npm install
```

### Running the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📧 Previewing Emails

This project uses **React Email** to build and preview email templates. To start the email development server:

```bash
npm run email
```

This will start a local server (typically at [http://localhost:3001](http://localhost:3001) if 3000 is correctly taken by Next.js, or check your terminal output) where you can preview and test email templates in real-time.

## ✨ Key Features

- **User Accounts**: Registration, login, and profile management.
- **Product Management**: Admin interface to add, edit, and categorize products (`/products/manage`).
- **Shopping Cart**: Real-time cart updates and persistence.
- **Checkout**: Secure payment processing with Stripe Elements.
- **Order Tracking**: Users can view their past orders and status.
- **Admin Dashboard**: Comprehensive tools for managing users, orders, and inventory.
