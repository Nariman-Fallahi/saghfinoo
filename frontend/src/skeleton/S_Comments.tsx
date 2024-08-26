import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function S_Comments() {
  return Array.from({ length: 5 }).map((_, index) => (
    <div
      key={index}
      className="!w-[242px] p-2 flex flex-col shadow
       rounded-2xl border border-[#EDEDED] pb-3 md:items-center md:p-7 mr-3"
    >
      <div className="flex md:flex-col md:items-center">
        <Skeleton
          circle
          width={38}
          height={38}
          className="md:!w-[60px] md:!h-[60px]"
        />
        <div className="flex flex-col mr-3 md:mr-0 md:items-center">
          <Skeleton count={2} width={100} />
        </div>
      </div>
      <div className="mt-2 flex flex-col">
        <Skeleton count={3} width={220} />
      </div>
    </div>
  ));
}
