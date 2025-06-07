import { Geist, Geist_Mono } from "next/font/google"; // ✅ Import font loaders
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecipeSlider from "@/components/RecipeSlider"; // ✅ New component
import { CartProvider } from "@/context/CartContext";

// ✅ Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Metadata
export const metadata = {
  title: "Diabetes Health Hub",
  description: "A comprehensive platform for managing diabetes with food, equipment, and resources.",
};

// ✅ Root layout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <Navbar />
          {children}
          {/* <RecipeSlider />  */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
