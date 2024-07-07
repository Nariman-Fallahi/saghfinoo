"use client";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { useState, useEffect } from "react";
import { RealEstateOfficesType } from "@/types/Type";

export default function RealEstatesCards() {
  const [dataREO, setDataREO] = useState<RealEstateOfficesType[]>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [buttonActive, setButtonActive] = useState<boolean>(true);

  const getData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/real-estate-offices/get-all?page=${pageNumber}&limit=21`
      );
      const data = await response.json();
      if (response.ok) {
        setDataREO(data.data);
      } else if (data.data === "[]") {
        setPageNumber(pageNumber - 1);
        setButtonActive(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [pageNumber]);

  return (
    <>
      <div className="mt-6 w-full flex flex-wrap p-3 justify-between md:p-5">
        {dataREO?.map((item, index) => {
          return (
            <div
              className="w-[45%] shadow rounded-2xl flex flex-col p-2 items-center text-xs
           md:w-[30%] border border-[#E1E1E1]"
              key={index}
            >
              <Image
                width={80}
                height={80}
                className="rounded-full"
                src="/image/Bg-SearchBox.webp"
                alt=""
              />
              <p className="font-bold mt-3 md:text-xl">g1gg</p>
              <p className="mt-2 text-[#717171] md:text-lg">ggg</p>
              <p className="mt-2 text-[#717171] md:text-lg">ggg</p>
              <Button
                className="mt-2 md:text-sm rounded-lg"
                size="sm"
                variant="light"
              >
                مشاهده نظرات کاربران
              </Button>
            </div>
          );
        })}
      </div>

      {buttonActive && (
        <div className="w-full flex justify-center">
          <Button
            className="bg-[#CB1B1B] text-xs font-medium w-[156px] h-[32px] mt-12
           text-white lg:text-sm lg:mt-24 lg:w-[328px] rounded-lg lg:h-[40px]"
          >
            مشاهده بیشتر
          </Button>
        </div>
      )}
    </>
  );
}
