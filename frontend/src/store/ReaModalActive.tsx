import create from "zustand";

interface ActiveModalName {
  activeModalName: "ContactInfo" | "Share" | "Score" | undefined;
  setActiveModalName: (
    val: "ContactInfo" | "Share" | "Score" | undefined
  ) => void;
}

export const useActiveModalName = create<ActiveModalName>((set) => ({
  activeModalName: undefined,
  setActiveModalName: (val) => set(() => ({ activeModalName: val })),
}));
