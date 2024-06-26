import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { navigationMenuType } from "@/types/Home";

export default function Menu() {
  const navigationMenu : navigationMenuType = [
    {
      title: "اجاره",
      icon: "/icons/arrow-left.svg"
    },
    {
      title: "خرید",
      icon: "/icons/arrow-left.svg"
    },
    {
      title: "املاک و مستغلات",
      icon: "/icons/arrow-left.svg"
    },
    {
      title: "مشاورین املاک",
      icon: "/icons/arrow-left.svg"
    },
    {
      title: "اخبار روز",
      icon: "/icons/arrow-left.svg"
    },
  ];

  return (
    <>
      <MobileMenu NavigationMenu={navigationMenu} />
      <DesktopMenu NavigationMenu={navigationMenu} />
    </>
  );
}