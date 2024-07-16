import Image from "next/image";
import { Button } from "@nextui-org/button";
import { useState, useEffect } from "react";

type SelectModalType = {
  label: string;
  titleSelect: string;
};

export default function SelectModal({ label, titleSelect }: SelectModalType) {
  const [activeSelect, setActiveSelect] = useState<boolean>(false);

  if (typeof window !== "undefined") {
    useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (
          !event.target.closest(".open-modal-btn") &&
          !event.target.closest(".selectBtn")
        ) {
          setActiveSelect(false);
        }
      };

      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);
  }

  return (
    <div className="flex flex-col w-[48%]">
      <span className="text-[#353535] text-sm mr-1">{label}</span>
      <div className="flex flex-col mt-1">
        <Button
          variant="bordered"
          className="border rounded justify-between"
          onPress={() => setActiveSelect(!activeSelect)}
        >
          <span className="text-xs">{titleSelect}</span>
          {activeSelect ? (
            <Image width={16} height={16} src="/icons/arrow-up.svg" alt="" />
          ) : (
            <Image width={16} height={16} src="/icons/arrow-down.svg" alt="" />
          )}
        </Button>

        {activeSelect && (
          <div
            className="w-[45%] h-[160px] bg-white absolute mt-12 z-20 rounded-md
          border-[#2F80ED] border flex flex-col overflow-y-auto selectBtn"
            style={{
              boxShadow: "0px 0px 0px 3px rgba(47, 128, 237, 0.19)",
            }}
          >
            <div className="w-full">
              <Button
                className="rounded-none border-b h-10 w-full"
                variant="light"
              >
                ffffff
              </Button>
            </div>

            <div className="w-full">
              <Button
                className="rounded-none border-b h-10 w-full"
                variant="light"
              >
                ffffff
              </Button>
            </div>

            <div className="w-full">
              <Button
                className="rounded-none border-b h-10 w-full"
                variant="light"
              >
                ffffff
              </Button>
            </div>

            <div className="w-full">
              <Button
                className="rounded-none border-b h-10 w-full"
                variant="light"
              >
                ffffff
              </Button>
            </div>

            <div className="w-full">
              <Button
                className="rounded-none border-b h-10 w-full"
                variant="light"
              >
                ffffff
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
