"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { navigationMenuType } from "@/Types";
import { useModalStore } from "@/store/Auth";
import Link from "next/link";
import { userInfoDataType } from "@/Types";
import { useRouter } from "@bprogress/next/app";

type mobileMenuType = {
  NavigationMenu: navigationMenuType;
  userInfoData: userInfoDataType | undefined;
  iconMenu: JSX.Element;
  adPostingBtn: JSX.Element;
  isLogin: boolean;
};

export default function MobileMenu({
  NavigationMenu,
  userInfoData,
  iconMenu,
  adPostingBtn: AdPostingBtn,
  isLogin,
}: mobileMenuType) {
  const [menuStatus, setMenuStatus] = useState<"open" | "close" | null>(null);
  const { setOpen } = useModalStore();
  const router = useRouter();

  const ClickRegister = () => {
    if (!isLogin) {
      setOpen(true);
    } else {
      router.push("/userProfile/EditingInformation");
    }
  };

  useEffect(() => {
    if (menuStatus === "open" && typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuStatus]);

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
          onPress={() => setMenuStatus("open")}
          aria-label="Open / Close Menu"
        >
          <Image width={24} height={24} src="/icons/menu.svg" alt="Menu Icon" />
        </Button>
        {iconMenu}
        {AdPostingBtn}
      </nav>

      <div
        className={`absolute w-full h-screen bg-white hidden z-50 top-0 overflow-y-auto ${
          menuStatus === "open"
            ? "openMenu"
            : menuStatus === "close"
            ? "closeMenu"
            : ""
        }`}
      >
        <div className="w-full flex flex-col py-5">
          <div className="w-full flex justify-end px-3">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => setMenuStatus("close")}
              aria-label="Open / Close Menu"
            >
              <Image
                width={24}
                height={24}
                src="/icons/close-circle.svg"
                alt="Close Menu"
              />
            </Button>
          </div>

          <div
            onClick={ClickRegister}
            className="w-full bg-gray-100 px-2 py-5 mt-4 flex items-center"
          >
            <Image
              width={isLogin ? 36 : 20}
              height={isLogin ? 36 : 20}
              src={
                (isLogin && userInfoData?.data.imageFullPath) ||
                "/icons/profile-circle.svg"
              }
              alt=""
              className="rounded-full h-9"
            />{" "}
            {isLogin && (
              <Image
                width={20}
                height={20}
                src="/icons/edit.svg"
                className="mr-2"
                alt="Edit Profile"
              />
            )}
            <p className="mr-2 text-xs">
              {isLogin
                ? `${userInfoData?.data.firstName} ${userInfoData?.data.lastName}`
                : "ورود یا ثبت نام"}
            </p>
            {isLogin && (
              <Image
                width={20}
                height={20}
                src="/icons/arrow-left-2.svg"
                className="mr-2"
                alt="Icon"
              />
            )}
          </div>
          {NavigationMenu.map((item, index) => {
            return (
              <Link
                href={item.link}
                key={index}
                className="mt-7 flex items-center justify-between px-2"
                onClick={() => setMenuStatus("close")}
              >
                <div className="flex items-center">
                  <Image width={20} height={20} src={item.icon} alt="" />
                  <p className="text-xs mr-2">{item.title}</p>
                </div>
                <Image
                  width={20}
                  height={20}
                  src="/icons/arrow-left.svg"
                  alt="Icon"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
