import { Button } from "@nextui-org/button";
import Image from "next/image";
import { nameActiveModalValue } from "@/constant/Constants";
import { useState, useEffect } from "react";
import { BtnSizeType } from "@/types/Type";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type InfoType = {
  onOpen: () => void;
  setNameActiveModal: (value: string) => void;
};

export default function Info({ onOpen, setNameActiveModal }: InfoType) {
  const [activeMore, setActiveMore] = useState<boolean>(false);
  const [btnSize, setBtnSize] = useState<BtnSizeType>(undefined);
  const [isloading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleClickOutside = (event: any) => {
        if (
          !event.target.closest(".open-modal-btn") &&
          !event.target.closest(".selectBtn")
        ) {
          setActiveMore(false);
        }
      };

      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setBtnSize("sm");
      } else {
        setBtnSize("md");
      }
    }
  }, [btnSize]);

  const ClickContactInfoBtn = () => {
    onOpen();
    setNameActiveModal(nameActiveModalValue.ContactInfo);
  };

  const ClickShareBtn = () => {
    onOpen();
    setNameActiveModal(nameActiveModalValue.Share);
    setActiveMore(false);
  };

  // const ClickSaveBtn = () => {
  //   onOpen();
  //   setNameActiveModal(nameActiveModalValue.Save);
  // };

  // const ClickReportBtn = () => {
  //   onOpen();
  //   setNameActiveModal(nameActiveModalValue.Report);
  // };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-44 mt-[60px] md:h-[280px] md:mt-0">
        {isloading ? (
          <div className="-mt-1 w-full h-full">
            <Skeleton className="w-full h-full" />
          </div>
        ) : (
          <Image
            width={100}
            height={100}
            className="w-full h-full"
            src="/image/Bg-SearchBox.webp"
            alt=""
          />
        )}
      </div>

      {isloading ? (
        <div className="-mt-12 md:-mt-[100px]">
          <Skeleton
            circle
            className="!w-[96px] !h-[96px] md:!w-[200px] md:!h-[200px] mr-4 md:mr-8"
          />
        </div>
      ) : (
        <div
          className="w-[96px] h-[96px] rounded-full -mt-12 relative mr-4
           bg-[#F9F9F9] flex justify-center items-center md:w-[200px] md:h-[200px]
           md:-mt-[100px] md:mr-8"
        ></div>
      )}

      <div className="w-full flex justify-between items-center">
        <div className="w-full p-4 flex flex-col md:p-8">
          <div className="w-full flex justify-between mt-4 items-center">
            <h3 className="font-bold text-sm md:text-[40px]">
              {isloading ? (
                <Skeleton width={80} className="md:!w-[120px]" />
              ) : (
                "املاک توسی"
              )}
            </h3>

            <div className="flex flex-col items-end md:hidden">
              {isloading ? (
                <Skeleton circle width={18} height={18} />
              ) : (
                <Button
                  isIconOnly
                  size="sm"
                  variant={activeMore ? "flat" : "light"}
                  radius="full"
                  className="open-modal-btn"
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveMore(!activeMore);
                  }}
                >
                  <Image width={18} height={18} src="/icons/more.svg" alt="" />
                </Button>
              )}

              {activeMore && (
                <div
                  className="w-[100px] h-[120px] bg-white absolute mt-10 z-20 rounded
                   border-[#2F80ED] border flex flex-col overflow-y-auto selectBtn"
                  style={{
                    boxShadow: "0px 0px 0px 3px rgba(47, 128, 237, 0.19)",
                  }}
                >
                  <div className="w-full">
                    <Button
                      className="rounded-none border-b h-10 w-full"
                      variant="light"
                      size="sm"
                    >
                      ذخیره
                    </Button>
                  </div>

                  <div className="w-full">
                    <Button
                      className="rounded-none border-b h-10 w-full"
                      variant="light"
                      size="sm"
                      onClick={ClickShareBtn}
                    >
                      اشتراک گذاری
                    </Button>
                  </div>

                  <div className="w-full">
                    <Button
                      className="rounded-none border-b h-10 w-full"
                      variant="light"
                      size="sm"
                      // onClick={ClickReportBtn}
                    >
                      گزارش تخلف
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="items-center hidden md:flex">
              {isloading ? (
                <Skeleton
                  circle
                  width={26}
                  height={26}
                  count={2}
                  inline
                  className="ml-2"
                />
              ) : (
                <>
                  <Button isIconOnly size="sm" variant="light" radius="full">
                    <Image
                      width={24}
                      height={24}
                      src="/icons/save.svg"
                      alt=""
                    />
                  </Button>

                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    radius="full"
                    className="mr-2"
                    onPress={ClickShareBtn}
                  >
                    <Image
                      width={24}
                      height={24}
                      src="/icons/export.svg"
                      alt=""
                    />
                  </Button>
                </>
              )}
            </div>
          </div>

          <p className="text-xs mt-2 text-[#505050] md:text-lg md:mt-5">
            {isloading ? (
              <Skeleton width={100} className="md:!w-[150px]" />
            ) : (
              "میزان رضایت مندی کاربران"
            )}
          </p>

          <p className="font-bold text-xs mt-2 md:text-lg md:mt-5 lg:text-[32px]">
            {isloading ? (
              <Skeleton width={140} className="md:!w-[210px]" />
            ) : (
              "تخضض ما یافتن خانه دلخواه شما است"
            )}
          </p>

          <div className="flex items-center mt-3 md:mt-6">
            {isloading ? (
              <Skeleton width={100} className="md:!w-[150px]" />
            ) : (
              <>
                <Image
                  width={16}
                  height={16}
                  className="md:w-6 md:h-6"
                  src="/icons/location.svg"
                  alt=""
                />
                <span className="text-xs font-bold text-[#505050] mr-1 md:text-2xl">
                  تهران نیاوران
                </span>
              </>
            )}
          </div>

          {isloading ? (
            <div className="mt-4 md:mt-7">
              <Skeleton
                width={110}
                height={15}
                className="md:!w-[160px] md:!h-[30px]"
              />
            </div>
          ) : (
            <Button
              className="border mt-4 w-3/12 md:mt-7 md:w-1/5 md:text-lg"
              variant="bordered"
              color="danger"
              radius="sm"
              size={btnSize}
              onClick={ClickContactInfoBtn}
            >
              تماس با ما
            </Button>
          )}
        </div>

        <div
          className="p-5 hidden md:flex ml-7 flex-col rounded-xl shadow absolute
         left-0 bg-white items-center"
        >
          <p className="text-[#505050]">
            {isloading ? (
              <Skeleton width={100} className="md:!w-[150px]" />
            ) : (
              "میزان رضایت مندی کاربران"
            )}
          </p>
          {isloading ? (
            <Skeleton width={70} className="md:!w-[120px]" />
          ) : (
            <>
              <Button variant="light" radius="sm" className="mt-2">
                <Image
                  width={24}
                  height={24}
                  src="/icons/warning-2.svg"
                  alt=""
                />
                <span>گزارش تخلف</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
