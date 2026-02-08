"use client";
import Image from "next/image";
import { Title } from "@/components/ui/Title";
import { CommentType } from "@/types";
import { numberToPersian } from "@/utils/numberToPersian";
import CustomEmblaSlider from "../../CustomEmblaSlider";
import EmptyState from "@/components/ui/EmptyState";

type CommentsType = {
  data: CommentType[] | undefined;
  status: "error" | "success" | "pending";
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
};

export default function Comments({
  data,
  status,
  fetchNextPage,
  hasNextPage,
}: CommentsType) {
  const isInitialLoading = status === "pending" && (!data || data.length === 0);

  const noData = status === "success" && (!data || data.length === 0);

  return (
    <div className="w-full flex flex-col mt-8 p-4 md:mt-14 md:p-8">
      <Title title="نظرات کاربران" />

      {noData && (
        <EmptyState
          title="نظری ثبت نشده است"
          message="هنوز هیچ نظری برای این آگهی ثبت نشده. شما می‌توانید اولین نفر باشید که تجربه خود را به اشتراک می‌گذارد."
        />
      )}

      {(isInitialLoading || (data && data.length >= 1)) && (
        <div className="mt-4 md:mt-8">
          <CustomEmblaSlider
            isPending={status === "pending"}
            dataLength={data?.length || 0}
            onReachEnd={() => hasNextPage && fetchNextPage?.()}
          >
            {data?.map((item) => (
              <div
                key={item.id}
                className="flex-none w-[242px] md:w-[280px] pl-5 mb-1"
              >
                <div
                  className="h-[125px] md:h-[250px] p-2 flex flex-col shadow-sm 
                               rounded-2xl border border-[#EDEDED] pb-3 md:items-center md:p-5 bg-white"
                >
                  <div className="flex md:flex-col md:items-center">
                    <Image
                      width={60}
                      height={60}
                      className="rounded-full w-10 h-10 md:w-[60px] md:h-[60px] object-cover"
                      src={
                        item.owner__image_full_path ||
                        "/icons/profile-circle.svg"
                      }
                      alt="Profile"
                    />
                    <div className="flex flex-col mr-3 md:mr-0 md:items-center">
                      <p className="text-xs md:text-sm md:mt-3 font-bold line-clamp-1 text-gray-800">
                        {`${item.owner__first_name} ${item.owner__last_name}`}
                      </p>
                      <p className="w-max text-[10px] mt-2 pb-[2px] border-b border-red-500 md:text-xs md:mt-2 text-red-500">
                        {`${numberToPersian(item.score)} از ۵`}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs md:text-sm line-clamp-3 md:line-clamp-4 md:text-center text-gray-600 leading-6">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </CustomEmblaSlider>
        </div>
      )}
    </div>
  );
}
