import { Product } from "@prisma/client";
import { create } from "zustand";

interface CartItem {
  product: Product;
  quantity: number;
}

interface Cart {
  products: CartItem[];
  addProduct: (item: CartItem) => void;
  removeProduct: (id: string) => void;
}

export const useCartStore = create<Cart>((set) => ({
  products: [],
  addProduct: (item) => {
    set((state) => {
      const duplicatedItemIdx = state.products.findIndex(
        (itm) => itm.product.id === item.product.id
      );

      if (duplicatedItemIdx > -1) {
        const updatedCart = [...state.products];
        const duplicate = updatedCart[duplicatedItemIdx];
        duplicate.quantity += item.quantity;

        return { ...state, products: updatedCart };
      }

      return { ...state, products: [...state.products, item] };
    });
  },
  removeProduct: (id) => {
    set((state) => {
      const existingItemIdx = state.products.findIndex(
        (itm) => itm.product.id === id
      );

      if (existingItemIdx !== -1) {
        const updatedCart = [...state.products];
        const existingitem = updatedCart[existingItemIdx];
        existingitem.quantity -= 1;

        if (existingitem.quantity === 0) {
          return {
            ...state,
            products: updatedCart.filter(
              (p) => p.product.id !== existingitem.product.id
            ),
          };
        }

        return { ...state, products: updatedCart };
      }

      return { ...state, products: state.products };
    });
  },
}));
