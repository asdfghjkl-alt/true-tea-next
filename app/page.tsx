import connectToDatabase from "@/lib/mongodb";
import { Product, Category, IProduct, ICategory } from "@/database";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  await connectToDatabase();

  // Fetch active categories
  const categories = (await Category.find({ active: true }).sort({
    catID: 1,
  })) as ICategory[];

  // Fetch featured products (limit to 4 for the homepage)
  // We'll just take the first 4 active products for now as "featured"
  const featuredProducts = JSON.parse(
    JSON.stringify(await Product.find({ onShelf: true }).limit(4)),
  ) as IProduct[];

  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative bg-linear-to-br from-emerald-50 to-teal-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-emerald-900 mb-6 font-serif">
              True Tea
              <span className="block text-2xl sm:text-3xl lg:text-4xl mt-2 font-sans font-light text-emerald-700">
                Back To The Foundation To Enjoy
              </span>
            </h1>
            <p className="mt-4 text-lg text-emerald-800 max-w-2xl mx-auto lg:mx-0">
              Experience the authentic taste of premium teas, sourced directly
              from the origin with a passion for quality and tradition.
            </p>
            <div className="mt-8">
              <Link
                href="/products"
                className="inline-block bg-emerald-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-emerald-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Shop All Teas
              </Link>
            </div>
          </div>

          {/* Hero Image / Logo */}
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-3xl border-4 border-white overflow-hidden shadow-2xl animate-fade-in">
            {/* Image component using fill and object-cover */}
            <Image
              src="/logo-true-tea-origin.jpeg"
              alt="Logo"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. Features Section (Why Choose Us) */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Feature 1 */}
            <div className="p-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 mb-4 text-emerald-600">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Authentic Sourcing
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Sourced directly from the origin to ensure the truest flavor.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 mb-4 text-emerald-600">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Premium Quality
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Hand-picked selections that meet the highest standards of
                excellence.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 mb-4 text-emerald-600">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Free Shipping
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Enjoy complimentary shipping on all orders across Australia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Explore Our Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              return (
                <Link
                  key={category._id}
                  href={`/products?category=${category.name}`}
                  className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                >
                  <div className="relative h-64 overflow-hidden">
                    {category.image && category.image.url ? (
                      <Image
                        src={category.image.url}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center p-4">
                      <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                        {category.name}
                      </h3>
                      <p className="text-white/90 font-medium drop-shadow-sm">
                        {category.nameCN}
                      </p>
                      <span className="mt-4 inline-flex items-center text-sm font-semibold text-white border border-white/50 px-4 py-2 rounded-full backdrop-blur-sm group-hover:bg-white group-hover:text-emerald-900 transition-all shadow-sm">
                        View Products
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. About Us Teaser */}
      <section className="py-20 text-white relative overflow-hidden bg-[url('/pattern.png')] bg-cover bg-center">
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-emerald-900/75"></div>

        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-serif italic mb-6">Our Passion</h2>
          <p className="text-xl leading-relaxed text-emerald-100 mb-8">
            &quot;Our passion is, based on the classical foundation, to source
            the right teas, to promote the elegant and practical tea culture,
            for your overall enjoyment.&quot;
          </p>
          <Link
            href="/about-us"
            className="inline-block border-2 border-emerald-400 text-emerald-400 px-8 py-3 rounded-full hover:bg-emerald-400 hover:text-emerald-900 transition-all font-semibold"
          >
            Read Our Story
          </Link>
        </div>
      </section>

      {/* 5. Featured Products */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Featured Teas</h2>
            <Link
              href="/products"
              className="text-emerald-600 hover:text-emerald-500 font-medium flex items-center"
            >
              View all{" "}
              <span aria-hidden="true" className="ml-1">
                &rarr;
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product.slug}`}
                  className="group"
                >
                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 relative mb-4">
                    {product.images &&
                    product.images.length > 0 &&
                    product.images[0].url ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-cover object-center group-hover:opacity-75 transition-opacity"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm z-10">
                        {product.discount}% OFF
                      </div>
                    )}
                    {product.stock > 0 && product.stock <= 10 && (
                      <div className="absolute top-2 right-2 z-10 rounded-full bg-amber-500 ring-2 ring-white px-2 py-1 text-xs font-bold text-white shadow-md">
                        Only {product.stock} left
                      </div>
                    )}
                    {!product.onShelf && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{product.nameCN}</p>
                  {product.stock > 0 && product.stock <= 10 && (
                    <p className="text-amber-600 text-xs font-semibold">
                      Hurry — only {product.stock} left in stock!
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    {product.discount > 0 ? (
                      <>
                        <p className="text-lg font-bold text-emerald-700">
                          $
                          {(
                            product.price *
                            (1 - (product.discount || 0) / 100)
                          ).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-400 line-through decoration-gray-400">
                          ${product.price.toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <p className="text-lg font-bold text-emerald-700">
                        ${product.price.toFixed(2)}
                      </p>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-10">
                No products available at the moment.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
