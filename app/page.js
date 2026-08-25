"use client";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function Home() {
  const { cart, addToCart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>

      {/* Hero */}
      <section style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>Farm Gate</h1>
        <p style={{ color: "#555" }}>Farm-fresh today. Full farm fresh tomorrow.</p>
      </section>

      {/* Cart indicator */}
      <div style={{ textAlign: "right", marginBottom: "24px" }}>
        <Link href="/checkout" style={{ fontWeight: "bold" }}>
          🛒 Cart ({cartCount})
        </Link>
      </div>

      {/* Products */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <h3>{product.name}</h3>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>{product.description}</p>
            <p style={{ fontWeight: "bold", margin: "10px 0" }}>
              ₦{product.price.toLocaleString()}
              <br />
              <span style={{ fontSize: "0.8rem", color: "#888" }}>{product.unit}</span>
            </p>
            <button
              onClick={() => addToCart(product)}
              style={{
                width: "100%",
                padding: "10px",
                background: "#A8442C",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}