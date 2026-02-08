"use client";
import { Title } from "@/components/ui/Title";
import { useGetRequest } from "@/hooks/useRequest";
import { QueryKeys } from "@/services/apiService";
import { SuggestedSearchesDataType } from "@/types";
import Link from "next/link";

interface SuggestedSearchesProps {
  fetchUrl: string;
}

export default function SuggestedSearches({
  fetchUrl,
}: SuggestedSearchesProps) {
  const { data } = useGetRequest<{ data: SuggestedSearchesDataType[] }>({
    key: [QueryKeys.GET_SELECTION_DATA],
    url: fetchUrl,
  });

  return (
    <div className="mt-7 p-3 flex flex-col lg:mt-10">
      <Title title="جستجو های پیشنهادی" />

      <div
        className="mt-6 flex-wrap flex w-full text-xs text-[#505050]
       md:text-xl lg:text-2xl md:gap-5 lg:gap-7"
      >
        {data?.data.map((item) => {
          return (
            <Link
              className="w-1/2 md:w-fit truncate cursor-pointer"
              key={item.id}
              href={"/"}
            >
              املاک در {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
