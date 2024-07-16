import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import SelectModal from "./SelectModal";

type ModalFilterType = {
  openFilterModal: boolean;
  setOpenFilterModal: (value: boolean) => void;
};

export default function ModalFilter({
  openFilterModal,
  setOpenFilterModal,
}: ModalFilterType) {
  return (
    <Modal
      isOpen={openFilterModal}
      onClose={() => setOpenFilterModal(false)}
      size="full"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <div className="w-full flex items-center flex-col mt-7">
                <Image width={72} height={72} src="/icons/Logo.svg" alt="" />
                <div className="mt-5 w-full flex gap-3 justify-between flex-wrap">
                  <SelectModal label="شهر" titleSelect="انتخال شهر" />
                  <p className="w-full">ggggg</p>
                  <p className="w-full">ggggg</p>
                  <p className="w-full">ggggg</p>
                  <p className="w-full">ggggg</p>
                  <p className="w-full">ggggg</p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                حذف فیلترها
              </Button>
              <Button color="primary" onPress={onClose}>
                اعمال فیلتر
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
