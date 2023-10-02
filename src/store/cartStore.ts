import { Carts } from "@/config/interfaces";
import { atom, selector } from "recoil";

export const cartDataAtom = atom<Carts[]>({
  key: "cartDataAtom",
  default: [],
});

export const cartDataState = selector({
  key: "cartDataState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const cart = get(cartDataAtom);

    return cart;
  },
});
