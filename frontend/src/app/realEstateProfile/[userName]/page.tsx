"use client";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";

import Menu from "@/components/Menu/HeaderMenu/Menu";
import Info from "@/components/realEstateProfile/Info";
import ModalREA from "@/components/realEstates-realators/ModalREA";
import Consultants from "@/components/realEstateProfile/Consultants";
import Ads from "@/components/realEstates-realators/Ads";
import ModalFilter from "@/components/realEstates-realators/AdsFilter/ModalMobile/ModalFilter";
import Comments from "@/components/realEstates-realators/Comments";
import FooterMenu from "@/components/Menu/FooterMenu/FooterMenu";

export default function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [nameActiveModal, setNameActiveModal] = useState<string>("");

  return (
    <>
      <Menu />
      <Info onOpen={onOpen} setNameActiveModal={setNameActiveModal} />
      <ModalREA
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        nameActiveModal={nameActiveModal}
      />
      <Consultants />
      <Ads />
      <Comments />
      <FooterMenu />
    </>
  );
}
