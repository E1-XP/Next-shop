import { Product } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { sizeKeys } from "../_components/SizeSelector";

export interface CartItem {
  product: Product;
  quantity: number;
  size: sizeKeys;
}

export interface CartItemRemoval {
  id: string;
  size: sizeKeys;
}

export interface Cart {
  products: CartItem[];
  addProduct: (item: CartItem) => void;
  removeProduct: (data: CartItemRemoval, deleteAll?: boolean) => void;
  clearBasket: () => void;
}

export const useCartStore = create<Cart>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (item) => {
        set((state) => {
          const existingItemIdx = state.products.findIndex(
            (itm) =>
              itm.product.id === item.product.id && item.size === itm.size
          );

          if (existingItemIdx > -1) {
            const updatedCart = [...state.products];

            const duplicateCopy = { ...updatedCart[existingItemIdx] };
            duplicateCopy.quantity += item.quantity;

            updatedCart[existingItemIdx] = duplicateCopy;

            return { ...state, products: updatedCart };
          }

          return { ...state, products: [...state.products, item] };
        });
      },
      removeProduct: ({ id, size }, deleteAll = false) => {
        set((state) => {
          const existingItemIdx = state.products.findIndex(
            (itm) => itm.product.id === id && itm.size === size
          );

          if (existingItemIdx !== -1) {
            const updatedCart = [...state.products];
            const existingitem = updatedCart[existingItemIdx];
            existingitem.quantity -= 1;

            if (deleteAll || existingitem.quantity === 0) {
              return {
                ...state,
                products: updatedCart.filter(
                  (p) =>
                    !(
                      p.product.id === existingitem.product.id &&
                      p.size === existingitem.size
                    )
                ),
              };
            }

            return { ...state, products: updatedCart };
          }

          return { ...state };
        });
      },
      clearBasket: () => {
        set((state) => {
          return { ...state, products: [] };
        });
      },
    }),
    { name: "cart-store", skipHydration: true }
  )
);
