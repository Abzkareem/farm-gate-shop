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
    <main className="min-h-screen bg-cream py-16 px-6 pb-32">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-forest font-semibold hover:text-barn-red transition">&larr; Back to shop</Link>

        <h1 className="font-display font-bold text-3xl md:text-4xl text-forest mt-6 mb-8">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-card border border-soil/25 rounded-xl p-10 text-center">
            <p className="text-ink/70 mb-4">Your cart is empty.</p>
            <Link href="/" className="inline-block bg-barn-red hover:bg-barn-red-dark text-cream font-bold px-6 py-3 rounded-md transition">Browse products</Link>
          </div>
        ) : (
          <>
            <div className="bg-card border border-soil/25 rounded-xl overflow-hidden mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center px-6 py-4 border-b border-soil/15 last:border-b-0">
                  <div>
                    <p className="font-display font-bold text-forest">{item.name} <span className="text-ink/60 font-body font-normal">× {item.qty}</span></p>
                    <p className="text-xs text-ink/60">{item.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-ink">₦{(item.price * item.qty).toLocaleString()}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-xs text-barn-red hover:underline mt-1">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card border border-soil/25 rounded-xl p-6">
              <label className="block mb-4">
                <span className="text-sm font-semibold text-forest">Email address</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="block w-full mt-2 px-4 py-3 border border-soil/30 rounded-md bg-cream focus:outline-none focus:ring-2 focus:ring-barn-red/40"
                />
              </label>
              <p className="text-xs text-ink/50">
                You'll be redirected to Paystack's secure checkout to complete payment.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Sticky bottom bar — total + Pay Now, stays visible while scrolling */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-cream border-t border-soil/25 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] px-6 py-4 z-50">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-ink/60 uppercase tracking-wide">Total</p>
              <p className="font-display font-bold text-xl text-barn-red">₦{total.toLocaleString()}</p>
            </div>
            <button
              onClick={handlePay}
              disabled={loading}
              className="bg-barn-red hover:bg-barn-red-dark disabled:opacity-60 text-cream font-bold px-8 py-4 rounded-md transition"
            >
              {loading ? "Redirecting..." : "Pay Now"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}