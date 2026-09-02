"use client";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const { cart, addToCart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(function (res) { return res.json(); })
      .then(function (data) { setProducts(data); })
      .catch(function (err) { console.log("Failed to load products:", err); });
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-soil/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-20">
          <a href="#top" className="flex items-center">
            <img src="/logo-full.png" alt="Farm Gate" className="h-16 w-auto max-h-full py-2" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-forest">
            <a href="#available-now" className="hover:text-barn-red transition">Available Now</a>
            <a href="#coming-soon" className="hover:text-barn-red transition">Coming Soon</a>
            <a href="#why-us" className="hover:text-barn-red transition">Why Choose Us</a>
            <a href="#contact" className="hover:text-barn-red transition">Contact</a>
          </nav>
          <Link href="/checkout" className="flex items-center gap-2 bg-forest hover:bg-forest-dark text-cream font-semibold text-sm px-4 py-2 rounded-md transition">
            <span>Cart</span> ({cartCount})
          </Link>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden text-cream text-center pt-24 pb-0 px-6" style={{ backgroundImage: "linear-gradient(rgba(20,26,15,0.6), rgba(20,26,15,0.65)), url(/images/hero.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="relative max-w-2xl mx-auto pb-24">
          <p className="uppercase tracking-widest text-gold text-sm font-bold mb-3">Poultry and Livestock - Abuja</p>
          <h1 className="font-display font-bold text-5xl md:text-7xl mb-4 tracking-tight">Farm Gate</h1>
          <p className="text-lg md:text-xl text-cream-soft mb-8">Farm-fresh today. Full farm fresh tomorrow.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="#contact" className="inline-block bg-barn-red hover:bg-barn-red-dark text-cream font-bold px-8 py-4 rounded-md transition shadow-[0_3px_0_#8A3521]">Contact us to order</a>
            <a href="#available-now" className="inline-block border border-cream/40 hover:bg-cream/10 text-cream font-semibold px-8 py-4 rounded-md transition">See what's available</a>
          </div>
          <p className="mt-8 text-xs uppercase tracking-widest text-cream/60">Pickup at the farm - Delivery within Abuja</p>
        </div>
        <svg className="relative block w-full h-8" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <pattern id="picket" width="6" height="10" patternUnits="userSpaceOnUse">
              <polygon points="0,10 3,1.5 6,10" fill="#F1E8D6" />
            </pattern>
          </defs>
          <rect width="100" height="10" fill="url(#picket)" />
        </svg>
      </section>

      <section id="available-now" className="bg-cream py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="uppercase tracking-widest text-barn-red text-sm font-bold mb-2">Available Now</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-forest mb-2">Fresh stock, ready to order</h2>
            <p className="text-ink/70">Add what you need, then confirm your order at checkout.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className={`bg-card border border-soil/25 rounded-xl overflow-hidden flex flex-col transition ${product.inStock ? "hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/10" : "opacity-60"}`}>
                <div className="relative">
                  <img src={product.image} alt={product.name} className={`w-full h-40 object-cover ${!product.inStock ? "grayscale" : ""}`} />
                  {!product.inStock && (
                    <span className="absolute top-3 left-3 bg-soil-dark text-cream text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">Sold Out</span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-display font-bold text-xl text-forest mb-1">{product.name}</h3>
                  <p className="text-sm text-ink/70 flex-grow mb-4">{product.description}</p>
                  <p className="font-display font-bold text-xl text-barn-red mb-1">₦{Number(product.price).toLocaleString()}</p>
                  <p className="inline-block text-xs text-soil bg-soil/10 rounded-full px-3 py-1 mb-4 w-fit">{product.unit}</p>
                  {product.inStock ? (
                    <button onClick={() => addToCart(product)} className="bg-barn-red hover:bg-barn-red-dark text-cream font-bold py-3 rounded-md transition">Add to Cart</button>
                  ) : (
                    <button disabled className="bg-soil/30 text-ink/50 font-bold py-3 rounded-md cursor-not-allowed">Sold Out</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="coming-soon" className="bg-soil-dark text-cream py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p