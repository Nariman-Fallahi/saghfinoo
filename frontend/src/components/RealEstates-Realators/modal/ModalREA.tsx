import { Modal, ModalContent, ModalBody } from "@nextui-org/modal";
import { isMobile } from "@/constant/Constants";
import { useActiveModalName } from "@/store/ReaModalActive";
import { DataModalREA } from "@/types/Type";
import ShareModal from "./ShareModal";
import ContactInfoModal from "./ContactInfoModal";
import ScoreModal from "./ScoreModal";
import { useState, useEffect } from "react";

type ModalREAType = {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  data: DataModalREA;
  id?: string | string[];
};

export default function ModalREA({
  isOpen,
  onOpenChange,
  data,
  id,
}: ModalREAType) {
  const { activeModalName } = useActiveModalName();
  const [sizeModal, setSizeModal] = useState<"sm" | "md" | "xl" | "full">();

  useEffect(() => {
    if (isMobile && activeModalName !== "Score") {
      setSizeModal("sm");
    } else if (!isMobile && activeModalName !== "Score") {
      setSizeModal("md");
    } else if (isMobile && activeModalName === "Score") {
      setSizeModal("full");
    } else if (!isMobile && activeModalName === "Score") {
      setSizeModal("xl");
    }
  }, [activeModalName]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={sizeModal}
      placement="center"
      className="overflow-y-auto"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              {activeModalName === "ContactInfo" && (
                <ContactInfoModal data={data} />
              )}

              {/* {activeModalName === "Share" && <ShareModal data={data} />} */}

              {activeModalName === "Score" && (
                <ScoreModal data={data} id={id} onClose={onClose} />
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
