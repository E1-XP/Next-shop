import * as React from "react";
import Image from "next/image";

import { Product } from "@prisma/client";
import QuantityInput from "../components/QuantityInput";
import { formatPrice } from "../helpers";
import Link from "next/link";
import TrashIcon from "../components/icons/Trash";
import { twMerge } from "tailwind-merge";

interface Props {
  data: Product[];
  className?: string;
}

const ProductTable = ({ data, className }: Props) => {
  const tableData = {
    headers: ["Product", "Quantity", "Price", "Subtotal"],
  };

  return (
    <table
      className={twMerge(
        "w-full text-sm text-left text-darkGray table-auto",
        className
      )}
    >
      <thead className="text-xs text-darkGray">
        <tr className="[&>*:nth-child(2)]:max-md:hidden [&>*:nth-child(2)]:w-[84px] [&>*:nth-child(3)]:w-[68px] flex justify-between items-center">
          {tableData.headers.map((item) => (
            <th
              key={item}
              scope="col"
              className="py-3 first:basis-2/5 button-small max-sm:hidden first:block"
            >
              {item}
              <span className="sm:hidden">s</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item.id}
            className="border-b first:border-t border-whiteGray3 py-4 flex justify-between items-center gap-2"
          >
            <th
              scope="row"
              className="text-darkGray whitespace-nowrap flex gap-4 max-sm:w-full sm:basis-2/5"
            >
              <Link
                href={`/product/${item.id}`}
                className="group flex-shrink-0"
              >
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  width={200}
                  height={400}
                  className="h-[100px] w-auto group-hover:opacity-90 transition"
                />
              </Link>
              <div className="flex sm:flex-col gap-2 justify-between sm:justify-center w-full shrink min-w-0">
                <div className="flex flex-col gap-2 truncate">
                  <Link href={`/product/${item.id}`} className="truncate block">
                    <p className="text font-semibold text-sm leading-[22px] truncate">
                      {item.name}
                    </p>
                  </Link>
                  <p className="text font-normal text-sm leading-[20px] truncate">
                    Size M, Color: TODO
                  </p>
                  <QuantityInput
                    variant="sm"
                    className="bg-white border border-whiteGray3 rounded sm:hidden"
                  />
                </div>
                <div className="gap-2 flex flex-col items-end sm:items-start">
                  <span className="sm:hidden">{formatPrice(item.price)}</span>
                  <button className="flex items-center button-xsmall hover:opacity-70 transition gap-1">
                    <TrashIcon className="stroke-grayWhite w-[18px] h-[18px] shrink-0" />
                    <span className="hidden sm:block">Remove</span>
                  </button>
                </div>
              </div>
            </th>
            <td className="hidden sm:block">
              <QuantityInput
                variant="sm"
                className="bg-white border border-whiteGray3 rounded"
              />
            </td>
            <td className="text text-lg leading-[30px] w-[68px] hidden sm:block">
              {formatPrice(item.price)}
            </td>
            <td className="pr-0 text text-lg leading-[30px] font-semibold max-md:hidden">
              {formatPrice(item.price)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;