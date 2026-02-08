"use client";
import { useDisclosure } from "@heroui/modal";
import { useParams, useSearchParams } from "next/navigation";
import { QueryKeys, Api } from "@/services/apiService";
import {
  AdsDataType,
  AgencyActionType,
  CommentType,
  realEstateOfficesType,
} from "@/types";
import FetchError from "@/components/FetchError";

// Components
import Consultants from "@/components/Consultants";
import AgencyAdsList from "@/components/shared/agency/AgencyAdsList";
import Comments from "@/components/shared/agency/Comments";
import { useGetRequest, useInfiniteRequest } from "@/hooks/useRequest";
import AgencyActionsModal from "@/components/shared/agency/modals/AgencyActionsModal";
import { useState } from "react";
import Info from "@/components/shared/agency/info";
import { useAds } from "@/hooks/queries/useAds";

export default function RealEstateProfilePage() {
  const {
    isOpen: isAgencyModalOpen,
    onOpen: openAgencyModal,
    onOpenChange: toggleAgencyModal,
  } = useDisclosure();
  const [agencyAction, setAgencyAction] = useState<AgencyActionType>(null);
  const params = useParams();
  const searchParams = useSearchParams();
  const userName = params.userName.toString();

  const realEstateAdsPageNumber =
    searchParams.get("realEstateAdsPageNumber") || "1";

  const {
    data: realEstateData,
    isLoading: realEstateIsLoading,
    isError,
  } = useGetRequest<{ data: realEstateOfficesType }>({
    url: `${Api.Reos}/${userName}`,
    key: ["getRealEstateOffices", userName],
  });

  const adsURL = `${Api.Ad}/?page=${realEstateAdsPageNumber}&reo_username=${userName}`;

  const {
    data: adsData,
    isLoading: adsIsLoading,
    refetch: adsRefetch,
  } = useAds({
    adsURL,
    keys: [QueryKeys.GET_REAL_ESTATE_ADS, userName, realEstateAdsPageNumber],
  });

  const {
    data: commentPages,
    status: commentStatus,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteRequest<CommentType>(`${Api.Reos}/${userName}/comments`, [
    QueryKeys.GET_REAL_ESTATE_COMMENTS,
    userName,
  ]);

  const allComments = commentPages?.pages.flatMap((page) => page.data) || [];

  if (isError) return <FetchError />;

  const reo = realEstateData?.data;

  const agencyProfileData = {
    titleContactInfoBtn: "تماس با ما",
    name: reo?.name ? `املاک ${reo.name}` : "",
    profileIcon: reo?.imageFullPath,
    bgUserImg: reo?.bgImageFullPath,
    score: reo?.score,
    description: reo?.description,
    address: reo ? `${reo.city}، ${reo.mainStreet}، ${reo.subStreet}` : "",
    blueTick: reo?.blueTick,
  };

  const agencyData = {
    profileIcon: reo?.bgImageFullPath,
    name: reo?.name,
    number: {
      phoneNumber: reo?.number,
      landlineNumber: reo?.landlineNumber,
    },
    socialNetwork: {
      whatsapp: reo?.whatsapp,
      email: reo?.email,
      facebook: reo?.facebook,
      telegram: reo?.telegram,
      twitter: reo?.twitter,
    },
  };

  return (
    <>
      <Info
        onOpen={openAgencyModal}
        isLoading={realEstateIsLoading}
        data={agencyProfileData}
        setAgencyAction={setAgencyAction}
      />

      <AgencyActionsModal
        isOpen={isAgencyModalOpen}
        onOpenChange={toggleAgencyModal}
        agencyAction={agencyAction}
        data={agencyData}
        page="realEstate"
      />

      <Consultants userName={userName} />

      <AgencyAdsList
        data={adsData?.data}
        title={`آگهی های املاک ${reo?.name || ""}`}
        totalPages={adsData?.totalPages}
        isLoading={adsIsLoading}
        refetch={adsRefetch}
        paginationParamKey="realEstateAdsPageNumber"
      />

      <Comments
        data={allComments}
        status={isFetchingNextPage ? "pending" : commentStatus}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
