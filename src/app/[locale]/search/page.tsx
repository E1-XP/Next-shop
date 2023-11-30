"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";

import Dropdown from "@/app/_components/dropdowns/Base";
import ProductList from "@/app/_components/ProductList";
import Pagination from "@/app/_components/Pagination";

import { trpc } from "@/app/_trpc/client";
import { mapPrismaDateStringsToObjects } from "@/app/_helpers";

const SearchPage = () => {
  const t = useTranslations("SearchPage");
  const params = useSearchParams();
  const query = params.get("query") || "";

  const [page, setPage] = React.useState(1);
  const perPage = 10;

  const sortingValues = ["asc", "desc"];
  const sortingOptionsText = [t("sortingOptions.0"), t("sortingOptions.1")];

  const [sortingOrder, setSortingOrder] = React.useState(sortingValues[0]);

  const { data: fetchedData, isFetching } = trpc.product.getAll.useQuery({
    query: query.length ? query : undefined,
    perPage,
    page,
    order: sortingOrder,
  });

  const products =
    fetchedData?.products?.map((p) => mapPrismaDateStringsToObjects(p)) || [];

  const data = {
    heading: t("heading"),
    noProductsText: t("noProductsText"),
    paragraph: t("paragraph", { count: fetchedData?.total }),
  };

  const onSortingSelect = (idx: number) => {
    setSortingOrder(sortingValues[idx]);
  };

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

        {(products.length !== 0 || isFetching) && (
          <div className="items-center justify-end w-full flex">
            {isFetching ? (
              <Skeleton className="w-[200px]" />
            ) : (
              <Dropdown
                options={sortingOptionsText}
                onOptionSelect={onSortingSelect}
              />
            )}
          </div>
        )}
      </header>
      <div className="flex flex-col gap-24 items-center">
        {(products.length !== 0 || isFetching) && (
          <ProductList products={products} isLoading={isFetching} />
        )}
      </div>
      {!!fetchedData?.products.length && fetchedData.total > perPage && (
        <Pagination
          className="self-center mt-auto"
          pageControl={[page, setPage]}
          total={fetchedData?.total ?? 0}
          perPage={perPage}
        />
      )}
    </div>
  );
};

export default SearchPage;
