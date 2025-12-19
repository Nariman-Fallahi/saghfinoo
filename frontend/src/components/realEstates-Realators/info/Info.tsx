import { Button } from "@heroui/button";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useActiveModalName } from "@/store/ReaModalActive";
import { isMobile } from "@/utils/isMobile";
import { getCookie } from "cookies-next";
import { ErrorNotification } from "@/notification/Error";
import MoreActions from "./MoreActions";
import { LOGIN_ERROR_TEXT } from "@/constant/textConstants";

type InfoType = {
  onOpen: () => void;
  isPending: boolean;
  data: {
    titleContactInfoBtn: string;
    name: string;
    profileIcon?: string;
    bgUserImg?: string;
    score?: number;
    description?: string;
    address?: string;
    realEstateOfficeName?: string;
    blueTick?: boolean;
  };
  isScore?: boolean;
};

export default function Info({ onOpen, isPending, data, isScore }: InfoType) {
  const { setActiveModalName } = useActiveModalName();
  const access = getCookie("access");

  const handleAction = (name: "ContactInfo" | "Share" | "Score" | "Report") => {
    if (["Score", "Report"].includes(name) && !access) {
      ErrorNotification(LOGIN_ERROR_TEXT);
      return;
    }

    onOpen();
    setActiveModalName(name);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-44 mt-[60px] md:h-[280px] md:mt-0">
        {isPending ? (
          <div className="-mt-1 size-full">
            <Skeleton className="size-full" />
          </div>
        ) : (
          <Image
            className="size-full"
            width={1000}
            height={500}
            quality={100}
            src={data?.bgUserImg || "/icons/Banner.png"}
            alt=""
          />
        )}
      </div>

      {isPending ? (
        <div className="-mt-12 md:-mt-[100px]">
          <Skeleton
            circle
            className="!w-[96px] !h-[96px] md:!w-[200px] md:!h-[200px] mr-4 md:mr-8"
          />
        </div>
      ) : (
        <div
          className="w-[96px] h-[96px] rounded-full -mt-12 relative mr-4
           bg-[#F9F9F9] flex justify-center items-center md:w-[200px] md:h-[200px]
           md:-mt-[100px] md:mr-8"
        >
          <Image
            src={data.profileIcon || "/icons/noneImage.svg"}
            alt=""
            width={60}
            height={60}
            quality={100}
            sizes="(min-width: 768px) 130px, 130px"
            className="md:w-[130px] md:h-[130px]"
          />
        </div>
      )}

      <div className="w-full flex justify-between items-center">
        <div className="w-full p-4 flex flex-col md:p-8">
          <div className="w-full flex justify-between mt-4 items-center">
            <div className="flex items-center">
              <h3 className="font-bold text-sm md:text-[40px]">
                {isPending ? (
                  <Skeleton width={80} className="md:!w-[120px]" />
                ) : (
                  data.name
                )}
              </h3>

              {data.blueTick && (
                <Image
                  width={15}
                  height={15}
                  className="mr-2 md:w-5 md:h-5"
                  src="/icons/blueTick.svg"
                  alt="Account confirmation check"
                />
              )}
            </div>

            <MoreActions
              isPending={isPending}
              handleRegisterScoreBtn={() => handleAction("Score")}
              handleShareBtn={() => handleAction("Share")}
              handleViolationReport={() => handleAction("Report")}
            />

            <div className="items-center hidden md:flex">
              {isPending ? (
                <Skeleton
                  circle
                  width={26}
                  height={26}
                  count={2}
                  inline
                  className="ml-2"
                />
              ) : (
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  radius="full"
                  className="mr-2"
                  onPress={() => handleAction("Share")}
                >
                  <Image
                    width={24}
                    height={24}
                    src="/icons/export.svg"
                    alt=""
                  />
                </Button>
              )}
            </div>
          </div>

          <p className="text-xs mt-2 text-[#505050] md:text-lg md:mt-5">
            {isPending ? (
              <Skeleton width={100} className="md:!w-[150px]" />
            ) : (
              `میزان رضایت مندی کاربران: ${data.score} از 5`
            )}
          </p>

          <p className="font-bold text-xs mt-2 md:text-lg md:mt-5 lg:text-[32px]">
            {isPending ? (
              <Skeleton width={140} className="md:!w-[210px]" />
            ) : (
              data.description
            )}
          </p>

          <div className="flex items-center mt-3 md:mt-6">
            {isPending ? (
              <Skeleton width={100} className="md:!w-[150px]" />
            ) : data.address || data.realEstateOfficeName ? (
              <>
                <Image
                  width={16}
                  height={16}
                  className="md:w-6 md:h-6 lg:w-7 lg:h-7"
                  src={
                    data.address
                      ? "/icons/location.svg"
                      : "/icons/user-square.svg"
                  }
                  alt={data.address ? "location icon" : "User icon"}
                />
                <span className="text-xs font-bold text-[#505050] mr-1 md:text-2xl">
                  {data.address ? data.address : data.realEstateOfficeName}
                </span>
              </>
            ) : null}
          </div>

          {isPending ? (
            <div className="mt-4 md:mt-7">
              <Skeleton
                width={110}
                height={15}
                className="md:!w-[160px] md:!h-[30px]"
              />
            </div>
          ) : (
            <Button
              className="border mt-4 w-3/12 md:mt-7 md:w-1/5 md:text-lg"
              variant="bordered"
              color="danger"
              radius="sm"
              size={isMobile ? "sm" : "md"}
              onPress={() => handleAction("ContactInfo")}
            >
              {data.titleContactInfoBtn}
            </Button>
          )}
        </div>

        <div
          className="p-5 hidden md:flex ml-7 flex-col rounded-xl shadow absolute
         left-0 bg-white items-center mt-14"
        >
          {isScore &&
            (isPending ? (
              <Skeleton count={2} width={220} />
            ) : (
              <div className="w-full flex flex-col items-center">
                <p className="">چه امتیازی به {data.name} میدی؟</p>

                <Button
                  onPress={() => handleAction("Score")}
                  radius="sm"
                  className="bg-primary text-white w-1/2 mt-2"
                >
                  ثبت امتیاز
                </Button>
              </div>
            ))}

          <p className="text-[#505050] mt-3">
            {isPending ? (
              <Skeleton width={100} className="md:!w-[200px] mt-3" />
            ) : (
              `میزان رضایت مندی کاربران: ${data.score} از 5`
            )}
          </p>
          {isPending ? (
            <Skeleton width={70} className="md:!w-[120px]" />
          ) : (
            <Button
              variant="light"
              radius="sm"
              className="mt-2"
              onPress={() => handleAction("Report")}
            >
              <Image width={24} height={24} src="/icons/warning-2.svg" alt="" />
              <span className="cursor-pointer">گزارش تخلف</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
