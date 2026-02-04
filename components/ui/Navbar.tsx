"use client";
import { useState } from "react";
import NavLink from "./NavLink";
import Image from "next/image";
import Dropdown from "./Dropdown";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
];
const unauthLinks = [{ href: "/auth/login", label: "Login" }];
const authLinks = [{ href: "/orders", label: "My Orders" }];
const adminLinks = [
  { href: "/products/manage", label: "Manage Products" },
  { href: "/categories/manage", label: "Manage Categories" },
  { href: "/orders/manage", label: "Manage Orders" },
  { href: "/users/manage", label: "Manage Users" },
];
const sellerLinks = [{ href: "/products/manage", label: "Manage Products" }];

export const linkBaseClass =
  "tracking-wide px-5 py-2 rounded-xl text-teal-50 hover:bg-emerald-600 transition-colors";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const closeMenu = () => setIsMenuOpen(false);

  const { user, logout } = useAuth();

  const userElements = [
    <button
      key="logout"
      onClick={() => logout()}
      className="block w-full text-left text-sm font-bold text-teal-50 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
    >
      Logout
    </button>,
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full bg-primary font-normal text-teal-50 shadow-lg shadow-black/30"
      role="banner"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-2">
        <NavLink
          href="/"
          className="flex items-center no-underline"
          onClick={closeMenu}
        >
          <Image
            src="/logo-true-tea-origin.jpeg"
            alt="True Tea"
            height={128}
            width={128}
            className="mr-2"
          />
          <div className="ps-1 leading-snug">
            <h2>True Tea</h2>
            <div className="text-xs font-light tracking-[0.3em] text-teal-100 uppercase">
              Since 2019
            </div>
          </div>
        </NavLink>

        <div className="flex flex-col items-end gap-1">
          {/* Row 1: Slogan */}
          <div className="hidden text-sm italic tracking-widest text-teal-100 lg:block">
            Back To The Foundation To Enjoy
          </div>

          {/* Row 2: Navigation */}
          <div className="flex items-center gap-3">
            <nav
              className="hidden items-center gap-3 lg:flex"
              aria-label="Primary"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  className={({ isActive }) =>
                    `${linkBaseClass} ${isActive ? "bg-emerald-500" : "bg-primary"}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {user ? (
                <>
                  <Dropdown
                    id="desktop-user-menu"
                    elements={userElements}
                    title={`Welcome ${user.fname}`}
                    links={authLinks}
                  />
                  {user.admin && (
                    <Dropdown
                      id="desktop-admin-tools"
                      title="Admin Tools"
                      links={adminLinks}
                    />
                  )}
                </>
              ) : (
                unauthLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    className={({ isActive }) =>
                      `${linkBaseClass} ${isActive ? "bg-emerald-500" : "bg-primary"}`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))
              )}
            </nav>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                className="flex h-10 w-11 flex-col items-center justify-center gap-1.5 rounded-md border border-teal-50/50 text-teal-50 transition hover:bg-emerald-500"
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                onClick={toggleMenu}
              >
                <span className="sr-only">Menu</span>
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 w-96 transform bg-primary shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-emerald-600 p-4">
          <span className="text-xl font-bold text-white">Menu</span>
          <button
            onClick={closeMenu}
            className="rounded-md p-1 text-teal-100 hover:bg-emerald-700 hover:text-white"
            aria-label="Close menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav
          className="flex flex-col gap-2 p-4 text-base font-semibold tracking-wide"
          aria-label="Mobile"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className={({ isActive }) =>
                `${linkBaseClass} ${isActive ? "bg-emerald-500" : "bg-primary"}`
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
          {user ? (
            <>
              <Dropdown
                id="mobile-user-menu"
                elements={userElements}
                title={`Welcome ${user.fname}`}
                links={authLinks}
                fullWidth
                onItemClick={closeMenu}
              />
              {user.admin && (
                <Dropdown
                  id="mobile-seller-tools"
                  title="Seller Tools"
                  links={sellerLinks}
                  onItemClick={closeMenu}
                  fullWidth
                />
              )}
              {user.admin && (
                <Dropdown
                  id="mobile-admin-tools"
                  title="Admin Tools"
                  links={adminLinks}
                  onItemClick={closeMenu}
                  fullWidth
                />
              )}
            </>
          ) : (
            unauthLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                className={({ isActive }) =>
                  `${linkBaseClass} ${isActive ? "bg-emerald-500" : "bg-primary"}`
                }
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))
          )}
        </nav>
      </div>
    </header>
  );
}
