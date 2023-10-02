import { productTable } from "./DbConfig";
import product from "./constant/productList.json";

export const InitiateIndexedDbData = () => {
  product.forEach(async (produk) => {
    try {
      // Cek apakah produk dengan ID tertentu sudah ada dalam tabel
      const existingProduct = await productTable.get({ id: produk.id });

      // Jika produk belum ada, tambahkan ke tabel
      if (!existingProduct) {
        await productTable.add(produk);
        // console.log(
        //   `Produk ${produk.name} berhasil dimasukkan ke dalam database.`
        // );
      } else {
        return;
        // console.log(
        //   `Produk dengan ID ${produk.id} sudah ada dalam database, tidak ditambahkan lagi.`
        // );
      }
    } catch (error) {
      return;
      //   console.error(`Gagal memasukkan produk ${produk.name}:`, error);
    }
  });
};
