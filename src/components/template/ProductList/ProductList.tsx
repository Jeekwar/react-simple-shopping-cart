import { useEffect, useMemo, useState } from "react";
import Style from "./ProductList.module.scss";
import { Carts, Product } from "@/config/interfaces";
import { FaShoppingCart } from "react-icons/fa";
import { Box, Button, Card, SimpleGrid, Text, rem } from "@mantine/core";
import { Image } from "@mantine/core";
import { useRecoilState } from "recoil";
import { cartDataAtom } from "@/store/cartStore";
import { productTable } from "@/config/DbConfig";
import { updateProduct } from "@/hooks/updateProduct";
import { hapusSemuaIsiTabel } from "@/config/deleteTable";
import { searchState } from "@/store/searchStore";
import { useAtom } from "jotai";

const ProductList: React.FC<any> = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [cart, setCart] = useRecoilState(cartDataAtom);
  const [changesProduct, setChangesProduct] = useState<any>("");
  const [{ search }, setPopupCannotAccess] = useAtom(searchState);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  let IDR = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

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

      const updatedProduct = await updateProduct(data.id, {
        stock: data.stock - 1,
      });
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

  // Seacrh Product
  useEffect(() => {
    if (search) {
      const filtered = productList.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(productList);
    }
  }, [search, productList]);
  // end Search Product

  useEffect(() => {
    // hapusSemuaIsiTabel();
    // localStorage.clear();
    productTableData();
    productTable.hook(
      "updating",
      function (modifications, primKey, obj, transaction) {
        console.log("modifications: ", modifications);
        setChangesProduct(modifications);
      }
    );
  }, []);

  useEffect(() => {
    console.log("change!!", changesProduct);
    productTableData();
  }, [changesProduct]);

  // useEffect(() => {
  //   console.log("cart: ", cart);
  // }, [cart]);

  // useEffect(() => {
  //   console.log("productList: ", productList);
  // }, [productList]);

  return (
    // <div
    //   className={
    //     "tw-w-full tw-min-h-[100vh] tw-grid tw-grid-cols-2 md:tw-grid-cols-3 xl:tw-grid-cols-4 tw-gap-2 md:tw-gap-8 xl:tw-gap-16  tw-items-center tw-justify-center"
    //   }
    // >

    // </div>

    <Box mih={"100vh"}>
      <SimpleGrid
        cols={{
          base: 2,
          sm: 3,
          lg: 4,
        }}
        spacing={{ base: 10, sm: "md", md: "lg", xl: "xl" }}
      >
        {filteredProducts &&
          filteredProducts.map((item: Product) => {
            return (
              <Card
                key={item.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                p={rem(12)}
              >
                <Card.Section>
                  <Image src={"/assets/img/iphone15BackgroundRemoved.png"} />
                </Card.Section>
                <p>{item.name}</p>
                <Text fw={600}>{` ${IDR.format(item.price)}`}</Text>
                <Button
                  color="orange.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                  disabled={item.stock <= 0}
                >
                  Add to Cart
                </Button>
              </Card>
            );
          })}
      </SimpleGrid>
    </Box>
  );
};

export default ProductList;
