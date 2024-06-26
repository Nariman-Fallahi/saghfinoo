// modalStore.ts
import create from 'zustand';

interface ModalState {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
}

const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    setOpen: (open) => set({ isOpen: open }),
}));

export default useModalStore;
