"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/app/ThemeToggle";
import Link from "next/link";
import { useState } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex flex-col">
              <span className="text-xl font-bold text-foreground">Puthir</span>
              <span className="text-xs text-muted-foreground -mt-1">An AI Quiz App</span>
            </Link>
          </div>

          {/* Right side navigation */}
          <div className="flex items-center space-x-6">
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                href="/about" 
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                Contact
              </Link>
              <SignedIn>
                <Link 
                  href="/exam-history" 
                  className="text-foreground hover:text-primary transition-colors duration-200"
                >
                  Exam History
                </Link>
              </SignedIn>
              <ThemeToggle />
              <SignedOut>
                <div className="flex items-center gap-2">
                  <SignInButton>
                    <Button variant="default" size="sm">
                      Sign In
                    </Button>
                  </SignInButton>
                </div>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>

            {/* Mobile controls */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground hover:text-primary p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              <Link 
                href="/about" 
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <SignedIn>
                <Link 
                  href="/exam-history" 
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Exam History
                </Link>
              </SignedIn>
              <div className="px-3 py-2 space-y-2">
                <SignedOut>
                  <SignInButton>
                    <Button variant="default" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button variant="default" size="sm" className="w-full">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex justify-center">
                    <UserButton />
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}