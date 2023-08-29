import Link from "next/link";
import * as React from "react";

interface Item {
  text: string;
  link: string;
}

interface Props {
  data: Item[];
}

const Breadcrumbs = ({ data }: Props) => {
  return (
    <p className="flex gap-3 font-body font-normal text-sm text-grayWhite">
      {data.map((item, i, arr) => (
        <Link key={item.text} href={item.link}>
          <span className="hover:text-darkGray transition mr-1">
            {item.text}
          </span>{" "}
          {i !== arr.length - 1 && ">"}
        </Link>
      ))}
    </p>
  );
};

export default Breadcrumbs;
