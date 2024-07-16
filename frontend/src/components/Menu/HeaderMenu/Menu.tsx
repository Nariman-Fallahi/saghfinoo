"use client";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { navigationMenuType } from "@/types/Type";
import { useUserInfo } from "@/store/Register";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import Register from "@/components/Register/Register";
import { ApiService } from "@/ApiService";

export default function Menu() {
  const access = getCookie("access");
  const { setUserInfo, userInfo } = useUserInfo();

  const navigationMenu: navigationMenuType = [
    {
      title: "اجاره",
      icon: "/icons/arrow-left.svg",
      link: ""
    },
    {
      title: "خرید",
      icon: "/icons/arrow-left.svg",
      link: ""
    },
    {
      title: "املاک و مستغلات",
      icon: "/icons/arrow-left.svg",
      link: "/realEstates"
    },
    {
      title: "مشاورین املاک",
      icon: "/icons/arrow-left.svg",
      link: ""
    },
    {
      title: "اخبار روز",
      icon: "/icons/arrow-left.svg",
      link: ""
    },
  ];

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch(
          ApiService.GetUserInfo,
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
      <Register />
    </>
  );
}
