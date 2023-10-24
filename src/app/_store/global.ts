import { Product } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { currencies } from "../_helpers/constants";

type Currencies = (typeof currencies)[number];
export interface Store {
  currency: Currencies;
  setCurrency: (currency: Currencies) => void;
}

export const useGlobalStore = create<Store>()(
  persist(
    (set) => ({
      currency: "usd",
      setCurrency: (currency) => {
        set((state) => {
          return { ...state, currency };
        });
      },
    }),
    { name: "global-store", skipHydration: true }
  )
);
