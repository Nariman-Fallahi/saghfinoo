"use client";
import { Api } from "@/ApiService";
import { useGetRequest } from "@/ApiService";
import { useParams } from "next/navigation";
import { realtorDataType } from "@/types/Type";
import { useDisclosure } from "@nextui-org/modal";
import ModalREA from "@/components/realEstates-realators/modal/ModalREA";

// Components
import Info from "@/components/realEstates-realators/Info";

export default function RealatorProfile() {
  const params = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data, isPending } = useGetRequest<{
    data: realtorDataType;
    status: number;
  }>({
    url: `${Api.GetRealtor}${params.id}`,
    key: ["getRealtor", JSON.stringify(params.id)],
    enabled: true,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      <Info
        onOpen={onOpen}
        isPending={isPending}
        data={{
          titleContactInfoBtn: "تماس با مشاور",
          name: `${data?.data.user__first_name} ${data?.data.user__last_name}`,
          userImg: data?.data.user__image_full_path,
          bgUserImg: data?.data.bg_image_full_path,
          description: data?.data.description,
          realEstateOfficeName: `مشاور املاک ${data?.data.real_estate_office__name}`,
          score: data?.data.score,
        }}
      />
      <ModalREA
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        contactInfoData={{
          name: `${data?.data.user__first_name} ${data?.data.user__last_name}`,
          profileIcon: data?.data.user__image_full_path,
          number: {
            phoneNumber: data?.data.number,
            landlineNumber: data?.data.landline_number,
          },
        }}
        shareData={{
          socialNetwork: {
            //TODO اضافه کردن بقیه مقادیر
          },
        }}
      />
    </>
  );
}
