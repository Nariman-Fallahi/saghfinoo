"use client";
import { Api, QueryKeys } from "@/services/apiService";
import { notFound, useParams, useSearchParams } from "next/navigation";
import { RealtorDataType, CommentType, AgencyActionType } from "@/types";
import { useDisclosure } from "@heroui/modal";

// Components
import Comments from "@/components/shared/agency/Comments";
import { useGetRequest, useInfiniteRequest } from "@/hooks/useRequest";
import Info from "@/components/shared/agency/info";
import { useState } from "react";
import AgencyActionsModal from "@/components/shared/agency/modals/AgencyActionsModal";
import AgencyAdsList from "@/components/shared/agency/AgencyAdsList";
import { useAds } from "@/hooks/queries/useAds";
import FetchError from "@/components/FetchError";

export default function RealatorProfile() {
  const params = useParams();
  const realtorId = params?.id?.toString();

  if (!realtorId) notFound();

  const {
    isOpen: isAgencyModalOpen,
    onOpen: openAgencyModal,
    onOpenChange: toggleAgencyModal,
  } = useDisclosure();
  const searchParams = useSearchParams();
  const [agencyAction, setAgencyAction] = useState<AgencyActionType>(null);

  const realatorAdsPageNumber =
    searchParams.get("realatorAdsPageNumber") || "1";

  const {
    data: realtorData,
    isLoading: realtorIsLoading,
    isError: realtorIsError,
  } = useGetRequest<{
    data: RealtorDataType;
    status: number;
  }>({
    url: `${Api.Realtors}/${realtorId}`,
    key: [QueryKeys.GET_REALTORS, realtorId],
    staleTime: 5 * 60 * 1000,
  });

  const adsURL = `${Api.Ad}/?page=${realatorAdsPageNumber}&owner=${realtorId}`;

  const {
    data: adsData,
    isLoading: adsIsLoading,
    refetch: adsRefetch,
  } = useAds({
    adsURL,
    keys: [QueryKeys.GET_REALATOR_ADS, realtorId, realatorAdsPageNumber],
  });

  const {
    data: commentPages,
    status: commentStatus,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteRequest<CommentType>(`${Api.Realtors}/${realtorId}/comments`, [
    QueryKeys.GET_REALTOR_COMMENTS,
    realtorId,
  ]);

  const allComments = commentPages?.pages.flatMap((page) => page.data) || [];

  const realtor = realtorData?.data;

  if (realtorIsError || !realtor) return <FetchError />;

  const realtorProfileData = {
    titleContactInfoBtn: "تماس با مشاور",
    name: realtor
      ? `${realtor.user.firstName} ${realtor.user.lastName}`.trim()
      : "",
    profileIcon: realtor?.user.imageFullPath,
    bgUserImg: realtor?.bgImageFullPath,
    description: realtor?.description,
    realEstateOfficeName: realtor?.realEstateOffice?.name
      ? `مشاور املاک ${realtor.realEstateOffice.name}`
      : "",
    score: realtor?.score,
  };

  const realtorContactData = {
    profileIcon: realtor?.user.imageFullPath,
    name: realtor ? `${realtor.user.firstName} ${realtor.user.lastName}` : "",
    number: {
      phoneNumber: realtor?.number,
      landlineNumber: realtor?.landlineNumber,
    },
    socialNetwork: {
      email: realtor?.email,
      facebook: realtor?.facebook,
      telegram: realtor?.telegram,
      twitter: realtor?.twitter,
      whatsapp: realtor?.whatsapp,
    },
  };

  return (
    <>
      <Info
        onOpen={openAgencyModal}
        isLoading={realtorIsLoading}
        data={realtorProfileData}
        isScore={true}
        setAgencyAction={setAgencyAction}
      />

      <AgencyActionsModal
        isOpen={isAgencyModalOpen}
        onOpenChange={toggleAgencyModal}
        agencyAction={agencyAction}
        data={realtorContactData}
        page="realtor"
      />

      <AgencyAdsList
        data={adsData?.data}
        title={
          realtor
            ? `آگهی های مشاور ${realtor.user.firstName} ${realtor.user.lastName}`
            : "آگهی‌ها"
        }
        totalPages={adsData?.totalPages}
        isLoading={adsIsLoading}
        refetch={adsRefetch}
        paginationParamKey="realatorAdsPageNumber"
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
