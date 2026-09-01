"use client";
import { useState, useEffect } from "react";

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  function checkPassword() {
    fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: passwordInput }),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          setAuthenticated(true);
          setError("");
        } else {
          setError("Incorrect password.");
        }
      });
  }

  useEffect(() => {
    if (!authenticated) return;
    setLoading(true);
    Promise.all([
      fetch("/api/products").then(function (res) { return res.json(); }),
      fetch("/api/admin-orders").then(function (res) { return res.json(); }),
    ]).then(function (results) {
      setProducts(results[0]);
      setOrders(results[1]);
      setLoading(false);
    });
  }, [authenticated]);

  function updateProduct(id, newPrice, newInStock) {
    fetch("/api/admin-products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, price: newPrice, inStock: newInStock }),
    }).then(function () {
      alert("Product updated.");
    });
  }

  function updateOrderStatus(reference, newStatus) {
    fetch("/api/admin-orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference: reference, status: newStatus }),
    }).then(function () {
      alert("Order status updated.");
    });
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="bg-card border border-soil/25 rounded-xl p-8 max-w-sm w-full">
          <h1 className="font-display font-bold text-2xl text-forest mb-4">Admin Login</h1>
          <input
            type="password"
            value={passwordInput}
            onChange={function (e) { setPasswordInput(e.target.value); }}
            placeholder="Enter password"
            className="block w-full mb-3 px-4 py-3 border border-soil/30 rounded-md bg-cream"
          />
          {error && <p className="text-barn-red text-sm mb-3">{error}</p>}
          <button
            onClick={checkPassword}
            className="w-full bg-barn-red hover:bg-barn-red-dark text-cream font-bold py-3 rounded-md transition"
          >
            Log In
          </button>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-forest font-semibold">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display font-bold text-3xl text-forest mb-8">Admin Dashboard</h1>

        <h2 className="font-display font-bold text-xl text-forest mb-4">Products</h2>
        <div className="bg-card border border-soil/25 rounded-xl overflow-hidden mb-10">
          {products.map(function (product) {
            return (
              <ProductRow key={product.id} product={product} onSave={updateProduct} />
            );
          })}
        </div>

        <h2 className="font-display font-bold text-xl text-forest mb-4">Orders</h2>
        <div className="bg-card border border-soil/25 rounded-xl overflow-hidden">
          {orders.map(function (order, index) {
            return (
              <OrderRow key={index} order={order} onSave={updateOrderStatus} />
            );
          })}
        </div>
      </div>
    </main>
  );
}

function ProductRow({ product, onSave }) {
  const [price, setPrice] = useState(product.price);
  const [inStock, setInStock] = useState(product.inStock);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-soil/15 last:border-b-0">
      <p className="font-semibold text-forest w-40">{product.name}</p>
      <input
        type="number"
        value={price}
        onChange={function (e) { setPrice(e.target.value); }}
        className="w-32 px-3 py-2 border border-soil/30 rounded-md bg-cream"
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={inStock}
          onChange={function (e) { setInStock(e.target.checked); }}
        />
        In stock
      </label>
      <button
        onClick={function () { onSave(product.id, Number(price), inStock); }}
        className="bg-forest hover:bg-forest-dark text-cream font-semibold text-sm px-4 py-2 rounded-md transition"
      >
        Save
      </button>
    </div>
  );
}

function OrderRow({ order, onSave }) {
  const [status, setStatus] = useState(order.status);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-soil/15 last:border-b-0">
      <div className="text-sm">
        <p className="font-semibold text-forest">{order.reference}</p>
        <p className="text-ink/60">{order.name} - {order.items}</p>
      </div>
      <select
        value={status}
        onChange={function (e) { setStatus(e.target.value); }}
        className="px-3 py-2 border border-soil/30 rounded-md bg-cream text-sm"
      >
        <option value="Order received">Order received</option>
        <option value="Preparing">Preparing</option>
        <option value="Out for delivery">Out for delivery</option>
        <option value="Ready for pickup">Ready for pickup</option>
        <option value="Delivered">Delivered</option>
        <option value="Completed">Completed</option>
      </select>
      <button
        onClick={function () { onSave(order.reference, status); }}
        className="bg-forest hover:bg-forest-dark text-cream font-semibold text-sm px-4 py-2 rounded-md transition"
      >
        Save
      </button>
    </div>
  );
}