"use client";
import { useDisclosure } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { baseURL, dataKey, useGetRequest } from "@/ApiService";
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

export default function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const params = useParams();
  const [commentPageNumber, setCommentPageNumber] = useState<number>(1);
  const [adsUrl, setAdsUrl] = useState<string>("");
  const [adsfilterData, setAdsFilterData] = useState<AdsFilterDataType>(); //TODO Delete
  const [adsPageNumber, setAdsPageNumber] = useState<number>(1); //TODO Delete
  const access = getCookie("access");

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

  useEffect(() => {
    const adsUrl = new URL(Api.Ad, baseURL);

    adsUrl.searchParams.append("page", adsPageNumber.toString());
    adsUrl.searchParams.append("reo_username", params.userName.toString());

    const filters = {
      province: adsfilterData?.province?.value,
      city: adsfilterData?.city,
      area_from: adsfilterData?.metre?.min,
      area_to: adsfilterData?.metre?.max,
      deposit_from: adsfilterData?.depositPrice?.min,
      deposit_to: adsfilterData?.depositPrice?.max,
      rent_from: adsfilterData?.rentalPrice?.min,
      rent_to: adsfilterData?.rentalPrice?.max,
    };

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        adsUrl.searchParams.append(key, value.toString());
      }
    });

    setAdsUrl(adsUrl.toString());
  }, [adsPageNumber, params.userName, adsfilterData]);

  const {
    data: adsData,
    status: adsStatus,
    refetch: adsRefetch,
    isFetching: adsFetching,
  } = useGetRequest<{
    data: AdsDataType[];
    totalPages: number;
  }>({
    url: adsUrl,
    key: [
      dataKey.GET_REAL_ESTATE_ADS,
      JSON.stringify(adsfilterData),
      adsPageNumber.toString(),
    ],
    enabled: true,
    staleTime: 10 * 60 * 1000,
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  const { data: commentData, status: commentStatus } = useGetRequest<{
    data: CommentType[];
  }>({
    url: `${Api.Reos}/${params.userName}/comments?page=${commentPageNumber}`,
    key: [dataKey.GET_REAL_ESTATE_COMMENTS, params.userName.toString()],
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
      <Consultants userName={params.userName} />
      <Ads
        data={adsData?.data}
        status={adsStatus}
        title={`آگهی های املاک ${realEstateData?.data.name}`}
        totalPages={adsData?.totalPages}
        adsfilterData={adsfilterData}
        setAdsFilterData={setAdsFilterData}
        refetch={adsRefetch}
        isFetching={adsFetching}
      />
      <Comments
        pageNumber={commentPageNumber}
        setPageNumber={setCommentPageNumber}
        data={commentData?.data}
        status={commentStatus}
      />
    </>
  );
}
