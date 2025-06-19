import { CartState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

// Загрузка состояния из localStorage
const loadState = (): CartState => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    const savedPhone = localStorage.getItem("phone");
    return {
      items: savedCart ? JSON.parse(savedCart) : [],
      phone: savedPhone || "",
    };
  }
  return { items: [], phone: "" };
};

const initialState: CartState = loadState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Добавление товара в корзину
    addToCart: (
      state,
      action: PayloadAction<{
        id: number;
        quantity?: number;
        price: number;
        title: string;
        image_url: string;
        description: string;
      }>
    ) => {
      const {
        id,
        quantity = 1,
        price,
        title,
        image_url,
        description,
      } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id,
          quantity,
          price,
          title,
          image_url,
          description,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    // Удаление товара из корзины
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    // Обновление количества товара
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    // Обновление телефона
    updatePhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
      localStorage.setItem("phone", state.phone);
    },
    // Очистка корзины
    clearCart: (state) => {
      state.items = [];
      state.phone = "";
      localStorage.removeItem("cart");
      localStorage.removeItem("phone");
    },
  },
});

// Экспортируем actions и reducer
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  updatePhone,
  clearCart,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartPhone = (state: RootState) => state.cart.phone;
export const selectItemQuantity = (id: number) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id)?.quantity || 0;

export default cartSlice.reducer;
