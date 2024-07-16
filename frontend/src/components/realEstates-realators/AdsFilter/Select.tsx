"use client";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useState } from "react";

type SelectType = {
  ButtonText: string;
};

export default function Select({ ButtonText }: SelectType) {
  const [openBox, setOpenBox] = useState(false);

  const ClickBtnSelect = () => {
    setOpenBox(!openBox);
  };

  return (
    <div className="flex-col mt-11 relative hidden md:flex">
      <Button
        radius="sm"
        variant="bordered"
        onPress={ClickBtnSelect}
        className="ml-4"
        style={{
          boxShadow: openBox ? "0px 0px 0px 3px rgba(47, 128, 237, 0.19)" : "",
          border: openBox ? "1px solid #2F80ED" : "1px solid #d4d4d8",
        }}
      >
        <div className="flex items-center">
          <span className="text-[#505050] ml-2">{ButtonText}</span>
          {openBox ? (
            <Image width={20} height={20} src="/icons/arrow-up.svg" alt="" />
          ) : (
            <Image width={20} height={20} src="/icons/arrow-down.svg" alt="" />
          )}
        </div>
      </Button>

      {openBox && (
        <div
          className="w-[190px] h-[200px] bg-white absolute mt-12 z-20 rounded-lg
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
  );
}
