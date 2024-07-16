import { Button } from "@nextui-org/button";
import Image from "next/image";
import Select from "./Select";
import { useState, useEffect } from "react";
import { BtnSizeType } from "@/types/Type";

type FilterType = {
  setOpenFilterModal: (value: boolean) => void;
}

export default function Filter({setOpenFilterModal} : FilterType) {
  const [btnSize, setBtnSize] = useState<BtnSizeType>(undefined);
  
  if(typeof window !== "undefined") {
    useEffect(() => {
      if (window.innerWidth < 768) {
         setBtnSize('sm');
        } else {
       setBtnSize('md');
        }
    }, [btnSize])
  }

  return (
    <>
      <Button
        variant="bordered"
        size={btnSize}
        className="w-1/4 border mt-5 rounded md:mt-10 md:hidden"
        onPress={() => setOpenFilterModal(true)}
      >
        <div className="flex items-center">
          <Image width={16} height={16} src="/icons/filter-search.svg" alt="" />
          <span className="mr-1">فیلترها</span>
        </div>
      </Button>

      <div className="flex items-center">
        <Select ButtonText="شهر" />
        <Select ButtonText="شهر" />
      </div>
    </>
  );
}
