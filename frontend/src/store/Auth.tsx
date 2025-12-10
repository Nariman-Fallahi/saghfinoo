import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  setOpen: (open) => set({ isOpen: open }),
}));
