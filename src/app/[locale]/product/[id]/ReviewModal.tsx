"use client";

import * as React from "react";
import Modal from "react-modal";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { twMerge } from "tailwind-merge";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

import PlusIcon from "@/app/_components/icons/Plus";
import Rating from "@/app/_components/Rating";
import Button from "@/app/_components/Button";
import Input, { Types } from "@/app/_components/Input";

import { SchemaType, reviewSchema } from "./validation";

import { trpc } from "@/app/_trpc/client";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const ReviewModal = ({ isOpen, closeModal }: Props) => {
  const t = useTranslations("Product.ReviewModal");
  const session = useSession();
  const params = useParams();

  const data = {
    buttonText: t("buttonText"),
    heading: t("heading"),
    ratingText: t("ratingText"),
    noRatingError: t("noRatingError"),
    inputs: [
      {
        type: "textarea",
        label: t("inputs.0.label"),
        placeholder: t("inputs.0.placeholder"),
        id: "review",
      },
      {
        type: "text",
        label: t("inputs.1.label"),
        placeholder: t("inputs.1.placeholder"),
        id: "username",
      },
    ] as ({ type: Types } & { [key: string]: string })[],
    creationError: t("creationError"),
  };

  const [rating, setRating] = React.useState(0);
  const [noRatingError, setNoRatingError] = React.useState(false);

  React.useEffect(() => {
    if (noRatingError && rating !== 0) setNoRatingError(false);
  }, [noRatingError, rating]);

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SchemaType>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(reviewSchema),
  });

  const validateRating = () => {
    if (rating === 0) setNoRatingError(true);
  };

  const utils = trpc.useContext();

  const { mutate: createReview } = trpc.review.create.useMutation({
    onSuccess(data) {
      closeModal();

      utils.review.get.setData({ productId: data.productId }, (reviews) => [
        ...(reviews || []),
        data,
      ]);
    },
    onError() {
      toast.error(data.creationError);
    },
  });

  const onSubmit: SubmitHandler<SchemaType> = async (formData) => {
    const productId = params.id;
    const userId = session.data?.user.id;

    if (!productId || !userId || Array.isArray(productId)) return;

    createReview({
      ...formData,
      rating,
      userId,
      productId,
    });
  };

  return (
    <Modal
      id="gallery-modal"
      isOpen={isOpen}
      style={{
        overlay: { zIndex: "50" },
        content: {
          height: "fit-content",
          inset: "none",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: "320px",
          width: "90%",
          maxWidth: "900px",
        },
      }}
      closeTimeoutMS={200}
      onAfterClose={() => (
        clearErrors(), setRating(0), setNoRatingError(false), reset()
      )}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
    >
      <form className="flex flex-col gap-12" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <p className="text font-semibold">{data.heading}</p>
          <button onClick={closeModal} type="button" className="">
            <PlusIcon className="rotate-45 h-8 w-8 opacity-60 hover:opacity-100 transition" />
          </button>
        </div>
        <div className="flex flex-col gap-8">
          <div className="relative">
            <Input
              type={data.inputs[0].type}
              label={data.inputs[0].label}
              placeholder={data.inputs[0].placeholder}
              id={data.inputs[0].id}
              register={register}
              className={twMerge(
                "w-full h-52 mini-scrollbar",
                errors.review?.message ? "border-red-500 outline-red-500" : ""
              )}
            />
            <p className="text-red-500 font-body text-sm absolute -bottom-[24px] left-0">
              {errors.review?.message}
            </p>
          </div>
          <div className="relative">
            <Input
              type={data.inputs[1].type}
              label={data.inputs[1].label}
              placeholder={data.inputs[1].placeholder}
              id={data.inputs[1].id}
              register={register}
              className={twMerge(
                "w-fit",
                errors.username?.message ? "border-red-500 outline-red-500" : ""
              )}
            />
            <p className="text-red-500 font-body text-sm absolute -bottom-[24px] left-0">
              {errors.username?.message}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-8 relative">
          <p
            className={twMerge(
              "hidden sm:block text",
              noRatingError ? "text-red-500" : ""
            )}
          >
            {data.ratingText}
          </p>
          <Rating
            rate={rating}
            onClickSelect={setRating}
            variant="xl"
            className="mr-auto"
            itemClassName={noRatingError ? "stroke-red-500" : ""}
          />
          <Button
            rounded
            disabled={isSubmitting}
            type="submit"
            onClick={validateRating}
          >
            {data.buttonText}
          </Button>
          <p className="hidden sm:block text-red-500 font-body text-sm absolute -bottom-[12px] left-0">
            {noRatingError ? data.noRatingError : undefined}
          </p>
        </div>
      </form>
    </Modal>
  );
};

export default ReviewModal;
