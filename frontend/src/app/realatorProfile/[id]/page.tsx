"use client";
import { Api } from "@/ApiService";
import { useGetRequest } from "@/ApiService";
import { useParams } from "next/navigation";
import { realtorDataType } from "@/types/Type";
import { useDisclosure } from "@nextui-org/modal";
import ModalREA from "@/components/RealEstates-Realators/modal/ModalREA";
import { CommentType } from "@/types/Type";
import { useState } from "react";

// Components
import Info from "@/components/RealEstates-Realators/Info";
import Ads from "@/components/RealEstates-Realators/Ads";
import Comments from "@/components/RealEstates-Realators/Comments";

export default function RealatorProfile() {
  const params = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  //realtor Comments Page Number
  const [rCpageNumber, setRCpageNumber] = useState(1);

  const { data: realtorData, isPending: realtorPending } = useGetRequest<{
    data: realtorDataType;
    status: number;
  }>({
    url: `${Api.GetRealtor}${params.id}`,
    key: ["getRealtor", JSON.stringify(params.id)],
    enabled: true,
    staleTime: 5 * 60 * 1000,
  });

  const { data: realtorCommentsData, status: realtorCommentsStatus } =
    useGetRequest<{ data: CommentType[] }>({
      url: `${Api.GetRealtorComments}${params.id}?page=${rCpageNumber}`,
      key: ["getRealtorComments", JSON.stringify(rCpageNumber)],
      enabled: true,
      staleTime: 10 * 60 * 1000,
    });

  return (
    <>
      <Info
        onOpen={onOpen}
        isPending={realtorPending}
        data={{
          titleContactInfoBtn: "تماس با مشاور",
          name: `${realtorData?.data.user__first_name} ${realtorData?.data.user__last_name}`,
          profileIcon: realtorData?.data.user__image_full_path,
          bgUserImg: realtorData?.data.bg_image_full_path,
          description: realtorData?.data.description,
          realEstateOfficeName: `مشاور املاک ${realtorData?.data.real_estate_office__name}`,
          score: realtorData?.data.score,
        }}
        isScore={true}
      />
      <ModalREA
        id={params.id}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        page="realator"
        data={{
          profileIcon: realtorData?.data.user__image_full_path,
          name: `${realtorData?.data.user__first_name} ${realtorData?.data.user__last_name}`,
          number: {
            phoneNumber: realtorData?.data.number,
            landlineNumber: realtorData?.data.landline_number,
          },
          socialNetwork: {
            //TODO Add SocialNetwork
          },
        }}
      />
      <Ads />
      <Comments
        data={realtorCommentsData?.data}
        status={realtorCommentsStatus}
        pageNumber={rCpageNumber}
        setPageNumber={setRCpageNumber}
      />
    </>
  );
}
