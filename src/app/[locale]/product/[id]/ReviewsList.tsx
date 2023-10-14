import { Product, Review } from "@prisma/client";
import * as React from "react";

import ReviewCard from "./ReviewCard";
import Button from "@/app/_components/Button";

interface Props {
  reviews: Review[];
  product: Product;
}

const ReviewsList = ({ reviews, product }: Props) => {
  const textData = {
    listHeaderText: "Only logged in users can write reviews.",
    createButtonText: "Create review",
    noReviewsText: " No reviews found. Maybe it's time to write the first one?",
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text">
          {reviews.length ? textData.listHeaderText : textData.noReviewsText}
        </p>
        <Button className="whitespace-nowrap">
          {textData.createButtonText}
        </Button>
      </div>
      {reviews.map((data) => (
        <ReviewCard product={product} review={data} key={data.id} />
      ))}
    </>
  );
};

export default ReviewsList;
