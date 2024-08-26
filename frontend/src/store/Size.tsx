import create from "zustand";

interface sizeBtn {
  sizeBtn: "sm" | "md" | "lg" | undefined;
  setSizeBtn: (val: "sm" | "md" | "lg" | undefined) => void;
}

export const useSizeBtn = create<sizeBtn>((set) => ({
  sizeBtn: undefined,
  setSizeBtn: (val) => set(() => ({ sizeBtn: val })),
}));
