"use client";

import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectCartItems } from "@/store/cartSlice";
import { ProductQuantityControl } from "./ProductQuantityControl";

export function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Добавленные товары</h2>
      {items.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="">
              <div>
                <h3>{item.title}</h3>
                <p>
                  {item.price} ₽ × {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ProductQuantityControl product={item} />
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => dispatch(clearCart())}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Очистить корзину
      </button>
    </div>
  );
}
