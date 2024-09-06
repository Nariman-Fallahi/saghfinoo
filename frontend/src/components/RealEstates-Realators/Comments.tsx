"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Title } from "@/constant/Constants";
import S_Comments from "@/skeleton/S_Comments";
import { CommentType } from "@/types/Type";
import { numberToPersian } from "@/constant/Constants";
import {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  MutableRefObject,
} from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

type CommentsType = {
  data: CommentType[] | undefined;
  status: "error" | "success" | "pending";
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
};

export default function Comments({
  data,
  status,
  pageNumber,
  setPageNumber,
}: CommentsType) {
  const swiperRef: MutableRefObject<any> = useRef(null);
  const [completeData, setCompleteData] = useState<CommentType[]>([]);
  const [isSkeleton, setIsSkeleton] = useState(true);

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;

      swiperInstance.on("reachEnd", () => {
        setPageNumber((prevState) => prevState + 1);
        setIsSkeleton(false);
      });

      return () => {
        swiperInstance.off("reachEnd");
      };
    }
  }, [setPageNumber]);

  useEffect(() => {
    if (pageNumber > 1 && data && data?.length < 1) {
      setPageNumber((prevState) => prevState - 1);
    }
  }, [data, pageNumber, setPageNumber]);

  useEffect(() => {
    if (status === "success" && data) {
      setCompleteData((prevData) => {
        const newData = data.filter(
          (item) => !prevData.some((prevItem) => prevItem.id === item.id)
        );
        return [...prevData, ...newData];
      });
    }
  }, [data, status]);

  return (
    <div className="w-full flex flex-col mt-8 p-4 md:mt-14 md:p-8">
      <Title title="نظرات کاربران " />

      {status === "success" && completeData && completeData.length <= 1 && (
        <div className="flex flex-col items-center mt-5 w-full">
          <Image
            width={130}
            height={130}
            className="md:w-52 md:h-52 lg:w-56 lg:h-56"
            src="/icons/NoDataPage.svg"
            alt="NO Data"
          />
          <p className="text-sm md:text-base lg:text-lg">
            متاسفانه نظری برای نمایش یافت نشد ):
          </p>
        </div>
      )}

      {completeData && completeData.length >= 1 && (
        <div className="mt-4 md:mt-8">
          <Swiper
            ref={swiperRef}
            navigation={true}
            modules={[Navigation]}
            slidesPerView={"auto"}
            spaceBetween={20}
            loop={false}
            freeMode={true}
            centeredSlides={false}
            initialSlide={0}
            className="w-full"
          >
            {status === "pending" && isSkeleton ? (
              <div className="flex justify-between">
                <S_Comments />
              </div>
            ) : (
              <>
                {completeData?.map((item) => {
                  return (
                    <SwiperSlide className="mb-1 !w-fit" key={item.id}>
                      <div
                        className="!w-[242px] h-[125px] md:h-[250px] p-2 flex flex-col shadow relative
                       rounded-2xl border border-[#EDEDED] pb-3 md:items-center md:p-5"
                      >
                        <div className="flex md:flex-col md:items-center">
                          <Image
                            width={38}
                            height={38}
                            className="rounded-full md:w-[60px] md:h-[60px]"
                            sizes="(min-width: 768px) 60px, 60px"
                            src={
                              item.owner__image_full_path ||
                              "/icons/profile-circle.svg"
                            }
                            alt="Profile Image"
                          />
                          <div className="flex flex-col mr-3 md:mr-0 md:items-center">
                            <p className="text-xs md:text-sm md:mt-3 line-clamp-1">
                              {`${item.owner__first_name} ${item.owner__last_name}`}
                            </p>
                            <p
                              className="w-max text-xs mt-2 pb-[2px] border-b border-red-500 md:text-sm md:mt-3
                           md:w-fit"
                            >
                              {`${numberToPersian(item.score)} از ۵`}
                            </p>
                          </div>
                        </div>
                        <p
                          style={{ overflowWrap: "break-word" }}
                          className="mt-2 text-xs md:text-sm line-clamp-3 md:text-center justify-between"
                        >
                          {item.description}
                        </p>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </>
            )}
          </Swiper>
        </div>
      )}
    </div>
  );
}
