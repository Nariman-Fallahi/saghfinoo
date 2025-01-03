"use client";
import { Api, baseURL } from "@/ApiService";
import { useGetRequest } from "@/ApiService";
import { useParams } from "next/navigation";
import { AdsDataType, AdsFilterDataType, RealtorDataType } from "@/types/Type";
import { useDisclosure } from "@nextui-org/modal";
import ModalREA from "@/components/RealEstates-Realators/modal/ModalREA";
import { CommentType } from "@/types/Type";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

// Components
import Info from "@/components/RealEstates-Realators/Info";
import Ads from "@/components/RealEstates-Realators/Ads";
import Comments from "@/components/RealEstates-Realators/Comments";

export default function RealatorProfile() {
  const params = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [adsUrl, setAdsUrl] = useState<string>("");
  const [commentPageNumber, setCommentpageNumber] = useState(1);
  const [adsfilterData, setAdsFilterData] = useState<AdsFilterDataType>();
  const [adsPageNumber, setAdsPageNumber] = useState<number>(1);
  const access = getCookie("access");

  const { data: realtorData, isPending: realtorPending } = useGetRequest<{
    data: RealtorDataType;
    status: number;
  }>({
    url: `${Api.realtors}/${params.id}`,
    key: ["getRealtor", params.id.toString()],
    enabled: true,
    staleTime: 5 * 60 * 1000,
  });

  const { data: realtorCommentsData, status: realtorCommentsStatus } =
    useGetRequest<{ data: CommentType[] }>({
      url: `${Api.realtors}/${params.id}/comments?page=${commentPageNumber}`,
      key: ["getRealtorComments", commentPageNumber.toString()],
      enabled: true,
      staleTime: 10 * 60 * 1000,
    });

  useEffect(() => {
    const adsUrl = new URL(Api.Ad, baseURL);

    adsUrl.searchParams.append("page", adsPageNumber.toString());
    adsUrl.searchParams.append("owner", params.id.toString());

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
  }, [adsPageNumber, adsfilterData, params.id]);

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
      "getRealatorAds",
      JSON.stringify(adsfilterData),
      adsPageNumber.toString(),
    ],
    enabled: true,
    staleTime: 10 * 60 * 1000,
    headers: {
      Authorization: `Bearer ${access}`,
    },
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
        adsfilterData={adsfilterData}
        setAdsFilterData={setAdsFilterData}
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
        pageNumber={commentPageNumber}
        setPageNumber={setCommentpageNumber}
      />
    </>
  );
}
