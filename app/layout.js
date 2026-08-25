import "./globals.css";
import { CartProvider } from "../context/CartContext";

export const metadata = {
  title: "Farm Gate — Poultry & Livestock, Abuja",
  description: "Farm-fresh chickens and turkeys, raised with care in Abuja, Nigeria.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}