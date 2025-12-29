import Image from "next/image";
import { dataMenuType } from "@/types";
import { staticFooterItemsType } from "@/types";

type MobileMenuType = {
  footerItems: dataMenuType;
  staticFooterItems: staticFooterItemsType;
  Developers: React.FC;
};

export default function MobileMenu({
  footerItems,
  staticFooterItems,
  Developers,
}: MobileMenuType) {
  return (
    <footer className="w-full mt-10 p-3 pt-10 bg-[#F9F9F9] flex flex-col pb-0 md:hidden">
      <Image width={80} height={80} src="/icons/Logo.svg" alt="" />
      <h5 className="font-medium text-base mt-4">
        {staticFooterItems.titleFooterMenu}
      </h5>
      <h3 className="mt-1 text-xs">{staticFooterItems.title}</h3>

      <div className="w-full flex justify-between pl-4 text[10px] mt-4">
        <span>بیشترین جستجو ها</span>
        <span>بازار های املاک و مستعلات</span>
      </div>

      <p className="text-[10px] mt-7 text-gray-700">
        {staticFooterItems.description}
      </p>

      <div className="w-full flex justify-between mt-5 text-gray-700">
        {footerItems.map((item, index) => {
          return (
            <div key={index} className="flex flex-col">
              <p className="font-normal text-sm">{item.title}</p>
              <div className="mt-1 flex flex-col text-[10px]">
                {item.items.map((subItem, innerIndex) => {
                  return typeof subItem === "string" ? (
                    <span key={innerIndex} className="mt-[3.5px]">
                      {subItem}
                    </span>
                  ) : (
                    <div key={innerIndex} className="flex items-center">
                      <Image width={22} height={22} src={subItem.icon} alt="" />
                      <span className="mr-1">{subItem.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {/* Icon */}
      <div className="w-full px-3 mt-8">
        <Image
          className="w-full"
          width={324}
          height={60}
          src="/icons/iconFooterMenu.svg"
          alt=""
        />
      </div>
      {/* END Icon */}
      <Developers />
    </footer>
  );
}
