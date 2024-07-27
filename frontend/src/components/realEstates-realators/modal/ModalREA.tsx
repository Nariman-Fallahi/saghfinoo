import { Modal, ModalContent, ModalBody } from "@nextui-org/modal";
import { isMobile } from "@/constant/Constants";
import { useActiveModalName } from "@/store/ReaModalActive";
import { shareDataModalType } from "@/types/Type";
import { contactInfoDataType } from "@/types/Type";
import ShareModal from "./ShareModal";
import ContactInfoModal from "./ContactInfoModal";
import ScoreModal from "./ScoreModal";
import { useState, useEffect } from "react";

type ModalREAType = {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  contactInfoData: contactInfoDataType;
  shareData: shareDataModalType;
};

export default function ModalREA({
  isOpen,
  onOpenChange,
  contactInfoData,
  shareData,
}: ModalREAType) {
  const { activeModalName } = useActiveModalName();
  const [sizeModal, setSizeModal] = useState<"sm" | "md" | "full">();

  useEffect(() => {
  if (isMobile && activeModalName !== "Score") {
    setSizeModal("sm");
  } else if (!isMobile && activeModalName !== "Score") {
    setSizeModal("md");
  } else if(isMobile && activeModalName === 'Score') {
    setSizeModal("full");
  }
  }, [activeModalName])

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={sizeModal}
      placement="center"
      className="pb-2"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              {activeModalName === "ContactInfo" && (
                <ContactInfoModal contactInfoData={contactInfoData} />
              )}

              {activeModalName === "Share" && (
                // <ShareModal shareData={shareData} />
                <ScoreModal />
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
