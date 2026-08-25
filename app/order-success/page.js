"use client";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import Link from "next/link";

export default function OrderSuccess() {
  const { setCartEmpty } = useCart();

  useEffect(() => {
    // Clear the cart once the customer lands here — their order went through
    if (setCartEmpty) setCartEmpty();
  }, []);

  return (
    <main style={{ maxWidth: "600px", margin: "0 auto", padding: "60px 20px", textAlign: "center" }}>
      <h1 style={{ color: "#2E3B26" }}>Thank you for your order! 🐓</h1>
      <p style={{ color: "#555", marginTop: "12px" }}>
        We've received your payment. We'll reach out shortly on WhatsApp or email
        to confirm delivery or pickup details.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          marginTop: "24px",
          padding: "12px 24px",
          background: "#A8442C",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Back to shop
      </Link>
    </main>
  );
}