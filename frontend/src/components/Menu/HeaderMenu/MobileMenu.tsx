"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { navigationMenuType } from "@/types/Type";
import { useModalStore } from "@/store/Register";
import Link from "next/link";
import { userInfoDataType } from "@/types/Type";
import { FetchStatus } from "@tanstack/react-query";

type mobileMenuType = {
  NavigationMenu: navigationMenuType;
  userInfoData: userInfoDataType;
  dataStatus: "error" | "success" | "pending";
  fetchStatus: FetchStatus;
};

export default function MobileMenu({
  NavigationMenu,
  userInfoData,
  dataStatus,
  fetchStatus,
}: mobileMenuType) {
  const [openMenu, setOpenMenu] = useState<boolean>();
  const { setOpen } = useModalStore();

  const ClickRegister = () => {
    if (dataStatus === "pending" && fetchStatus === "idle") {
      setOpen(true);
    }
  };

  return (
    <>
      <nav
        className="flex w-full z-40 bg-white p-3 top-0 justify-between shadow
       items-center fixed md:hidden"
      >
        <Button
          isIconOnly
          size="sm"
          radius="full"
          variant="light"
          onPress={() => setOpenMenu(true)}
        >
          <Image width={24} height={24} src="/icons/menu.svg" alt="" />
        </Button>
        <Image width={72} height={32} src="/icons/Logo.svg" alt="" />
        <Button
          size="sm"
          variant="light"
          className="p-1 px-2 border border-red-600 text-[12px] font-medium
           rounded-[8px] text-red-600"
        >
          ثبت آگهی
        </Button>
      </nav>

      <div
        className={`absolute w-full h-screen bg-white hidden z-50 top-0 ${
          openMenu ? "openMenu" : "closeMenu"
        }`}
      >
        <div className="w-full flex flex-col py-5">
          <div className="w-full flex justify-end px-3">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => setOpenMenu(false)}
            >
              <Image
                width={24}
                height={24}
                src="/icons/close-circle.svg"
                alt=""
              />
            </Button>
          </div>

          <div
            onClick={ClickRegister}
            className="w-full bg-gray-100 px-2 py-5 mt-4 flex items-center"
          >
            <Image
              width={dataStatus === "success" ? 30 : 20}
              height={dataStatus === "success" ? 30 : 20}
              src="/icons/profile-circle.svg"
              alt=""
            />{" "}
            {dataStatus === "success" && (
              <Image
                width={20}
                height={20}
                src="/icons/edit.svg"
                className="mr-2"
                alt=""
              />
            )}
            <p className="mr-2 text-xs">
              {dataStatus === "success"
                ? `${userInfoData.data.first_name} ${userInfoData.data.last_name}`
                : "ورود یا ثبت نام"}
            </p>
            {dataStatus === "success" && (
              <Image
                width={20}
                height={20}
                src="/icons/arrow-left-2.svg"
                className="mr-2"
                alt=""
              />
            )}
          </div>
          {NavigationMenu.map((item, index) => {
            return (
              <Link
                href={item.link}
                key={index}
                className="mt-7 flex items-center justify-between px-2"
              >
                <div className="flex items-center">
                  <Image width={20} height={20} src={item.icon} alt="" />
                  <p className="text-xs mr-2">{item.title}</p>
                </div>
                <Image
                  width={20}
                  height={20}
                  src="/icons/arrow-left.svg"
                  alt=""
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
