"use client";
import { useDisclosure } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGetRequest } from "@/ApiService";
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
  const [adsfilterData, setAdsFilterData] = useState<AdsFilterDataType>();
  const [adsPageNumber, setAdsPageNumber] = useState<number>(1);
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
    const adsUrl = new URL(Api.Ad, process.env.NEXT_PUBLIC_API_BASE_URL);

    adsUrl.searchParams.append("page", adsPageNumber.toString());
    adsUrl.searchParams.append("reo_username", params.userName.toString());

    if (adsfilterData?.province?.value) {
      adsUrl.searchParams.append("province", adsfilterData.province.value);
    }

    if (adsfilterData?.city) {
      adsUrl.searchParams.append("city", adsfilterData.city);
    }

    if (adsfilterData?.metre?.min && adsfilterData.metre.max) {
      adsUrl.searchParams.append(
        "area_from",
        adsfilterData.metre.min.toString()
      );
      adsUrl.searchParams.append("area_to", adsfilterData.metre.max.toString());
    }

    if (adsfilterData?.depositPrice?.min && adsfilterData?.depositPrice?.max) {
      adsUrl.searchParams.append(
        "deposit_from",
        adsfilterData.depositPrice.min.toString()
      );
      adsUrl.searchParams.append(
        "deposit_to",
        adsfilterData.depositPrice.max.toString()
      );
    }

    if (adsfilterData?.rentalPrice?.min && adsfilterData?.rentalPrice?.max) {
      adsUrl.searchParams.append(
        "rent_from",
        adsfilterData.rentalPrice.min.toString()
      );
      adsUrl.searchParams.append(
        "rent_to",
        adsfilterData.rentalPrice.max.toString()
      );
    }

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
      "getRealEstateAds",
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
    key: ["getRealEstateComments", params.userName.toString()],
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
        pageNumber={adsPageNumber}
        setPageNumber={setAdsPageNumber}
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
