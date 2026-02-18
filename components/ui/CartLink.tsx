import { linkBaseClass } from "./Navbar";
import { useOrder } from "@/contexts/OrderContext";
import type { MouseEventHandler } from "react";
import NavLink from "./NavLink";
import Image from "next/image";

export default function CartLink({
  onClick,
}: {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const { cart } = useOrder();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <NavLink
      href="/cart"
      onClick={onClick}
      aria-label={totalItems > 0 ? `Cart, ${totalItems} items` : "Cart, empty"}
      className={({ isActive }: { isActive: boolean }) =>
        `${linkBaseClass} flex items-center justify-center border-2 border-white/30 ${
          isActive ? "bg-emerald-500" : "bg-emerald-700"
        }`
      }
    >
      <Image
        src="/icons/cart.png"
        alt=""
        width={24}
        height={24}
        aria-hidden="true"
      />{" "}
      <p>Cart</p>
      {totalItems > 0 && (
        <div
          className="ml-1 flex items-center rounded-full bg-red-500 px-2"
          aria-hidden="true"
        >
          <p>{totalItems}</p>
        </div>
      )}
    </NavLink>
  );
}
