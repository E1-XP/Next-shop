import { Product } from "@prisma/client";
import { create } from "zustand";

interface CartItem {
  product: Product;
  quantity: number;
}

interface Cart {
  products: CartItem[];
  addProduct: (item: CartItem) => void;
}

export const useCartStore = create<Cart>((set) => ({
  products: [],
  addProduct: (item) => {
    set((state) => {
      const duplicatedItemIdx = state.products.findIndex(
        (itm) => itm.product.id === item.product.id
      );

      if (duplicatedItemIdx !== -1) {
        const updatedCart = [...state.products];
        const duplicate = updatedCart[duplicatedItemIdx];
        duplicate.quantity += 1;

        return { cart: updatedCart };
      }

      return { products: [...state.products, item] };
    });
  },
}));
