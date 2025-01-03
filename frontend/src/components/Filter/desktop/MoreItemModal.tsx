import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/modal";
import MoreItems from "../MoreItems";
import {
  Control,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReset,
  UseFormWatch,
} from "react-hook-form";
import { FilterDataType } from "@/types/Type";
import { BaseSyntheticEvent } from "react";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";

type MoreItemModalType = {
  isOpen: boolean;
  onOpenChange: () => void;
  control: Control<FilterDataType, any>;
  watch: UseFormWatch<FilterDataType>;
  handleSubmit: (
    onValid: SubmitHandler<FilterDataType>,
    onInvalid?: SubmitErrorHandler<FilterDataType> | undefined
  ) => (e?: BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<FilterDataType>;
  reset: UseFormReset<FilterDataType>;
};

export default function MoreItemModal({
  isOpen,
  onOpenChange,
  control,
  watch,
  handleSubmit,
  onSubmit,
  reset,
}: MoreItemModalType) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <div className="overflow-y-auto h-[85vh] pb-4 scrollbar-none">
                  <MoreItems control={control} watch={watch} />
                </div>
              </ModalBody>
              <ModalFooter className="justify-center gap-4">
                <Button
                  type="submit"
                  radius="sm"
                  className="bg-primary text-white"
                  variant="shadow"
                >
                  جست و جو
                </Button>

                <Button
                  radius="sm"
                  color="danger"
                  variant="bordered"
                  onPress={() => {
                    router.push(pathname, undefined);
                    onClose();
                  }}
                >
                  حذف فیلترها
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
