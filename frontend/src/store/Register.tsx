import {create} from "zustand";
import { RegisterStatusValue } from "../constant/Constants";

interface ModalState {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  setOpen: (open) => set({ isOpen: open }),
}));

// ---

interface RegisterStatus {
  registerStatus: string;
  setRegisterStatus: (val: string) => void;
}
export const useRegisterStatus = create<RegisterStatus>((set) => ({
  registerStatus: RegisterStatusValue.status1,
  setRegisterStatus: (val) => set(() => ({ registerStatus: val })),
}));
