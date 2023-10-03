import { cartDataAtom, cartDataState } from "@/store/cartStore";
import { ActionIcon, Box, Divider, Flex, Stack, rem } from "@mantine/core";
import { useRecoilState, useRecoilValue } from "recoil";
import { Image, Text } from "@mantine/core";
import { Carts, Product } from "@/config/interfaces";
import { useEffect, useState } from "react";
import { updateProduct } from "@/hooks/updateProduct";
import { productTable } from "@/config/DbConfig";
import Header from "@/components/template/Header/Header";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { searchState } from "@/store/searchStore";

const CartPage: React.FC = () => {
  const [cart, setCart] = useRecoilState(cartDataAtom);
  const [changesProduct, setChangesProduct] = useState<any>("");
  const [productList, setProductList] = useState<Product[]>([]);
  let IDR = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  useEffect(() => {
    console.log({ searchState });
  }, [searchState]);

  async function productTableData() {
    try {
      const allProduct = await productTable.toArray();
      setProductList(allProduct);
    } catch (error) {
      console.error("Gagal mengambil data dari tabel:", error);
    }
  }

  useEffect(() => {
    const simpleCart = JSON.parse(localStorage.getItem("simpleCart") || "[]");
    setCart(simpleCart);
  }, []);

  useEffect(() => {
    console.log("change!!", changesProduct);
    productTableData();
  }, [changesProduct]);

  const addToCart = async (data: Carts) => {
    const newCartItem = {
      id: data.id,
      name: data.name,
      price: data.price,
      image: data.image,
      qty: 1,
      description: data.description,
    };
    const findIndex = cart.findIndex((item: Carts) => item.id === data.id);
    const findItemInDb = productList.find((item: any) => {
      return item.id === data.id;
    });
    const stockIsAvailable = findItemInDb && findItemInDb?.stock > 0;
    console.log("findItemInDb: ", findItemInDb);

    if (stockIsAvailable) {
      // check if item already exists in cart
      const updatedCart = [...cart];
      const tempItem = { ...updatedCart[findIndex] }; // break it down so it can be manipulated
      tempItem.qty += 1;
      updatedCart[findIndex] = tempItem;

      setCart(updatedCart); // update cart state
      localStorage.setItem("simpleCart", JSON.stringify(updatedCart)); // save to localStorage

      const updatedProduct = await updateProduct(findItemInDb.id, {
        stock: findItemInDb && findItemInDb.stock - 1,
      });
      console.log("updatedProduct: ", updatedProduct);
      return updatedProduct;
    }

    return;
  };

  const removeFromCart = async (product: any) => {
    const updatedCart = [...cart];
    const findIndex = updatedCart.findIndex((item) => item.id === product.id);

    const findItemInDb = productList.find((item: any) => {
      return item.id === product.id;
    });

    if (findIndex !== -1) {
      const tempItem = { ...updatedCart[findIndex] };
      tempItem.qty -= 1;
      updatedCart[findIndex] = tempItem;

      if (tempItem.qty === 0) {
        updatedCart.splice(findIndex, 1); // Jika qty mencapai 0, hapus dari keranjang
      }

      setCart(updatedCart); // update cart state
      localStorage.setItem("simpleCart", JSON.stringify(updatedCart)); // save to localStorage

      console.log("product", product);

      // Kembalikan stok ke produk
      if (findItemInDb) {
        const updatedProduct = await updateProduct(findItemInDb.id, {
          stock: findItemInDb && findItemInDb.stock + 1,
        });
        console.log("updatedProduct: ", updatedProduct);
      }
    }
  };

  useEffect(() => {
    productTable.hook(
      "updating",
      function (modifications, primKey, obj, transaction) {
        console.log("modifications: ", modifications);
        console.log("modifications: ", typeof modifications);
        setChangesProduct(modifications);
      }
    );
  }, []);

  return (
    <>
      <Header />
      <Flex pt={96} bg={"black"} direction={"column"} w={"100%"} mih={"100vh"}>
        {cart.length > 0 ? (
          cart.map((item: Carts) => {
            return (
              <Box key={item.id} px={{ base: "xs", md: "xl", lg: rem(48) }}>
                <Divider />
                <Flex
                  justify={"space-between"}
                  px={{ base: rem(0), md: rem(24) }}
                  gap={rem(12)}
                >
                  <Flex style={{ alignItems: "center" }} gap={rem(8)}>
                    <Box py={rem(6)}>
                      <Image src={item.image} h={80} w={80} />
                    </Box>
                    <Stack gap={"xs"}>
                      <Text style={{ color: "white" }} fs={"sm"} fw={600}>
                        {item.name}
                      </Text>
                      <Text style={{ color: "white" }} fs={"md"}>{`${IDR.format(
                        item.price
                      )}`}</Text>
                    </Stack>
                  </Flex>
                  <Flex
                    style={{ alignItems: "center" }}
                    pr={rem(24)}
                    gap={rem(12)}
                  >
                    <ActionIcon
                      variant="subtle"
                      color="#7AD1DD"
                      aria-label="Minus"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCart(item);
                      }}
                    >
                      <AiOutlineMinus />
                    </ActionIcon>

                    <Text style={{ color: "white" }}>{item.qty}</Text>

                    <ActionIcon
                      variant="subtle"
                      color="#7AD1DD"
                      aria-label="Plus"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                      }}
                    >
                      <AiOutlinePlus />
                    </ActionIcon>
                  </Flex>
                </Flex>
                <Divider />
              </Box>
            );
          })
        ) : (
          <Flex
            w={"100%"}
            h={"100%"}
            justify={"center"}
            content="center"
            pt={rem(96)}
          >
            <Text fw={600} style={{ color: "white" }}>
              {"Keranjang kamu Kosong Nih :( Yuk isi!"}
            </Text>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default CartPage;
