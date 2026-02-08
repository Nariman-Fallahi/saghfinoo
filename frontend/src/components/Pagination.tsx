"use client";
import { isMobile } from "@/utils/isMobile";
import { Pagination } from "@heroui/pagination";
import { Spinner } from "@heroui/spinner";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react"; // اضافه شد

type PaginationComponentProps = {
  totalPages: number | undefined;
  paramKey?: string;
};

export default function PaginationComponent({
  totalPages,
  paramKey = "page",
}: PaginationComponentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const currentPage = Number(searchParams.get(paramKey)) || 1;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramKey, page.toString());

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: true });
    });
  };

  if (!totalPages || totalPages <= 1) return null;

  return (
    <div
      className={`w-full flex mt-8 ltr justify-center transition-opacity duration-300 ${
        isPending ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative">
        <Pagination
          total={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="danger"
          variant="faded"
          size={isMobile ? "sm" : "lg"}
          isDisabled={isPending}
        />

        {isPending && (
          <div className="text-sm text-danger mt-3 rtl flex items-center gap-2">
            <p>در حال بارگذاری</p>
            <Spinner size="sm" />
          </div>
        )}
      </div>
    </div>
  );
}
