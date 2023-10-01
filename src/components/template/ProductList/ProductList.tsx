import { useMemo, useState } from "react";
import Style from "./ProductList.module.scss";
import listOfProduct from "@/config/constant/productList.json";
import { Product } from "@/config/interface";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "@mantine/core";

const ProductList: React.FC<any> = () => {
  const [productList, setProductList] = useState(listOfProduct);

  return (
    <div
      className={
        "tw-w-full tw-min-h-[70vh] tw-grid tw-grid-cols-6 tw-gap-4 tw-items-center tw-justify-center"
      }
    >
      {productList.map((item: Product) => {
        return (
          <div className="tw-col-span-1 tw-flex tw-justify-center tw-flex-col tw-items-center">
            <p>{item.name}</p>
            <Button>test</Button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
