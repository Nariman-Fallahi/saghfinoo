// modal-Register-Store
import create from "zustand";
import { UserStatusValue } from "./enum/enums";

interface ModalState {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  setOpen: (open) => set({ isOpen: open }),
}));

// UserStatus

interface UserStatus {
  userStatus: string;
  setUserStatus: (val: string) => void;
}
export const useUserStatus = create<UserStatus>((set) => ({
  userStatus: UserStatusValue.status1,
  setUserStatus: (val) => set(() => ({ userStatus: val })),
}));