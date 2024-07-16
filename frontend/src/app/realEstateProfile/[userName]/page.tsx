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

export default function page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [nameActiveModal, setNameActiveModal] = useState<string>("");
  const[openFilterModal, setOpenFilterModal] = useState<boolean>(false);

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
      <Ads setOpenFilterModal={setOpenFilterModal} />
      <ModalFilter openFilterModal={openFilterModal} setOpenFilterModal={setOpenFilterModal} />
      <Comments />
      <FooterMenu />
    </>
  );
}
