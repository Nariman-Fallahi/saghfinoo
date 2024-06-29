import Image from "next/image";
import { dataMenuType } from "@/types/Type";
import { staticFooterItemsType } from "@/types/Type";

type DecktopMenuType = {
  dynamicFooterItems: dataMenuType;
  footerItems: dataMenuType;
  staticFooterItems: staticFooterItemsType;
  Developers: React.FC
};

export default function DecktopMenu({
  dynamicFooterItems,
  footerItems,
  staticFooterItems,
  Developers
}: DecktopMenuType) {
  return (
    <footer className="w-full mt-10 pt-7 bg-gray-200 flex-col pb-0 hidden md:flex">
      <div className="w-full flex justify-center">
        <h2 className="text-lg font-semibold lg:text-[32px] lg:mt-5">
          {staticFooterItems.titleFooterMenu}
        </h2>
      </div>

      <div className="w-full flex justify-between mt-6 p-3 lg:px-12 lg:mt-10">
        {/* 1 */}
        {dynamicFooterItems.map((item, index) => (
          <div key={index} className="flex flex-col">
            <h3 className="text-sm font-normal">{item.title}</h3>
            <div className="mt-2 flex flex-col text-gray-700 text-xs">
              {item.items.map((subItem, innerIndex) => (
                <span
                  key={innerIndex}
                  className="cursor-pointer hover:text-red-600"
                >
                  {typeof subItem === "string" ? subItem : subItem.text}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Line */}
      <div className="w-full h-[1px] mt-5 bg-gray-400"></div>
      {/* END Line */}
      <div className="w-full flex justify-between p-3 mt-4">
        {/* 1 */}
        <div className="flex flex-col w-[35%]">
          <Image width={120} height={120} src="/icons/Logo.svg" alt="" />
          <h4 className="mt-6 text-base">{staticFooterItems.title}</h4>
          <p className="mt-3 text-gray-700 text-xs">
            {staticFooterItems.description}
          </p>
        </div>
        {/* 2 */}
        {footerItems.map((item, index) => {
          return (
            <div key={index} className="flex flex-col">
              <h2 className="text-sm font-normal">{item.title}</h2>
              <div className="mt-1 flex flex-col text-gray-700 text-xs">
                {item.items.map((subItem, innerIndex) => {
                  return (
                    <div key={innerIndex} className="flex items-center mt-2">
                      {typeof subItem === "string" ? (
                        <span>{subItem}</span>
                      ) : (
                        <>
                          <Image
                            width={22}
                            height={22}
                            src={subItem.icon}
                            alt={subItem.text}
                          />
                          <span className="mr-1">{subItem.text}</span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {/* Icon */}
      <div className="w-full flex justify-center mt-6">
        <Image
          width={736}
          height={123}
          src="/icons/iconFooterMenu.svg"
          alt=""
        />
      </div>
      {/* END Icon */}
      <Developers />
    </footer>
  );
}
