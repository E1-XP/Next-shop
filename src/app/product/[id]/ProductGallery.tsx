import { Product } from "@prisma/client";
import * as React from "react";

interface Props {
  data: Product;
}

const ProductGallery = ({ data }: Props) => {
  return <div>{data.images.length}</div>;
};

export default ProductGallery;
