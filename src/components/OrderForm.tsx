"use client";

import { useState } from "react";
import { useSubmitOrderMutation } from "@/store/apiSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart, updatePhone } from "@/store/cartSlice";
import Popup from "@/components/Popup";

export function OrderForm() {
  const [submitOrder, { isLoading, isSuccess, error }] =
    useSubmitOrderMutation();
  const { items: cart, phone } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // Валидация телефона (11 цифр без учета +7)
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length !== 11) {
      setLocalError("Введите полный номер телефона");
      return;
    }

    // Валидация корзины
    if (cart.length === 0) {
      setLocalError("Добавьте товары в корзину");
      return;
    }

    try {
      const result = await submitOrder({
        phone: phoneDigits,
        cart: cart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      }).unwrap();

      if (result.success === 1) {
        dispatch(clearCart());
      } else {
        setLocalError(result.error || "Ошибка при оформлении заказа");
      }
    } catch (err) {
      setLocalError("Ошибка при отправке заказа");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Форматирование номера телефона
    const value = e.target.value.replace(/\D/g, "");
    let formattedValue = "+7 ";

    if (value.length > 1) {
      formattedValue += `(${value.substring(1, 4)}`;
    }
    if (value.length > 4) {
      formattedValue += `) ${value.substring(4, 7)}`;
    }
    if (value.length > 7) {
      formattedValue += `-${value.substring(7, 9)}`;
    }
    if (value.length > 9) {
      formattedValue += `-${value.substring(9, 11)}`;
    }

    dispatch(updatePhone(formattedValue));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <div className="flex gap-x-2">
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="+7 (___) ___-__-__"
          className="w-full p-2 text-white bg-[#222222] rounded"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 rounded ${
            isLoading ? "bg-gray-400" : "bg-[#222222] hover:bg-[#222555]"
          } text-white`}
        >
          {isLoading ? "Отправка..." : "Заказать"}
        </button>
      </div>

      {(localError || error) && (
        <div className="text-red-500">
          {localError || "Ошибка при отправке заказа"}
        </div>
      )}

      {isSuccess && (
        // <div className="text-green-500">Заказ успешно оформлен!</div>
        <Popup />
      )}
    </form>
  );
}
