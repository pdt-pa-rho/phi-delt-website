"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import clsx from "clsx";

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
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        {
          "bg-(--background)/50": isScrolled && !isMenuOpen,
          "bg-(--background)/75": isMenuOpen,
          "backdrop-blur-sm shadow-sm": isScrolled || isMenuOpen,
          "bg-none": !(isScrolled || isMenuOpen)
        }
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/sword_and_shield.webp"
                alt="Phi Delta Theta Crest"
                width={32}
                height={32}
                className="rounded-full inline mr-3 drop-shadow-sm drop-shadow-black/50"
              />
              <span className="text-foreground font-semibold text-lg drop-shadow-sm drop-shadow-black/50">
                Carnegie Mellon Phi Delta Theta
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="animated-underline text-foreground/80 hover:text-foreground transition-colors drop-shadow-sm drop-shadow-black/50"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="animated-underline text-foreground/80 hover:text-foreground transition-colors drop-shadow-sm drop-shadow-black/50"
            >
              About
            </Link>
            <Link
              href="/philanthropy"
              className="animated-underline text-foreground/80 hover:text-foreground transition-colors drop-shadow-sm drop-shadow-black/50"
            >
              Philanthropy
            </Link>
            <Link
              href="/rush"
              className="animated-underline text-foreground/80 hover:text-foreground transition-colors drop-shadow-sm drop-shadow-black/50"
            >
              Rush
            </Link>
            {session && (
              <Link
                href="/brotherhood"
                className="animated-underline blue-shine drop-shadow-sm drop-shadow-black/50"
                onClick={closeMenu}
              >
                Brotherhood Hub
              </Link>
            )}
            {/* Auth buttons */}
            <div className="flex items-center gap-4 ml-4 drop-shadow-sm drop-shadow-black/50">
              {status === "loading" ? (
                <span className="text-sm text-gray-500">Loading...</span>
              ) : session ? (
                <>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="bg-(--blue) text-white px-3 py-1 rounded-md font-medium hover:bg-[#4A85B0] transition-colors"
                  >
                    {session.user?.image && <Image
                      src={session.user.image}
                      alt="User profile picture"
                      width={24}
                      height={24}
                      className="rounded-full inline mr-3"
                    />
                    }
                    Sign out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className="bg-(--blue) text-white px-3 py-1 rounded-md font-medium hover:bg-[#4A85B0] transition-colors"
                >
                  Brother Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-(--light-blue)/20 focus:outline-none drop-shadow-sm drop-shadow-black/50"
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
        className={clsx("md:hidden", { "block": isMenuOpen, "hidden": !isMenuOpen })}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-(--light-blue)/20"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-(--light-blue)/20"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            href="/philanthropy"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-(--light-blue)/20"
            onClick={closeMenu}
          >
            Philanthropy
          </Link>
          <Link
            href="/rush"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-(--light-blue)/20"
            onClick={closeMenu}
          >
            Rush
          </Link>
          {session && (
            <Link
              href="/brotherhood"
              className="block px-3 py-2 rounded-md text-base font-medium blue-shine"
              onClick={closeMenu}
            >
               Brotherhood Hub
            </Link>
          )}
          {/* Auth buttons */}
          <div className="flex items-center gap-4 ml-4">
            {status === "loading" ? (
              <span className="text-sm text-gray-500">Loading...</span>
            ) : session ? (
              <>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-(--blue) text-white px-3 py-1 rounded-md font-medium hover:bg-[#4A85B0] transition-colors"
                >
                  {session.user?.image && <Image
                      src={session.user.image}
                      alt="User profile picture"
                      width={24}
                      height={24}
                      className="rounded-full inline mr-3"
                    />
                  }
                  Sign out
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="bg-(--blue) text-white px-3 py-1 rounded-md font-medium hover:bg-[#4A85B0] transition-colors"
              >
                Brother Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
