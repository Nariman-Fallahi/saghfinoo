"use client";
import { Pagination } from "@heroui/pagination";
import { isMobile } from "@/constant/Constants";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type PaginationComponent = {
  totalPages: number | undefined;
};

export default function PaginationComponent({
  totalPages,
}: PaginationComponent) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    if (!totalPages) return;

    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set("page", pageNumber.toString());

    router.push(`${pathname}?${updatedSearchParams.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return totalPages && totalPages > 1 ? (
    <div className="w-full flex mt-8 ltr justify-center">
      <Pagination
        total={totalPages}
        color="danger"
        variant="faded"
        size={isMobile ? "sm" : "lg"}
        page={pageNumber}
        onChange={setPageNumber}
      />
    </div>
  ) : null;
}
