"use client";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import Link from "next/link";

export default function OrderSuccess() {
  const { setCartEmpty } = useCart();

  useEffect(() => {
    if (setCartEmpty) setCartEmpty();
  }, []);

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6 py-16">
      <div className="max-w-md w-full text-center bg-card border border-soil/25 rounded-xl p-10">
        <div className="w-16 h-16 rounded-full bg-forest text-cream flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h1 className="font-display font-bold text-2xl md:text-3xl text-forest mb-3">Thank you for your order!</h1>
        <p className="text-ink/70 mb-8">
          We've received your payment. We'll reach out shortly on WhatsApp or email to confirm delivery or pickup details.
        </p>
        <Link
          href="/"
          className="inline-block bg-barn-red hover:bg-barn-red-dark text-cream font-bold px-8 py-4 rounded-md transition"
        >
          Back to shop
        </Link>
      </div>
    </main>
  );
}