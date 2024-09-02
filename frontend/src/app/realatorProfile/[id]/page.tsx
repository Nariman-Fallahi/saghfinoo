"use client";
import { Api } from "@/ApiService";
import { useGetRequest } from "@/ApiService";
import { useParams } from "next/navigation";
import { AdsDataType, AdsFilterDataType, RealtorDataType } from "@/types/Type";
import { useDisclosure } from "@nextui-org/modal";
import ModalREA from "@/components/RealEstates-Realators/modal/ModalREA";
import { CommentType } from "@/types/Type";
import { useEffect, useState } from "react";

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
    const adsUrl = new URL(Api.Ad, process.env.NEXT_PUBLIC_API_BASE_URL);

    adsUrl.searchParams.append("page", adsPageNumber.toString());
    adsUrl.searchParams.append("owner", params.id.toString());

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
  }, [adsPageNumber, adsfilterData, params.id]);

  const { data: adsData, status: adsStatus } = useGetRequest<{
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
        pageNumber={adsPageNumber}
        setPageNumber={setAdsPageNumber}
        status={adsStatus}
        title={`آگهی های مشاور ${realtorData?.data.user.firstName} ${realtorData?.data.user.lastName}`}
        totalPages={adsData?.totalPages}
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
