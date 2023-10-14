import * as React from "react";
import { Product, Review } from "@prisma/client";
import Rating from "@/app/_components/Rating";

interface Props {
  review: Review;
  product: Product;
}

const ReviewCard = ({ review, product }: Props) => {
  const data = {
    rating: "Rating:",
    by: "by",
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
