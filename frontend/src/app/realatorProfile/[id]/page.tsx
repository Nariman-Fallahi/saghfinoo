"use client";
import { Api, baseURL, dataKey } from "@/ApiService";
import { useGetRequest } from "@/ApiService";
import { useParams } from "next/navigation";
import { AdsDataType, AdsFilterDataType, RealtorDataType } from "@/types/Type";
import { useDisclosure } from "@nextui-org/modal";
import ModalREA from "@/components/RealEstates-Realators/modal/ModalREA";
import { CommentType } from "@/types/Type";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";

// Components
import Info from "@/components/RealEstates-Realators/Info";
import Ads from "@/components/RealEstates-Realators/Ads";
import Comments from "@/components/RealEstates-Realators/Comments";
import { useQueryURL } from "@/hooks/useQueryURL";

export default function RealatorProfile() {
  const params = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const searchParams = useSearchParams();
  const swiperPageNumber = searchParams.get("swiperPageNumber") || "1";

  const { data: realtorData, isPending: realtorPending } = useGetRequest<{
    data: RealtorDataType;
    status: number;
  }>({
    url: `${Api.realtors}/${params.id}`,
    key: [dataKey.GET_REALTOR, params.id.toString()],
    enabled: true,
    staleTime: 5 * 60 * 1000,
  });

  const { data: realtorCommentsData, status: realtorCommentsStatus } =
    useGetRequest<{ data: CommentType[] }>({
      url: `${Api.realtors}/${params.id}/comments?page=${swiperPageNumber}`,
      key: [dataKey.GET_REALTOR_COMMENTS, swiperPageNumber],
      enabled: true,
      staleTime: 10 * 60 * 1000,
    });

  const adsURL = useQueryURL(Api.Ad, { owner: params.id.toString() });

  const {
    data: adsData,
    status: adsStatus,
    refetch: adsRefetch,
    isFetching: adsFetching,
  } = useGetRequest<{
    data: AdsDataType[];
    totalPages: number;
  }>({
    url: adsURL,
    key: [dataKey.GET_REALATOR_ADS, adsURL],
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
          name: `${realtorData?.data.user.firstName} ${realtorData?.data.user.lastName}`,
          profileIcon: realtorData?.data.user.imageFullPath,
          bgUserImg: realtorData?.data.bgImageFullPath,
          description: realtorData?.data.description,
          realEstateOfficeName: `مشاور املاک ${realtorData?.data.realEstateOffice.name}`,
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
          profileIcon: realtorData?.data.user.imageFullPath,
          name: `${realtorData?.data.user.firstName} ${realtorData?.data.user.lastName}`,
          number: {
            phoneNumber: realtorData?.data.number,
            landlineNumber: realtorData?.data.landlineNumber,
          },
          socialNetwork: {
            email: realtorData?.data.email,
            facebook: realtorData?.data.facebook,
            telegram: realtorData?.data.telegram,
            twitter: realtorData?.data.twitter,
            whatsapp: realtorData?.data.whatsapp,
          },
        }}
      />
      <Ads
        data={adsData?.data}
        status={adsStatus}
        title={`آگهی های مشاور ${realtorData?.data.user.firstName} ${realtorData?.data.user.lastName}`}
        totalPages={adsData?.totalPages}
        refetch={adsRefetch}
        isFetching={adsFetching}
      />
      <Comments
        data={realtorCommentsData?.data}
        status={realtorCommentsStatus}
      />
    </>
  );
}
