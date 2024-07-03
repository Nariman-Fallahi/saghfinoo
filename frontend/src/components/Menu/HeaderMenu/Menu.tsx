"use client";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { navigationMenuType } from "@/types/Type";
import { useUserInfo } from "@/store/Register";
import { getCookie } from "cookies-next";
import { useEffect } from "react";

export default function Menu() {
  const access = getCookie("access");
  const { setUserInfo, userInfo } = useUserInfo();

  const navigationMenu: navigationMenuType = [
    {
      title: "اجاره",
      icon: "/icons/arrow-left.svg",
    },
    {
      title: "خرید",
      icon: "/icons/arrow-left.svg",
    },
    {
      title: "املاک و مستغلات",
      icon: "/icons/arrow-left.svg",
    },
    {
      title: "مشاورین املاک",
      icon: "/icons/arrow-left.svg",
    },
    {
      title: "اخبار روز",
      icon: "/icons/arrow-left.svg",
    },
  ];

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/v1/users/get-user-info",
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (access !== undefined) {
      getUserInfo();
    }
  }, []);

  return (
    <>
      <MobileMenu NavigationMenu={navigationMenu} />
      <DesktopMenu NavigationMenu={navigationMenu} />
    </>
  );
}
