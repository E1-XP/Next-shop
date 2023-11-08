import { NextIntlProvider } from "next-intl";
import { ReactNode } from "react";

import messages from "@/app/_i18n/en.json";
import { TrpcQueryProvider } from "@/app/_providers/TrpcQueryProvider";

interface Props {
  children: ReactNode;
}

export const RootMock = ({ children }: Props) => {
  return (
    <TrpcQueryProvider>
      <NextIntlProvider messages={messages} locale="en">
        {children}
      </NextIntlProvider>
    </TrpcQueryProvider>
  );
};

export const product = {
  id: "1",
  modelId: "1_01",
  name: "test",
  brand: "brand",
  gender: 1,
  category: 0,
  stripeId: "1",
  descriptionEN: "",
  descriptionPL: "",
  pricePLNId: "1",
  priceUSDId: "2",
  oldPricePLNId: "3",
  oldPriceUSDId: "4",
  color: "#333",
  xs: 0,
  s: 0,
  m: 23,
  l: 0,
  xl: 0,
  xxl: 0,
  images: [
    "https://res.cloudinary.com/depuvzzj0/image/upload/v1699118496/f1b2a06b136b4891b47e15f48934e12f_ng4gfh_j6z2g3.webp",
    "https://res.cloudinary.com/depuvzzj0/image/upload/v1699118502/67f3414bff31407ea67cb7b5e766f8b9_zuauzd_iik4zl.webp",
    "https://res.cloudinary.com/depuvzzj0/image/upload/v1699118502/15ef95aff16b411da07a288f418a442b_syd9n6_rkjziz.webp",
    "https://res.cloudinary.com/depuvzzj0/image/upload/v1699118499/ebd327973807446aaa51e8e9655705c0_vomaht_j6hbs6.webp",
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const product2 = {
  id: "2",
  modelId: "1_02",
  name: "test",
  brand: "brand",
  gender: 1,
  category: 0,
  stripeId: "2",
  descriptionEN: "",
  descriptionPL: "",
  pricePLNId: "2",
  priceUSDId: "3",
  oldPricePLNId: "4",
  oldPriceUSDId: "5",
  color: "#333",
  xs: 0,
  s: 1,
  m: 2,
  l: 4,
  xl: 0,
  xxl: 0,
  images: [
    "https://res.cloudinary.com/depuvzzj0/image/upload/v1699118496/f1b2a06b136b4891b47e15f48934e12f_ng4gfh_j6z2g3.webp",
    "https://res.cloudinary.com/depuvzzj0/image/upload/v1699118502/67f3414bff31407ea67cb7b5e766f8b9_zuauzd_iik4zl.webp",
    "https://res.cloudinary.com/depuvzzj0/image/upload/v1699118502/15ef95aff16b411da07a288f418a442b_syd9n6_rkjziz.webp",
    "https://res.cloudinary.com/depuvzzj0/image/upload/v1699118499/ebd327973807446aaa51e8e9655705c0_vomaht_j6hbs6.webp",
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};
