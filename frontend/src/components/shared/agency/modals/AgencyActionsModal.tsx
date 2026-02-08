import ContactInfoModal from "@/components/shared/agency/modals/ContactInfo";
import ReportModal from "@/components/shared/agency/modals/Report";
import ScoreModal from "@/components/shared/agency/modals/Score";
import ShareModal from "@/components/shared/agency/modals/Share";
import {
  AgencyActionsModalType,
  AgencyActionType,
  AgencyEntityType,
} from "@/types";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";

interface AgencyActionsModalProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  data: AgencyActionsModalType;
  realatorId?: string;
  page: AgencyEntityType;
  agencyAction: AgencyActionType;
}

export default function AgencyActionsModal({
  isOpen,
  onOpenChange,
  data,
  page,
  realatorId,
  agencyAction,
}: AgencyActionsModalProps) {
  const renderContent = (onClose: () => void) => {
    switch (agencyAction) {
      case "ContactInfo":
        return <ContactInfoModal data={data} />;
      case "Share":
        return <ShareModal data={data.socialNetwork} />;
      case "Score":
        return <ScoreModal data={data} id={realatorId} onClose={onClose} />;
      case "Report":
        return (
          <ReportModal
            data={data}
            realatorId={realatorId}
            onClose={onClose}
            page={page}
          />
        );
      default:
        return null;
    }
  };

  const isContactMode = agencyAction === "ContactInfo";

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={
        isContactMode
          ? "md"
          : ["Score", "Report"].includes(agencyAction || "")
            ? "xl"
            : "md"
      }
      classNames={{
        wrapper: isContactMode ? "max-md:p-0" : "",
        base: isContactMode
          ? "max-md:m-0 max-md:max-w-full max-md:h-full max-md:rounded-none md:pb-8"
          : "",
      }}
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody className={isContactMode ? "p-0" : "p-4"}>
            {renderContent(onClose)}
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
