import { atom } from "jotai";

interface SearchProps {
  search: string;
}

export const searchState = atom<SearchProps>({
  search: "",
});
