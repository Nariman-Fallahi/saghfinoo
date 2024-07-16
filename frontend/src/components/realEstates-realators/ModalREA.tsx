import { Modal, ModalContent, ModalBody } from "@nextui-org/modal";
import Image from "next/image";
import { nameActiveModalValue } from "@/constant/Constants";

type ModalREAType = {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  nameActiveModal: string;
};

export default function ModalREA({
  isOpen,
  onOpenChange,
  nameActiveModal,
}: ModalREAType) {
  let SizeModal: "sm" | "xl" | undefined = undefined;

  if (typeof window !== "undefined") {
    if (window.innerWidth < 768) {
      SizeModal = "sm";
    } else {
      SizeModal = "xl";
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={SizeModal}
      placement="center"
      className="pb-2"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              {nameActiveModal === nameActiveModalValue.ContactInfo && (
                <div className="w-full flex flex-col mt-10 items-center">
                  <Image
                    width={84}
                    height={84}
                    src="/image/Bg-SearchBox.webp"
                    alt=""
                    className="md:w-[120px] md:h-[120px]"
                  />
                  <p className="mt-4 font-bold md:mt-8 md:text-2xl">
                    املاک توسی
                  </p>

                  <div className="mt-12 flex flex-col">
                    <a href="tel:09187986958" className="flex items-center">
                      <span className="ml-2 md:text-xl">09187986958</span>
                      <Image
                        width={22}
                        height={22}
                        src="/icons/call-color.svg"
                        alt=""
                        className="md:w-7 md:h-7"
                      />
                    </a>
                  </div>
                </div>
              )}

              {nameActiveModal === nameActiveModalValue.Share && (
                <div className="flex flex-col mt-10">
                  <p className="font-bold md:mt-8 md:text-2xl text-center">
                    اشتراک گذاری
                  </p>

                  <p className="mt-6 text-sm text-[#505050] md:text-lg md:text-center">
                    این پروفایل را با دیگران به اشتراک بگذارید.
                  </p>

                  <div className="mt-6 md:mt-8 flex flex-col md:px-24">
                    <a href="" className="flex items-center">
                      <Image
                        width={24}
                        height={24}
                        src="/icons/Telegram-blue.svg"
                        alt=""
                        className="md:w-[40px] md:h-[40px]"
                      />
                      <span className="text-xs mr-2 md:text-2xl">تلگرام</span>
                    </a>
                  </div>
                </div>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
