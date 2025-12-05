"use client";

import { FilterDataType } from "@/types/Type";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const useUpdateSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParams = (data: FilterDataType) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(data).forEach(([key, value]) => {
      if (value && value !== "undefined-undefined" && value !== "-") {
        updatedSearchParams.set(key, value);
      } else {
        updatedSearchParams.delete(key);
      }
    });

    router.push(`${pathname}?${updatedSearchParams.toString()}`);
  };

  return updateSearchParams;
};

export default useUpdateSearchParams;
