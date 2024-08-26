"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { navigationMenuType } from "@/types/Type";
import { useModalStore } from "@/store/Register";
import Link from "next/link";
import { userInfoDataType } from "@/types/Type";
import { FetchStatus } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";

type mobileMenuType = {
  NavigationMenu: navigationMenuType;
  userInfoData: userInfoDataType | undefined;
  dataStatus: "error" | "success" | "pending";
  fetchStatus: FetchStatus;
  iconMenu: JSX.Element;
  AdPostingBtn: JSX.Element;
  isLogin: boolean;
};

export default function MobileMenu({
  NavigationMenu,
  userInfoData,
  dataStatus,
  fetchStatus,
  iconMenu,
  AdPostingBtn,
  isLogin,
}: mobileMenuType) {
  const [openMenu, setOpenMenu] = useState<boolean>();
  const { setOpen } = useModalStore();
  const router = useRouter();

  const ClickRegister = () => {
    if (!isLogin) {
      setOpen(true);
    } else {
      router.push("/userProfile/EditingInformation");
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
        {iconMenu}
        {AdPostingBtn}
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
              width={isLogin ? 30 : 20}
              height={isLogin ? 30 : 20}
              src="/icons/profile-circle.svg"
              alt=""
            />{" "}
            {isLogin && (
              <Image
                width={20}
                height={20}
                src="/icons/edit.svg"
                className="mr-2"
                alt=""
              />
            )}
            <p className="mr-2 text-xs">
              {isLogin
                ? `${userInfoData?.data.first_name} ${userInfoData?.data.last_name}`
                : "ورود یا ثبت نام"}
            </p>
            {isLogin && (
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
