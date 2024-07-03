"use client";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { navigationMenuType } from "@/types/Type";
import { useModalStore, useUserInfo } from "@/store/Register";
import { useEffect } from "react";
import { useState } from "react";

type desktopMenuType = {
  NavigationMenu: navigationMenuType;
};

export default function DesktopMenu({ NavigationMenu }: desktopMenuType) {
  const { setOpen } = useModalStore();
  const { userInfo } = useUserInfo();
  const [isLogin, setIsLogin] = useState<boolean>();

  useEffect(() => {
    if (userInfo !== undefined) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userInfo]);

  const ClickRegister = () => {
    if (!isLogin) {
      setOpen(true);
    }
  };

  return (
    <div className="w-full justify-center mt-6 z-40 hidden md:flex fixed">
      <nav
        className="w-[88%] bg-white fixed p-3 flex justify-between items-center
         shadow rounded-2xl"
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
              <li
                key={index}
                className="mr-4 lg:mr-6 cursor-pointer hover:text-red-600"
              >
                {item.title}
              </li>
            );
          })}
        </ul>
        <ul className="flex items-center">
          {!isLogin && (
            <Button
              onPress={() => setOpen(true)}
              variant="light"
              className="ml-2 lg:ml-9 text-sm rounded-[0.35rem]"
            >
              ورود
            </Button>
          )}

          {isLogin && (
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
              <p className="ml-2 cursor-pointer">{`${userInfo?.first_name} ${userInfo?.last_name}`}</p>
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
