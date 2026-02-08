"use client";
import AdsCard from "../../AdsCard";
import { Title } from "@/components/ui/Title";
import { AdsDataType, FilterDataType } from "@/types";
import PaginationComponent from "../../Pagination";
import { RefetchOptions } from "@tanstack/react-query";
import AdsPageHeaderSkeleton from "../../ui/skeletons/AdsPageHeaderSkeleton";
import FilterManager from "../../ads-filter/FilterManager";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import useUpdateSearchParams from "@/hooks/queries/useUpdateSearchParams";
import EmptyState from "@/components/ui/EmptyState";

interface AgencyAdsListProps {
  title: string;
  data: AdsDataType[] | undefined;
  totalPages: number | undefined;
  refetch: (options?: RefetchOptions) => Promise<any>;
  isLoading: boolean;
  paginationParamKey?: string;
}

export default function AgencyAdsList({
  title,
  data,
  totalPages,
  refetch,
  isLoading,
  paginationParamKey,
}: AgencyAdsListProps) {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const hasData = !!data && data.length > 0;

  const methods = useForm<FilterDataType>({
    defaultValues: Object.fromEntries(searchParams.entries()) as any,
  });

  const onSubmit = (formData: FilterDataType) => {
    updateSearchParams(formData);
  };

  const isInitialLoading = isLoading && !data;

  if (isLoading) {
    return (
      <div className="mt-10 flex flex-col p-4 md:mt-14 md:p-8">
        <AdsPageHeaderSkeleton />
        <AdsCard data={undefined} isloading={true} onActionSuccess={() => {}} />
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-col p-4 md:mt-14 md:p-8">
      <Title title={title} />

      {!hasData && (
        <EmptyState
          title="آگهی یافت نشد"
          message={`در حال حاضر هیچ آگهی فعالی برای "${title}" در این بخش وجود ندارد.`}
          showReset
        />
      )}

      {hasData && (
        <>
          <div className="w-full mt-5">
            <FilterManager
              isViewMore={true}
              isLoading={isInitialLoading}
              formMethods={{ ...methods, onSubmit }}
            />
          </div>

          <div className="mt-6">
            <AdsCard
              data={data}
              isloading={isLoading}
              onActionSuccess={() => refetch()}
            />
          </div>

          {totalPages && totalPages > 1 && (
            <PaginationComponent
              totalPages={totalPages}
              paramKey={paginationParamKey}
            />
          )}
        </>
      )}
    </div>
  );
}
