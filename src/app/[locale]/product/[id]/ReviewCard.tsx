import * as React from "react";
import { useTranslations } from "next-intl";

import { Product, Review } from "@prisma/client";
import Rating from "@/app/_components/Rating";

interface Props {
  review: Review;
  product: Product;
}

const ReviewCard = ({ review, product }: Props) => {
  const t = useTranslations("Product.ReviewCard");

  const data = {
    rating: t("rating"),
    by: t("by"),
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="text font-semibold">
        {product.brand} {product.name}
      </p>
      <p className="text">{review.text}</p>
      <div className="text flex gap-2 items-center">
        {data.rating}
        <Rating rate={review.rating} />
      </div>
      <p className="text flex gap-1">
        {data.by}
        <span className="text font-semibold">{review.authorName}</span>
      </p>
    </div>
  );
};

export default ReviewCard;
