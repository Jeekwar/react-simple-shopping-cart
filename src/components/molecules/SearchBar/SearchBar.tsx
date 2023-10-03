import { searchState } from "@/store/searchStore";
import { Input } from "@mantine/core";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

const SearchBar = () => {
  const setSearch = useSetAtom(searchState);

  return (
    <>
      <Input
        placeholder="Cari"
        onChange={(val) => {
          setSearch({ search: val.target?.value.toString() });
          // console.log(val.target?.value);
        }}
      ></Input>
    </>
  );
};

export default SearchBar;
