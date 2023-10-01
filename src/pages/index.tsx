import ProductList from "@/components/template/ProductList/ProductList";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="tw-flex tw-justify-center tw-px-7">
        <ProductList />
      </div>
    </main>
  );
}
