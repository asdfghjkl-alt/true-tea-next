"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MouseEventHandler } from "react";

type NavLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "className"
> & {
  href: string;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  className?: string | (({ isActive }: { isActive: boolean }) => string);
};

export default function NavLink({
  href,
  children,
  onClick,
  className,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const resolvedClassName =
    typeof className === "function" ? className({ isActive }) : className;

  return (
    <Link
      onClick={onClick}
      href={href}
      className={resolvedClassName}
      {...props}
    >
      {children}
    </Link>
  );
}
