'use client';
import { useCart } from "@/context/CartContext";

const CartSummary = () => {
  const { cartItems } = useCart();

  return (
    <div>
      <h2>Cart Summary</h2>
      <p>You have {cartItems.length} item(s) in your cart.</p>
    </div>
  );
};

export default CartSummary;
