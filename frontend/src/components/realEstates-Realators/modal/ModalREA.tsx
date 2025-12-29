import { Modal, ModalContent, ModalBody } from "@heroui/modal";
import { isMobile } from "@/utils/isMobile";
import { useActiveModalName } from "@/store/ReaModalActive";
import { DataModalREA } from "@/types";
import ShareModal from "./ShareModal";
import ContactInfoModal from "./ContactInfoModal";
import ScoreModal from "./ScoreModal";
import { useState, useEffect } from "react";
import ReportModal from "./ReportModal";
import { getCookie } from "cookies-next";

type ModalREAType = {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  data: DataModalREA;
  id?: string | string[];
  page: "realEstate" | "realator";
};

export default function ModalREA({
  isOpen,
  onOpenChange,
  data,
  id,
  page,
}: ModalREAType) {
  const { activeModalName } = useActiveModalName();
  const [sizeModal, setSizeModal] = useState<"sm" | "md" | "xl" | "full">();
  const access = getCookie("access");

  useEffect(() => {
    if (activeModalName === "Score" || activeModalName === "Report") {
      setSizeModal(isMobile ? "full" : "xl");
    } else {
      setSizeModal(isMobile ? "sm" : "md");
    }
  }, [activeModalName]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={sizeModal}
      className="max-h-screen overflow-y-auto"
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              {activeModalName === "ContactInfo" && (
                <ContactInfoModal data={data} />
              )}

              {activeModalName === "Share" && (
                <ShareModal
                  data={{
                    email: data.socialNetwork.email,
                    facebook: data.socialNetwork.facebook,
                    telegram: data.socialNetwork.telegram,
                    twitter: data.socialNetwork.twitter,
                    whatsapp: data.socialNetwork.whatsapp,
                  }}
                />
              )}

              {activeModalName === "Score" && (
                <ScoreModal
                  data={data}
                  id={id}
                  onClose={onClose}
                  access={access}
                />
              )}

              {activeModalName === "Report" && (
                <ReportModal
                  access={access}
                  data={data}
                  id={id}
                  onClose={onClose}
                  page={page}
                />
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
