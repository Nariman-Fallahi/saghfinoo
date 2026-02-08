"use client";
import { Button } from "@heroui/button";
import Image from "next/image";
import { isMobile } from "@/utils/isMobile";
import { hasCookie } from "cookies-next";
import { ErrorNotification } from "@/notification/Error";
import { LOGIN_ERROR_TEXT } from "@/constant/messages";
import InfoSkeleton from "@/components/ui/skeletons/InfoSkeleton";
import { Dispatch, SetStateAction } from "react";
import { AgencyActionType } from "@/types";
import MoreActions from "./MoreActions";

type InfoType = {
  onOpen: () => void;
  isLoading: boolean;
  setAgencyAction: Dispatch<SetStateAction<AgencyActionType>>;
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

export default function Info({
  onOpen,
  setAgencyAction,
  isLoading,
  data,
  isScore,
}: InfoType) {
   const isAuthenticated = hasCookie("accessToken");

  const handleAction = (name: AgencyActionType) => {
    if (!name) return;
    if (["Score", "Report"].includes(name) && !isAuthenticated) {
      ErrorNotification(LOGIN_ERROR_TEXT);
      return;
    }
    onOpen();
    setAgencyAction(name);
  };

  if (isLoading || !data) return <InfoSkeleton isScore={isScore} />;

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-44 mt-[60px] md:h-[280px] md:mt-0">
        <Image
          className="size-full object-cover"
          width={1000}
          height={500}
          quality={100}
          src={data?.bgUserImg || "/icons/Banner.png"}
          alt="Banner"
        />
      </div>

      <div
        className="size-24 rounded-full -mt-12 relative mr-4
           bg-[#F9F9F9] flex justify-center items-center md:w-[200px] md:h-[200px]
           md:-mt-[100px] md:mr-8 border-4 border-white overflow-hidden shadow-sm p-1"
      >
        <Image
          src={data.profileIcon || "/icons/noneImage.svg"}
          alt="Profile"
          width={130}
          height={130}
          className="size-full object-contain rounded-full"
        />
      </div>

      <div className="w-full flex justify-between items-center">
        <div className="w-full p-4 flex flex-col md:p-8">
          <div className="w-full flex justify-between mt-4 items-center">
            <div className="flex items-center">
              <h3 className="font-bold text-sm md:text-[40px]">{data.name}</h3>
              {data.blueTick && (
                <Image
                  width={15}
                  height={15}
                  className="mr-2 md:w-5 md:h-5"
                  src="/icons/blueTick.svg"
                  alt="Verified"
                />
              )}
            </div>

            <MoreActions
              isPending={false}
              handleRegisterScoreBtn={() => handleAction("Score")}
              handleShareBtn={() => handleAction("Share")}
              handleViolationReport={() => handleAction("Report")}
            />
          </div>

          <p className="text-xs mt-2 text-[#505050] md:text-lg md:mt-5">
            میزان رضایت مندی کاربران: {data.score} از 5
          </p>

          <p className="font-bold text-xs mt-2 md:text-lg md:mt-5 lg:text-[32px]">
            {data.description}
          </p>

          <div className="flex items-center mt-3 md:mt-6">
            {data.address || data.realEstateOfficeName ? (
              <>
                <Image
                  width={16}
                  height={16}
                  src={
                    data.address
                      ? "/icons/location.svg"
                      : "/icons/user-square.svg"
                  }
                  className="md:w-6 md:h-6 lg:w-7 lg:h-7"
                  alt="icon"
                />
                <span className="text-xs font-bold text-[#505050] mr-1 md:text-2xl">
                  {data.address || data.realEstateOfficeName}
                </span>
              </>
            ) : null}
          </div>

          <Button
            className="border mt-4 w-fit px-8 md:mt-7 md:text-lg"
            variant="bordered"
            color="danger"
            radius="sm"
            size={isMobile ? "sm" : "md"}
            onPress={() => handleAction("ContactInfo")}
          >
            {data.titleContactInfoBtn}
          </Button>
        </div>

        <div className="p-5 hidden md:flex ml-7 flex-col rounded-xl shadow absolute left-0 bg-white items-center mt-14 min-w-[250px]">
          {isScore && (
            <div className="w-full flex flex-col items-center">
              <p className="text-sm lg:text-base text-center">
                چه امتیازی به {data.name} میدی؟
              </p>
              <Button
                onPress={() => handleAction("Score")}
                radius="sm"
                className="bg-primary text-white w-full mt-2"
              >
                ثبت امتیاز
              </Button>
            </div>
          )}
          <p className="text-[#505050] mt-3 text-sm">
            میزان رضایت مندی: {data.score} از 5
          </p>
          <Button
            variant="light"
            radius="sm"
            className="mt-2"
            onPress={() => handleAction("Report")}
          >
            <Image width={24} height={24} src="/icons/warning-2.svg" alt="" />
            <span>گزارش تخلف</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
