import { useEffect, useMemo, useState } from "react";
import Style from "./ProductList.module.scss";
import { Carts, Product } from "@/config/interfaces";
import { FaShoppingCart } from "react-icons/fa";
import { Button, Card } from "@mantine/core";
import { Image } from "@mantine/core";
import { useRecoilState } from "recoil";
import { cartDataAtom } from "@/store/cartStore";
import { productTable } from "@/config/DbConfig";
import { updateProduct } from "@/hooks/updateProduct";
import { hapusSemuaIsiTabel } from "@/config/deleteTable";

const ProductList: React.FC<any> = () => {
  const [productList, setProductList] = useState<Product[]>([]);

  const [cart, setCart] = useRecoilState(cartDataAtom);

  useEffect(() => {
    const simpleCart = JSON.parse(localStorage.getItem("simpleCart") || "[]");
    setCart(simpleCart);
  }, []);

  const addToCart = async (data: any) => {
    const newCartItem = {
      id: data.id,
      name: data.name,
      price: data.price,
      image: data.image,
      qty: 1,
      description: data.description,
    };
    const findIndex = cart.findIndex((item: Carts) => item.id === data.id);

    if (findIndex !== -1) {
      // check if item already exists in cart
      const updatedCart = [...cart];
      const tempItem = { ...updatedCart[findIndex] }; // break it down so it can be manipulated
      tempItem.qty += 1;
      updatedCart[findIndex] = tempItem;

      setCart(updatedCart); // update cart state
      localStorage.setItem("simpleCart", JSON.stringify(updatedCart)); // save to localStorage

      const updatedProduct = await updateProduct(data.id, {
        stock: data.stock - 1,
      });

      console.log("updatedProduct: ", updatedProduct);
    } else {
      // Item not exist yet in cart
      const updatedCart = [...cart, newCartItem];

      setCart(updatedCart); // update cart state
      localStorage.setItem("simpleCart", JSON.stringify(updatedCart)); //save to localStorage
    }
  };

  async function productTableData() {
    try {
      const allProduct = await productTable.toArray();
      setProductList(allProduct);
    } catch (error) {
      console.error("Gagal mengambil data dari tabel:", error);
    }
  }

  useEffect(() => {
    // hapusSemuaIsiTabel();
    // localStorage.clear();
    productTableData();
  }, []);

  productTable.hook(
    "updating",
    function (modifications, primKey, obj, transaction) {
      console.log("modifications: ", modifications);
    }
  );

  useEffect(() => {
    console.log("cart: ", cart);
  }, [cart]);

  useEffect(() => {
    console.log("productList: ", productList);
  }, [productList]);

  return (
    <div
      className={
        "tw-w-full tw-min-h-[70vh] tw-grid tw-grid-cols-2 md:tw-grid-cols-3 xl:tw-grid-cols-4 tw-gap-2 md:tw-gap-8 xl:tw-gap-16 tw-gap-y-4 md:tw-gap-y-8 xl:tw-gap-y-16 tw-items-center tw-justify-center"
      }
    >
      {productList &&
        productList.map((item: Product) => {
          return (
            <Card key={item.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={"/assets/img/iphone15BackgroundRemoved.png"} />
              </Card.Section>
              <p>{item.name}</p>
              <Button
                color="orange.5"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);
                }}
              >
                Add to Cart
              </Button>
            </Card>
          );
        })}
    </div>
  );
};

export default ProductList;
