import * as React from "react";
import { useTranslations } from "next-intl";

import HeartIcon from "@/app/_components/icons/Heart";
import QuestionCircleIcon from "@/app/_components/icons/QuestionCircle";
import ShareIcon from "@/app/_components/icons/Share";

interface Props {}

const IconsBar = ({}: Props) => {
  const t = useTranslations("Product.IconsBar");

  const data = [
    {
      text: t("0.text"),
      icon: HeartIcon,
    },
    {
      text: t("1.text"),
      icon: QuestionCircleIcon,
    },
    {
      text: t("2.text"),
      icon: ShareIcon,
    },
  ];

  return (
    <div className="flex gap-4 md:gap-8">
      {data.map((item) => (
        <button
          key={item.text}
          className="flex gap-1 items-center font-display font-medium text-sm md:text-base leading-7 -tracking-[0.4px] hover:opacity-70 transition"
        >
          <item.icon className="w-[18px] h-[18px] md:h-5 md:w-5" />
          {item.text}
        </button>
      ))}
    </div>
  );
};

export default IconsBar;
