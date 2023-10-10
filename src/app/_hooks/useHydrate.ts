"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "../_store/cart";

export const useHydrate = () => {
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    useCartStore.persist.rehydrate();
    setIsHydrating(false);
  }, []);

  return isHydrating;
};
