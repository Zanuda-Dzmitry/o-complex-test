"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  selectItemQuantity,
} from "@/store/cartSlice";
import type { Product } from "@/types";

interface ProductQuantityControlProps {
  product: Product;
  variant?: "default" | "compact";
}

export function ProductQuantityControl({
  product,
  variant = "default",
}: ProductQuantityControlProps) {
  const dispatch = useDispatch();
  const quantity = useSelector(selectItemQuantity(product.id));

  const handleChange = (change: number) => {
    const newQuantity = quantity + change;

    if (newQuantity < 1) {
      dispatch(removeFromCart(product.id));
    } else {
      if (quantity === 0) {
        dispatch(
          addToCart({
            id: product.id,
            quantity: 1,
            price: product.price,
            title: product.title,
            image_url: product.image_url,
            description: product.description,
          })
        );
      } else {
        dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
      }
    }
  };

  if (quantity === 0 && variant === "compact") return null;

  if (quantity === 0) {
    return (
      <button
        onClick={() => handleChange(1)}
        className="w-full text-2xl bg-[#222222] hover:bg-[#8f8c8c] text-white py-2 px-8  rounded-lg transition-colors"
      >
        В корзину
      </button>
    );
  }

  return (
    <div
      className={`flex gap-2 items-center ${
        variant === "default" ? "justify-between" : "justify-end gap-2"
      }`}
    >
      <div className="flex items-center border rounded-md">
        <button
          onClick={() => handleChange(-1)}
          className="px-3 py-1 text-lg"
          aria-label="Уменьшить количество"
        >
          -
        </button>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => {
            const newQuantity = parseInt(e.target.value, 10);
            if (isNaN(newQuantity) || newQuantity < 1) {
              return;
            }
            dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
          }}
          className="w-10 text-center  p-1"
        />
        <button
          onClick={() => handleChange(1)}
          className="px-3 py-1 text-lg hover:bg-gray-100"
          aria-label="Увеличить количество"
        >
          +
        </button>
      </div>
      {variant === "default" && (
        <button
          onClick={() => dispatch(removeFromCart(product.id))}
          className="text-red-500 hover:text-red-700 text-sm"
          aria-label="Удалить из корзины"
        >
          Удалить
        </button>
      )}
    </div>
  );
}
