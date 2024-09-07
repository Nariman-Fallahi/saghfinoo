"use client";
import { Pagination } from "@nextui-org/pagination";
import { isMobile } from "@/constant/Constants";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type PaginationComponent = {
  totalPages: number | undefined;
};

export default function PaginationComponent({
  totalPages,
}: PaginationComponent) {
  const router = useRouter();
  const pathname = usePathname();

  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    router.push(`${pathname}?pageNumber=${pageNumber}`);
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
