"use client";
import { useDisclosure } from "@heroui/modal";
import { useParams, useSearchParams } from "next/navigation";
import { dataKey, useGetRequest } from "@/ApiService";
import { Api } from "@/ApiService";
import {
  AdsDataType,
  AdsFilterDataType,
  CommentType,
  realEstateOfficesType,
} from "@/types/Type";
import ErrNoData from "@/components/ErrNoData";
import { getCookie } from "cookies-next";

// Components
import Info from "@/components/RealEstates-Realators/Info";
import ModalREA from "@/components/RealEstates-Realators/modal/ModalREA";
import Consultants from "@/components/Consultants";
import Ads from "@/components/RealEstates-Realators/Ads";
import Comments from "@/components/RealEstates-Realators/Comments";
import { useQueryURL } from "@/hooks/useQueryURL";

export default function RealEstateProfilePage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const params = useParams();
  const access = getCookie("access");
  const searchParams = useSearchParams();
  const swiperPageNumber = searchParams.get("swiperPageNumber") || "1";

  const {
    data: realEstateData,
    isPending,
    isError,
  } = useGetRequest<{ data: realEstateOfficesType }>({
    url: `${Api.Reos}/${params.userName}`,
    key: ["getRealEstateOffices", params.userName.toString()],
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });

  const adsURL = useQueryURL(`${Api.Ad}/`, {
    reo_username: params.userName.toString(),
  });

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
    key: [dataKey.GET_REAL_ESTATE_ADS, adsURL],
    enabled: true,
    staleTime: 10 * 60 * 1000,
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  const { data: commentData, status: commentStatus } = useGetRequest<{
    data: CommentType[];
  }>({
    url: `${Api.Reos}/${params.userName}/comments?page=${swiperPageNumber}`,
    key: [
      dataKey.GET_REAL_ESTATE_COMMENTS,
      params.userName.toString(),
      swiperPageNumber,
    ],
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });

  if (isError) {
    return <ErrNoData />;
  }

  return (
    <>
      <Info
        onOpen={onOpen}
        isPending={isPending}
        data={{
          titleContactInfoBtn: "تماس با ما",
          name: `املاک ${realEstateData?.data.name}`,
          profileIcon: realEstateData?.data.imageFullPath,
          bgUserImg: realEstateData?.data.bgImageFullPath,
          score: realEstateData?.data.score,
          description: realEstateData?.data.description,
          address: `${realEstateData?.data.city}، ${realEstateData?.data.mainStreet}، ${realEstateData?.data.subStreet}`,
          blueTick: realEstateData?.data.blueTick,
        }}
      />
      <ModalREA
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        page="realEstate"
        data={{
          profileIcon: realEstateData?.data.bgImageFullPath,
          name: realEstateData?.data.name,
          number: {
            phoneNumber: realEstateData?.data.number,
            landlineNumber: realEstateData?.data.landlineNumber,
          },
          socialNetwork: {
            whatsapp: realEstateData?.data.whatsapp,
            email: realEstateData?.data.email,
            facebook: realEstateData?.data.facebook,
            telegram: realEstateData?.data.facebook,
            twitter: realEstateData?.data.twitter,
          },
        }}
      />
      <Consultants userName={params.userName.toString()} />
      <Ads
        data={adsData?.data}
        status={adsStatus}
        title={`آگهی های املاک ${realEstateData?.data.name}`}
        totalPages={adsData?.totalPages}
        refetch={adsRefetch}
        isFetching={adsFetching}
      />
      <Comments data={commentData?.data} status={commentStatus} />
    </>
  );
}
