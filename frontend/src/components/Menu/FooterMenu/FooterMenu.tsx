import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { dataMenuType } from "@/types/Menu";
import { staticFooterItemsType } from "@/types/Menu";

export default function FooterMenu() {
  const dynamicFooterItems: dataMenuType = [
    {
      title: "بازار های املاک و مستغلات",
      items: [
        "بازار املاک و مستغلات تهران",
        "بازار املاک و مستغلات اصفهان",
        "بازار املاک و مستغلات شمال",
      ],
    },
    {
      title: "بیشترین جستجوها",
      items: [
        "آپارتمان نزدیک مترو",
        "خانه نزدیک بر اصلی خیابان",
        "آپارتمان تک واحده",
      ],
    },
    {
      title: "پر امتیاز ترین مشاوران املاک",
      items: ["میترا جباری", "حسام الدین عزیزی", "بهارم مشعوف"],
    },
  ];

  const footerItems: dataMenuType = [
    {
      title: "خدمات",
      items: [
        "اجاره",
        "خرید",
        "ثبت آگهی ملک",
        "املاک",
        "مشاورین املاک",
        "اخبار روز املاک",
        "سوالات ملکی",
      ],
    },
    {
      title: "ارتباط با ما",
      items: [
        { icon: "/icons/call.svg", text: "تلفن" },
        { icon: "/icons/instagram.svg", text: "اینستاگرام" },
        { icon: "/icons/Telegram.svg", text: "تلگرام" },
      ],
    },
    {
      title: "اطلاعات",
      items: [
        "دانلود اپلیکیشن",
        "تماس با ما",
        "داستان سقفینو",
        "پرسش های پر تکرار",
        "بلاگ سقفینو",
        "حریم خصوصی شما",
        "تعهدات ما و شما",
      ],
    },
  ];

  const staticFooterItems: staticFooterItemsType = {
    titleFooterMenu: "سقفینو سقفی ایده آل برای زندگی",
    icon: "/icons/Logo.svg",
    title: "تجربه لذت خانه دار شدن سریع و آسان",
    Description: `سقفینو پلی است تا به سرعت در بین هزاران آگهی ثبت شده جستجو کنید.
    <br />
    ملک مورد نظر را پیدا کنید و برای انجام معامله ای مطمین با مشاورین املاک
    معتمد و متخصص شهرتان در ارتباط باشید.`,
  };

  return (
    <>
      <MobileMenu
        footerItems={footerItems}
        staticFooterItems={staticFooterItems}
      />
      <DesktopMenu
        dynamicFooterItems={dynamicFooterItems}
        footerItems={footerItems}
        staticFooterItems={staticFooterItems}
      />
    </>
  );
}

("dynamicFooterItems");
