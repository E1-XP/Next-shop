"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "../_store/cart";
import { useGlobalStore } from "../_store/global";

export const useHydrate = () => {
  const [isHydrating, setIsHydrating] = useState(true);

  const rehydrate = async () => {
    await Promise.all([
      useGlobalStore.persist.rehydrate(),
      useCartStore.persist.rehydrate(),
    ]);

    setIsHydrating(false);
  };

  useEffect(() => {
    rehydrate();
  }, []);

  return isHydrating;
};
