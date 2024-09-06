import { Pagination } from "@nextui-org/pagination";
import { isMobile } from "@/constant/Constants";

type PaginationComponent = {
  totalPages: number | undefined;
  pageNumber: number;
  setPageNumber: (value: number) => void;
};

export default function PaginationComponent({
  totalPages,
  pageNumber,
  setPageNumber,
}: PaginationComponent) {
  return (
    totalPages &&
    totalPages > 1 ? (
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
    )
    : null
  );
}
