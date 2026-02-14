import Image from "next/image";
import Link from "next/link";

export default function CartEmpty() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-3 text-primary">My Cart</h1>
      <div className="text-center py-3">
        <p className="text-xl text-gray-600 mb-6">Your cart is empty.</p>
        <Link
          href="/"
          className="btn btn-submit inline-flex items-center gap-2 px-8 py-3 text-lg"
        >
          Continue Shopping{" "}
          <Image src="/icons/cart.png" width={30} height={30} alt="Cart" />
        </Link>
      </div>
    </main>
  );
}
