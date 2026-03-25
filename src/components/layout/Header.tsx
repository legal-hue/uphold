"use client";

import Link from "next/link";
import { Shield, Menu, X, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasCase, setHasCase] = useState(false);

  useEffect(() => {
    setHasCase(localStorage.getItem("uphold_case_employment") !== null);
  }, []);

  return (
    <header className="bg-white border-b border-uphold-neutral-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="w-7 h-7 text-uphold-green-500" />
          <span className="text-xl font-bold text-uphold-neutral-800 tracking-tight">Uphold</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#situations" className="text-sm text-uphold-neutral-600 hover:text-uphold-green-500 transition-colors">
            Check Your Rights
          </Link>
          {hasCase && (
            <Link href="/journey/employment" className="text-sm text-uphold-green-500 hover:text-uphold-green-700 transition-colors flex items-center gap-1 font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              My Journey
            </Link>
          )}
          <Link href="/about" className="text-sm text-uphold-neutral-600 hover:text-uphold-green-500 transition-colors">
            About
          </Link>
          <Link
            href={hasCase ? "/journey/employment" : "/#situations"}
            className="bg-uphold-green-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-uphold-green-700 transition-colors"
          >
            {hasCase ? "Continue Journey" : "Get Started — Free"}
          </Link>
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-uphold-neutral-200 bg-white px-4 py-4 space-y-3">
          <Link
            href="/#situations"
            className="block text-uphold-neutral-600 hover:text-uphold-green-500 py-2"
            onClick={() => setMenuOpen(false)}
          >
            Check Your Rights
          </Link>
          {hasCase && (
            <Link
              href="/journey/employment"
              className="block text-uphold-green-500 hover:text-uphold-green-700 py-2 flex items-center gap-1 font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              <MapPin className="w-3.5 h-3.5" />
              My Journey
            </Link>
          )}
          <Link
            href="/about"
            className="block text-uphold-neutral-600 hover:text-uphold-green-500 py-2"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href={hasCase ? "/journey/employment" : "/#situations"}
            className="block bg-uphold-green-500 text-white text-center font-semibold px-5 py-3 rounded-lg hover:bg-uphold-green-700 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            {hasCase ? "Continue Journey" : "Get Started — Free"}
          </Link>
        </div>
      )}
    </header>
  );
}
