import SearchBar from "@/components/molecules/SearchBar/SearchBar";
import Header from "@/components/template/Header/Header";
import ProductList from "@/components/template/ProductList/ProductList";
import IndexedDatabase, { productTable } from "@/config/DbConfig";
import { InitiateIndexedDbData } from "@/config/InitiateIndexedDbData";
import { hapusSemuaIsiTabel } from "@/config/deleteTable";
import { useLiveQuery } from "dexie-react-hooks";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // hapusSemuaIsiTabel();
    InitiateIndexedDbData();
  }, []);

  return (
    <main className="tw-bg-black">
      <Header />
      <div className=" tw-flex tw-flex-col tw-justify-center tw-px-7 tw-gap-8 tw-pt-24">
        <SearchBar />
        <ProductList />
      </div>
    </main>
  );
}
