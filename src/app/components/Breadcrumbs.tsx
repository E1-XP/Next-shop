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
    <p className="flex gap-2">
      {data.map((item, i, arr) => (
        <Link
          key={item.text}
          href={item.link}
          className="hover:opacity-70 transition"
        >
          {item.text} {i !== arr.length - 1 && ">"}
        </Link>
      ))}
    </p>
  );
};

export default Breadcrumbs;
