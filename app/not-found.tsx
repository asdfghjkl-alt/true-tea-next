import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-(--spacing(36)))] flex-col items-center justify-center bg-teal-50 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-5xl font-semibold text-emerald-600">404</p>
        {/* Heading */}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        {/* Description */}
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        {/* Button to go to home page */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/" className="btn btn-submit">
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
