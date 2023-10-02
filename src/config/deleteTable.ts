import { productTable } from "./DbConfig";

export async function hapusSemuaIsiTabel() {
  try {
    await productTable.clear();
    console.log("Semua isi tabel berhasil dihapus.");
  } catch (error) {
    console.error("Gagal menghapus isi tabel:", error);
  }
}
