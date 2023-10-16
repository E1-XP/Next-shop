"use client";

import { Product, Review } from "@prisma/client";
import * as React from "react";

import ReviewCard from "./ReviewCard";
import Button from "@/app/_components/Button";
import ReviewModal from "./ReviewModal";

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

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text">
          {reviews.length ? textData.listHeaderText : textData.noReviewsText}
        </p>
        <Button rounded className="whitespace-nowrap" onClick={toggleModal}>
          {textData.createButtonText}
        </Button>
      </div>
      {reviews.map((data) => (
        <ReviewCard product={product} review={data} key={data.id} />
      ))}
      <ReviewModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ReviewsList;
