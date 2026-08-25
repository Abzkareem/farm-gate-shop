"use client";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import Link from "next/link";

export default function Checkout() {
  const { cart, removeFromCart } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  async function handlePay() {
    if (!email) {
      alert("Please enter your email to continue.");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, cart }),
    });
    const data = await res.json();
    setLoading(false);

    if (data.status) {
      window.location.href = data.data.authorization_url;
    } else {
      alert("Something went wrong starting payment. Please try again.");
    }
  }

  return (
    <main style={{ maxWidth: "700px", margin: "0 auto", padding: "40px 20px" }}>
      <Link href="/">&larr; Back to shop</Link>
      <h1 style={{ marginTop: "20px" }}>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                padding: "12px 0",
              }}
            >
              <div>
                <strong>{item.name}</strong> × {item.qty}
                <br />
                <span style={{ color: "#666", fontSize: "0.9rem" }}>{item.unit}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div>₦{(item.price * item.qty).toLocaleString()}</div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#A8442C",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2 style={{ marginTop: "24px", textAlign: "right" }}>
            Total: ₦{total.toLocaleString()}
          </h2>

          <div style={{ marginTop: "24px" }}>
            <label>
              Email address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "6px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                }}
              />
            </label>
          </div>

          <button
            onClick={handlePay}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "20px",
              background: "#A8442C",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {loading ? "Redirecting to payment..." : "Pay Now"}
          </button>
        </>
      )}
    </main>
  );
}