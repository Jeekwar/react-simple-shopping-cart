import { useMemo, useState } from "react";
import Style from "./ProductList.module.scss";
import listOfProduct from "@/config/constant/productList.json";
import { Product } from "@/config/interfaces";
import { FaShoppingCart } from "react-icons/fa";
import { Button, Card } from "@mantine/core";
import { Image } from "@mantine/core";

const ProductList: React.FC<any> = () => {
  const [productList, setProductList] = useState(listOfProduct);

  return (
    <div
      className={
        "tw-w-full tw-min-h-[70vh] tw-grid tw-grid-cols-5 tw-gap-16 tw-gap-y-16 tw-items-center tw-justify-center"
      }
    >
      {productList.map((item: Product) => {
        return (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Image src={"/assets/img/iphone15BackgroundRemoved.png"} />
            </Card.Section>
            <p>{item.name}</p>

            <Button>test</Button>
          </Card>
        );
      })}
    </div>
  );
};

export default ProductList;
