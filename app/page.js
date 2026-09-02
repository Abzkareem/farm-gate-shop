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
            <p className="uppercase tracking-widest text-gold text-sm font-bold mb-2">Expanding The Farm</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-2">Coming soon</h2>
            <p className="text-cream-soft/80">We're growing beyond poultry. Check back here for updates.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: "Goats", image: "/images/goats.jpg" },
              { name: "Cows", image: "/images/cows.jpg" },
              { name: "Rams", image: "/images/rams.jpg" },
            ].map((animal) => (
              <div key={animal.name} className="relative bg-cream/5 border border-dashed border-gold/50 rounded-xl overflow-hidden text-center">
                <span className="absolute top-3 -right-9 bg-gold text-forest-dark text-xs font-bold uppercase tracking-wide px-10 py-1 rotate-45 shadow-md z-10">Coming Soon</span>
                <div className="relative h-40">
                  <img src={animal.image} alt={animal.name} className="w-full h-full object-cover grayscale opacity-70" />
                  <div className="absolute inset-0 bg-soil-dark/40"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl mb-2">{animal.name}</h3>
                  <p className="text-sm text-cream-soft/70">Timeline to be announced - check back soon.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="bg-cream py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="uppercase tracking-widest text-barn-red text-sm font-bold mb-2">Why Choose Us</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-forest">A farm that earns your trust</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Raised with care, not shortcuts", desc: "Healthy, well-fed stock from day one - no rushed or overcrowded conditions.", icon: "M12 21c-4.5-3-8-6.5-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 4.5-3.5 8-8 11z" },
              { title: "Fresh when you need it", desc: "Reliable stock availability and a quick turnaround on every order.", icon: "M13 3L4 14h6l-1 7 9-11h-6l1-7z" },
              { title: "A farm you can visit, not just order from", desc: "Transparency about how your animals are raised builds trust that big suppliers can't match.", icon: "M3 21V6l4-3v18M17 21V6l4-3v18M3 10h18M3 15h18" },
            ].map((item) => (
              <div key={item.title} className="text-left">
                <div className="w-12 h-12 rounded-full bg-forest text-cream flex items-center justify-center mb-4">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d={item.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <h3 className="font-display font-bold text-lg text-forest mb-2">{item.title}</h3>
                <p className="text-sm text-ink/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-forest-dark text-cream py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="uppercase tracking-widest text-gold text-sm font-bold mb-2">Get In Touch</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-2">Contact us to order</h2>
            <p className="text-cream-soft/80">Reach out on WhatsApp for the fastest reply.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ul className="space-y-5">
              <li className="flex gap-3 items-start border-b border-cream/10 pb-4">
                <span className="text-gold mt-0.5">Phone</span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gold/80">Phone</p>
                  <a href="tel:+2347039652490" className="font-semibold hover:underline">+234 703 965 2490</a>
                </div>
              </li>
              <li className="flex gap-3 items-start border-b border-cream/10 pb-4">
                <span className="text-gold mt-0.5">WhatsApp</span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gold/80">WhatsApp</p>
                  <a href="https://wa.me/2347039652490" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">Chat with us on WhatsApp</a>
                </div>
              </li>
              <li className="flex gap-3 items-start border-b border-cream/10 pb-4">
                <span className="text-gold mt-0.5">Email</span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gold/80">Email</p>
                  <a href="mailto:farmgate26@gmail.com" className="font-semibold hover:underline">farmgate26@gmail.com</a>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-gold mt-0.5">Location</span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gold/80">Location and Delivery</p>
                  <p className="font-semibold">Abuja, Nigeria - pickup at the farm, delivery available within Abuja</p>
                </div>
              </li>
            </ul>

            <div className="bg-cream/5 border border-cream/15 rounded-xl p-6 h-fit">
              <h3 className="font-display font-bold mb-4">Farm Hours</h3>
              <div className="flex justify-between text-sm py-2 border-b border-dashed border-cream/15">
                <span className="text-cream-soft">Monday - Saturday</span>
                <span className="font-semibold">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-cream-soft">Sunday</span>
                <span className="font-semibold">10:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#17200F] text-cream-soft/70 text-center py-6 text-sm">
        <p><strong className="text-cream">Farm Gate</strong> - Abuja, Nigeria - © {new Date().getFullYear()} Farm Gate. All rights reserved.</p>
      </footer>
    </>
  );
}