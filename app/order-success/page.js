"use client";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function OrderSuccess() {
  const { setCartEmpty } = useCart();
  const searchParams = useSearchParams();
  const [reference, setReference] = useState("");

  useEffect(() => {
    if (setCartEmpty) setCartEmpty();
    const ref = searchParams.get("reference") || searchParams.get("trxref");
    if (ref) setReference(ref);
  }, []);

  const whatsappMessage = "Hello Farm Gate, I just completed my order. Reference: " + (reference || "please check my email") + ". Please confirm delivery or pickup details.";
  const whatsappLink = "https://wa.me/2347039652490?text=" + encodeURIComponent(whatsappMessage);

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6 py-16">
      <div className="max-w-md w-full text-center bg-card border border-soil/25 rounded-xl p-10">
        <div className="w-16 h-16 rounded-full bg-forest text-cream flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h1 className="font-display font-bold text-2xl md:text-3xl text-forest mb-3">Thank you for your order!</h1>
        <p className="text-ink/70 mb-6">
          We've received your payment. For the fastest confirmation, message us on WhatsApp with your order reference below.
        </p>

        {reference && (
          <div className="bg-cream border border-soil/25 rounded-md px-4 py-3 mb-6">
            <p className="text-xs uppercase tracking-wide text-soil">Order Reference</p>
            <p className="font-display font-bold text-forest">{reference}</p>
          </div>
        )}

        
                 <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block w-full bg-forest hover:bg-forest-dark text-cream font-bold px-8 py-4 rounded-md transition mb-3">Confirm on WhatsApp</a>
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