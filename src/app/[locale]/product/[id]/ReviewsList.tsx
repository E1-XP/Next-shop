"use client";

import { Product, Review } from "@prisma/client";
import * as React from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import ReviewCard from "./ReviewCard";
import Button from "@/app/_components/Button";
import ReviewModal from "./ReviewModal";
import Skeleton from "react-loading-skeleton";

interface Props {
  reviews: Review[];
  product: Product;
}

const ReviewsList = ({ reviews, product }: Props) => {
  const session = useSession();
  const t = useTranslations("Product.ReviewsList");

  const data = {
    loadingText: t("loadingText"),
    listHeaderText: t("listHeaderText"),
    createButtonText: t("createButtonText"),
    noReviewsText: t("noReviewsText"),
    toastNotAuthenticated: t("toastNotAuthenticated"),
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const isAuthenticated = session.status === "authenticated";
  const isLoading = session.status === "loading";

  const onOpenModalClick = () => {
    if (!isAuthenticated) return toast.info(data.toastNotAuthenticated);

    toggleModal();
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        {isLoading ? (
          <Skeleton containerClassName="w-full" />
        ) : (
          <p className="text">
            {reviews.length ? data.listHeaderText : data.noReviewsText}
          </p>
        )}
        <Button
          rounded
          className="whitespace-nowrap"
          onClick={onOpenModalClick}
        >
          {data.createButtonText}
        </Button>
      </div>
      {isLoading ? (
        <Skeleton count={10} />
      ) : (
        reviews.map((review) => (
          <ReviewCard product={product} review={review} key={review.id} />
        ))
      )}
      <ReviewModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ReviewsList;
