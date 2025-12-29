import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { dataMenuType } from "@/types";
import { staticFooterItemsType } from "@/types";
import Image from "next/image";
import { DevelopersType } from "@/types";

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
    description:
      "سقفینو پلی است تا به سرعت در بین هزاران آگهی ثبت شده جستجو کنید ملک مورد نظر را پیدا کنید و برای انجام معامله ای مطمین با مشاورین املاک معتمد و متخصص شهرتان در ارتباط باشید.",
  };

  const DevelopersItem: DevelopersType = [
    {
      fullName: "نریمان فلاحی",
      role: "فرانت اند",
      contact: [
        {
          image: "/icons/github.png",
          url: "https://github.com/Nariman-Fallahi",
        },
        {
          image: "/icons/linkedin.png",
          url: "https://www.linkedin.com/in/narimanfallahi/",
        },
      ],
    },
    {
      fullName: "محمدامین یعقوبی",
      role: "بک اند",
      contact: [
        { image: "/icons/github.png", url: "https://github.com/yaghoubi-mn" },
        {
          image: "/icons/linkedin.png",
          url: "https://www.linkedin.com/in/mohammadamin-yaghoubi-461aaa296/",
        },
      ],
    },
  ];

  const Developers: React.FC = () => {
    return (
      <div className="w-full flex flex-col items-center mt-2 text-sm">
        <p>توسعه دهندگان</p>
        <div className="flex w-full mt-2 justify-center">
          {DevelopersItem.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full p-3 flex flex-col items-center border border-gray-300
                 rounded mr-2 ml-2 lg:w-[25%]"
              >
                <div className="flex w-full justify-between">
                  <p className="text-xs lg:text-sm">{item.fullName}</p>
                  <p className="text-xs text-blue-500 lg:text-sm">
                    {item.role}
                  </p>
                </div>

                <div className="flex mt-2">
                  {item.contact.map((itemContact, indexContact) => {
                    return (
                      <a
                        target="_blank"
                        key={indexContact}
                        href={itemContact.url}
                        aria-label={item.fullName}
                      >
                        <Image
                          className="mr-2 ml-2 lg:w-[30px] lg:h-[30px]"
                          width={25}
                          height={25}
                          src={itemContact.image}
                          alt={item.fullName}
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="w-full flex p-2 bg-gray-200 text-xs absolute mt-[7rem]
         justify-center lg:text-sm"
        >
          تمام حقوق برای سقفینو محفوظ است.
        </div>
      </div>
    );
  };

  return (
    <>
      <MobileMenu
        footerItems={footerItems}
        staticFooterItems={staticFooterItems}
        Developers={Developers}
      />
      <DesktopMenu
        dynamicFooterItems={dynamicFooterItems}
        footerItems={footerItems}
        staticFooterItems={staticFooterItems}
        Developers={Developers}
      />
    </>
  );
}
