"use client";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { navigationMenuType } from "@/types/Type";
import { useModalStore } from "@/store/Register";
import Link from "next/link";
import { userInfoDataType } from "@/types/Type";
import { Spinner } from "@nextui-org/spinner";
import { FetchStatus } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

type desktopMenuType = {
  NavigationMenu: navigationMenuType;
  userInfoData: userInfoDataType;
  dataStatus: "error" | "success" | "pending";
  fetchStatus: FetchStatus;
};

export default function DesktopMenu({
  NavigationMenu,
  userInfoData,
  dataStatus,
  fetchStatus,
}: desktopMenuType) {
  const { setOpen } = useModalStore();
  const access = getCookie("access");

  return (
    <div className="w-full justify-center hidden md:flex">
      <nav
        className="w-[88%] bg-white fixed p-3 flex justify-between items-center
         shadow rounded-2xl mt-6 z-50"
      >
        <ul className="flex items-center text-sm lg:text-[20px]">
          <Image
            width={85}
            height={45}
            src="/icons/Logo.svg"
            alt=""
            className="lg:w-[131px] lg:h-[63px]"
          />
          {NavigationMenu.map((item, index) => {
            return (
              <Link
                href={item.link}
                key={index}
                className="mr-4 lg:mr-6 cursor-pointer hover:text-red-600"
              >
                {item.title}
              </Link>
            );
          })}
        </ul>
        <ul className="flex items-center">
          {dataStatus === "pending" && fetchStatus !== "idle" && (
            <div className="ml-10 lg:ml-24">
              <Spinner size="sm" color="danger" />
            </div>
          )}

          {dataStatus === 'pending' && fetchStatus === 'idle' && (
            <Button
              onPress={() => setOpen(true)}
              variant="light"
              className="ml-2 lg:ml-9 text-sm rounded-[0.35rem]"
            >
              ورود
            </Button>
          )}

          {dataStatus === "success" && (
            <Button
              variant="light"
              className="text-sm rounded-[0.35rem] ml-3 lg:ml-8"
            >
              <Image
                width={30}
                height={30}
                src="/icons/profile-circle.svg"
                alt=""
              />
              <p className="ml-2 cursor-pointer">{`${userInfoData.data.first_name} ${userInfoData.data.last_name}`}</p>
            </Button>
          )}

          <Button
            variant="light"
            className="p-1 px-2 border border-red-600 text-sm rounded-[0.35rem]
             text-red-600 lg:text-sm"
          >
            ثبت آگهی
          </Button>
        </ul>
      </nav>
    </div>
  );
}
