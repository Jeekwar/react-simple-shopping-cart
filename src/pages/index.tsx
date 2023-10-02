import SearchBar from "@/components/molecules/SearchBar/SearchBar";
import Header from "@/components/template/Header/Header";
import ProductList from "@/components/template/ProductList/ProductList";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="tw-flex tw-flex-col tw-justify-center tw-px-7 tw-gap-8 tw-pt-6">
        <SearchBar />
        <ProductList />
      </div>
    </main>
  );
}
