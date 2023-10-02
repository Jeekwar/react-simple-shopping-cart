import { useLiveQuery } from "dexie-react-hooks";
import { productTable } from "@/config/DbConfig";

export default function useGetProduct({ id }: any) {
  const dataOfProduct = useLiveQuery(() => productTable.get({ id }), [id]);

  return {
    dataOfProduct,
  };
}
