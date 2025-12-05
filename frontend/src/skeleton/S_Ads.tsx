import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function S_Ads() {
  return Array.from({ length: 6 }).map((_, index) => (
    <div
      key={index}
      className="rounded flex flex-col border border-[#E1E1E1] mt-4"
    >
      <div className="-mt-1 h-full">
        <Skeleton height={100} className="!w-full md:h-1/2 lg:h-[185px]" />
        <div className="flex flex-col p-2 md:p-3 gap-6">
          <Skeleton count={5} />
        </div>
      </div>
    </div>
  ));
}
