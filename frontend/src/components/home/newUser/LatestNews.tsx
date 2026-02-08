"use client";
import Image from "next/image";
import { Title } from "@/components/ui/Title";
import { QueryKeys } from "@/services/apiService";
import CustomEmblaSlider from "@/components/CustomEmblaSlider";
import { useInfiniteRequest } from "@/hooks/useRequest";
import { NewsType } from "@/types";

interface LatestNewsProps {
  fetchUrl: string;
}

export default function LatestNews({ fetchUrl }: LatestNewsProps) {
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteRequest<NewsType>(fetchUrl, [QueryKeys.GET_NEWS]);

  const allNews =
    data?.pages.flatMap((page) =>
      page.data.flatMap((section) => section.posts),
    ) ?? [];

  return (
    <div className="flex flex-col pr-3">
      <Title title="آخرین اخبار املاک را از سقفینو دنبال کنید" />

      <div className="w-full mt-4 lg:mt-10">
        <CustomEmblaSlider
          dataLength={allNews.length}
          isPending={isLoading}
          onReachEnd={() => hasNextPage && fetchNextPage()}
        >
          {allNews.map((item) => (
            <div
              className="flex-none w-2/3 md:w-1/3 lg:w-1/4 flex flex-col border border-gray-200 rounded-xl"
              key={item.slug}
            >
              <div className="relative w-full h-32 lg:h-48">
                <Image
                  src={item.imageFullPath}
                  alt={item.title}
                  fill
                  className="object-cover rounded-t-xl"
                />
              </div>
              <div className="p-4">
                <p className="font-bold line-clamp-2 text-sm md:text-base">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </CustomEmblaSlider>
      </div>
    </div>
  );
}
