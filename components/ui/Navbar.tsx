"use client";

import { useState, useEffect, useRef } from "react";
import NavLink from "./NavLink";
import Image from "next/image";
import Dropdown from "./Dropdown";
import { useAuth } from "@/contexts/AuthContext";

const baseLinks = [
  { href: "/", label: "Home" },
  { href: "/heritage", label: "Heritage" },
  { href: "/about-us", label: "About Us" },
];
const navLinks = [{ href: "/products", label: "Products" }];
const unauthLinks = [{ href: "/auth/login", label: "Login" }];
const authLinks = [
  { href: "/users/profile", label: "My Profile" },
  { href: "/orders", label: "My Orders" },
];
const adminLinks = [
  { href: "/products/manage", label: "Manage Products" },
  { href: "/categories/manage", label: "Manage Categories" },
  { href: "/orders/manage", label: "Manage Orders" },
  { href: "/users/manage", label: "Manage Users" },
];

export const linkBaseClass =
  "tracking-wide px-5 py-2 rounded-xl text-teal-50 hover:bg-emerald-600 transition-colors";

import { ICategory } from "@/database";
import CartLink from "./CartLink";

interface NavbarProps {
  categories?: ICategory[];
}

export default function Navbar({ categories = [] }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuToggleButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Escape key and focus management for mobile menu
  useEffect(() => {
    if (!isMenuOpen) {
      // Return focus to toggle button when closed
      menuToggleButtonRef.current?.focus();
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    // Move focus to sidebar when opened
    const firstFocusable = sidebarRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ) as HTMLElement;
    firstFocusable?.focus();

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const closeMenu = () => setIsMenuOpen(false);

  const { user, logout } = useAuth();

  const userElements = [
    <button
      key="logout"
      onClick={() => {
        logout();
        closeMenu();
      }}
      className="block w-full px-4 py-2 text-left text-sm font-bold text-teal-50 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
    >
      Logout
    </button>,
  ];

  const categoryLinks = categories.map((cat) => ({
    href: `/products?category=${cat.name}`,
    label: `${cat.name} (${cat.nameCN})`,
  }));

  return (
    <>
      <div className="h-36 w-full" aria-hidden="true" />
      <header
        className={`fixed top-0 z-50 w-full bg-primary font-normal text-teal-50 shadow-lg shadow-black/30 transition-all duration-300 ${isScrolled ? "py-0" : ""}`}
        role="banner"
      >
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 p-2">
          {/* Slogan */}
          <div
            className={`absolute left-1/2 top-7/24 hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center font-serif italic tracking-widest text-teal-100 transition-all duration-300 lg:block lg:text-[18px] xl:text-[26px] 2xl:text-3xl ${isScrolled ? "pointer-events-none opacity-0" : "opacity-100"}`}
          >
            Back To The Foundation To Enjoy
          </div>

          {/* Logo and home link */}

          <div className="flex items-center gap-6">
            <NavLink
              href="/"
              className="flex items-center no-underline"
              onClick={closeMenu}
            >
              {/* Logo */}
              <div
                className={`relative transition-all duration-300 ease-in-out mr-2 ${isScrolled ? "h-12 w-12" : "h-32 w-32"}`}
              >
                <Image
                  src="/logo-true-tea.jpg"
                  alt="True Tea"
                  fill
                  loading="eager"
                  sizes="(max-width: 768px) 48px, 128px"
                  className="object-contain"
                />
              </div>

              {/* Brand name and year created */}
              <div className="ps-1 leading-snug">
                <h2 className="font-serif">True Tea</h2>
                <div className="text-xs font-light tracking-[0.3em] text-teal-100 uppercase">
                  Since 2019
                </div>
              </div>
            </NavLink>

            {/* Base Links (Left) */}
            <nav
              className={`hidden items-center gap-3 lg:flex ${isScrolled ? "mt-5" : "mt-7"}`}
            >
              {baseLinks.map((link) => (
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
            </nav>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-3">
            <nav
              className={`hidden items-center gap-3 lg:flex ${isScrolled ? "mt-5" : "mt-7"}`}
              aria-label="Primary"
            >
              {/* Navigation links (All Users) */}
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

              {/* Categories dropdown */}
              <Dropdown
                id="desktop-categories-menu"
                title="Categories"
                linkGroups={[{ links: categoryLinks }]}
              />

              {/* User-specific links */}
              {user ? (
                <>
                  <Dropdown
                    id="desktop-user-menu"
                    elements={userElements}
                    title={`Welcome ${user.fname}`}
                    linkGroups={[
                      { sectionLabel: "My Account", links: authLinks },
                      ...(user.admin
                        ? [{ sectionLabel: "Admin Tools", links: adminLinks }]
                        : []),
                    ]}
                  />
                </>
              ) : (
                <>
                  {/* Unauthenticated user links */}
                  {unauthLinks.map((link) => (
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
                </>
              )}
              <CartLink />
            </nav>

            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile menu button */}
              <button
                type="button"
                ref={menuToggleButtonRef}
                className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-md border border-teal-50/50 text-teal-50 transition hover:bg-emerald-500"
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                onClick={toggleMenu}
              >
                <span className="sr-only">Menu</span>
                <svg
                  className="h-9 w-9"
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

        {isMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={closeMenu}
            aria-hidden="true"
            role="presentation"
          />
        )}

        {/* Mobile navigation sidebar */}
        <div
          id="mobile-navigation"
          ref={sidebarRef}
          className={`fixed inset-y-0 right-0 z-50 w-96 transform bg-primary shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Mobile navigation header */}
          <div className="flex items-center justify-between border-b border-emerald-600 p-4">
            <span className="font-serif text-xl italic text-teal-100">
              Back To The Foundation To Enjoy
            </span>

            {/* Close menu button */}
            <button
              onClick={closeMenu}
              className="rounded-md p-2 text-teal-100 hover:bg-emerald-700 hover:text-white"
              aria-label="Close menu"
            >
              <svg
                className="h-8 w-8"
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

          {/* Mobile navigation links */}
          <nav
            className="flex flex-col gap-2 p-4 text-base font-semibold tracking-wide"
            aria-label="Mobile"
          >
            {/* Navigation links */}
            {[...baseLinks, ...navLinks].map((link) => (
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

            {/* Categories dropdown */}
            <Dropdown
              id="mobile-categories-menu"
              title="Categories"
              linkGroups={[{ links: categoryLinks }]}
              fullWidth
              onItemClick={closeMenu}
            />

            {user ? (
              <>
                {/* User authenticated links dropdown */}
                <Dropdown
                  id="mobile-user-menu"
                  elements={userElements}
                  title={`Welcome ${user.fname}`}
                  linkGroups={[
                    { sectionLabel: "My Account", links: authLinks },
                    ...(user.admin
                      ? [{ sectionLabel: "Admin Tools", links: adminLinks }]
                      : []),
                  ]}
                  fullWidth
                  onItemClick={closeMenu}
                />
              </>
            ) : (
              <>
                {/* Unauthenticated user links */}
                {unauthLinks.map((link) => (
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
              </>
            )}
            <CartLink onClick={closeMenu} />
          </nav>
        </div>
      </header>
    </>
  );
}
