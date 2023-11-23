"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";

import Dropdown from "@/app/_components/dropdowns/Base";
import ProductList from "@/app/_components/ProductList";

import { trpc } from "@/app/_trpc/client";
import { mapPrismaDateStringsToObjects } from "@/app/_helpers";

const SearchPage = () => {
  const t = useTranslations("SearchPage");
  const params = useSearchParams();
  const query = params.get("query") || "";

  const { data: productsData, isFetching } = trpc.product.getAll.useQuery(
    { query, limit: 5 },
    { enabled: query.length > 1 }
  );

  const products =
    productsData?.map((p) => mapPrismaDateStringsToObjects(p)) || [];

  const data = {
    heading: t("heading"),
    noProductsText: t("noProductsText"),
    paragraph: t("paragraph", { count: products.length }),
  };

  const sortingOptions = [t("sortingOptions.0"), t("sortingOptions.1")];

  return (
    <div className="wrapper flex flex-col grow gap-[75px] py-[52px]">
      <header className="flex justify-center flex-col gap-[52px]">
        <h2 className="heading-2 md:heading-1 text-center">{data.heading}</h2>
        {isFetching ? (
          <Skeleton containerClassName="content w-full max-w-[360px]" />
        ) : (
          <p className="text-lg font-normal font-body leading-[30px] content">
            {`${data.paragraph} "${query}".`}
          </p>
        )}
        <div className="items-center justify-end w-full flex">
          <Dropdown options={sortingOptions} />
        </div>
      </header>
      <div className="flex flex-col gap-24 items-center">
        {isFetching || products.length ? (
          <ProductList products={products} isLoading={isFetching} />
        ) : (
          <p className="text-lg font-normal font-body leading-[30px] content">
            {data.noProductsText}
          </p>
        )}
      </div>
      pagination in list component?
    </div>
  );
};

export default SearchPage;
