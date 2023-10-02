import { productTable } from "@/config/DbConfig";

export async function updateProduct(productId: number, updatedFields: any) {
  try {
    // Temukan produk berdasarkan ID
    const product = await productTable.get(productId);

    if (product) {
      // Update produk dengan data yang diperbarui
      await productTable.update(productId, updatedFields);
      console.log("Product updated successfully");
    } else {
      console.error("Product not found");
    }
  } catch (error) {
    console.error("Error updating product:", error);
  }
}
