"use client";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useGetRequest } from "@/ApiService";
import { Api } from "@/ApiService";
import { realEstateOfficesType } from "@/types/Type";
import ErrNoData from "@/components/ErrNoData";

// Components
import Info from "@/components/RealEstates-Realators/Info";
import ModalREA from "@/components/RealEstates-Realators/modal/ModalREA";
import Consultants from "@/components/Consultants";
import Ads from "@/components/RealEstates-Realators/Ads";
import Comments from "@/components/RealEstates-Realators/Comments";

export default function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const params = useParams();

  const { data, isPending, isError } = useGetRequest<realEstateOfficesType>({
    url: `${Api.GetRealEstateOffices}${params.userName}`,
    key: ["getRealEstateOffices", JSON.stringify(params.userName)],
    enabled: true,
    staleTime: 5 * 60 * 1000,
  });

  console.log(data);

  // if (isError || (data?.status !== 200 && !isPending)) {
  //   return <ErrNoData />;
  // }

  return (
    <>
      <Info
        onOpen={onOpen}
        isPending={isPending}
        data={{
          titleContactInfoBtn: "تماس با ما",
          name: `املاک ${data?.data.name}`,
          profileIcon: data?.data.image_full_path,
          bgUserImg: data?.data.bg_image_full_path,
          score: data?.data.score,
          description: data?.data.description,
          address: `${data?.data.city}، ${data?.data.main_street}، ${data?.data.sub_street}`,
          blueTick: data?.data.blue_tick,
        }}
      />
      <ModalREA
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        data={{
          profileIcon: data?.data.bg_image_full_path,
          name: data?.data.name,
          number: {
            phoneNumber: data?.data.number,
            landlineNumber: data?.data.landline_number,
          },
          socialNetwork: {
            //TODO Add SocialNetwork
          },
        }}
      />
      <Consultants userName={params.userName} />
      <Ads />
      <Comments />
    </>
  );
}
