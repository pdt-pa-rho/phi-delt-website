"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const { data: session, status } = useSession();


  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--white)]/75 backdrop-blur-sm shadow-sm"
          : "bg-[var(--white)]/50 backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-[var(--blue)] rounded-full flex items-center justify-center text-[var(--white)] mr-2">
                <span className="font-bold">ΦΔΘ</span>
              </div>
              <span className="text-foreground font-semibold text-lg">
                Carnegie Mellon Phi Delta Theta
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/philanthropy"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Philanthropy
            </Link>
            <Link
              href="/rush"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Rush
            </Link>
            <Link
              href="/brother-login"
              className="brother-login-glow relative rounded-md px-2 py-1 text-foreground transition-colors after:absolute after:left-2 after:right-2 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-[var(--blue)] after:shadow-[0_0_12px_var(--blue)] after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              Brother Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-[var(--light-blue)]/20 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-[var(--white)] shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-[var(--light-blue)]/20"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-[var(--light-blue)]/20"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            href="/philanthropy"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-[var(--light-blue)]/20"
            onClick={closeMenu}
          >
            Philanthropy
          </Link>
          <Link
            href="/rush"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-[var(--light-blue)]/20"
            onClick={closeMenu}
          >
            Rush
          </Link>
          <Link
            href="/brother-login"
            className="brother-login-glow block rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-[var(--light-blue)]/20"
            onClick={closeMenu}
          >
            {/* {session ? "Brother Login" : "Brotherhood Hub"} */}
          </Link>
          {/* Auth buttons */}
          <div className="flex items-center gap-4 ml-4">
            {status === "loading" ? (
              <span className="text-sm text-gray-500">Loading...</span>
            ) : session ? (
              <>
                <span className="text-sm text-[#0D1433] hidden sm:inline">{session.user?.email}</span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-[#619CC7] text-white px-3 py-1 rounded-md font-medium hover:bg-[#4A85B0] transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="bg-[#619CC7] text-white px-3 py-1 rounded-md font-medium hover:bg-[#4A85B0] transition-colors"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
