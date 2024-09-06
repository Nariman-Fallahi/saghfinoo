import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function S_Ads() {
  return Array.from({ length: 6 }).map((_, index) => (
    <div
      key={index}
      className="w-[156px] h-[196px] rounded flex flex-col border border-[#E1E1E1] mt-4 md:w-[350px] md:h-[300px]"
    >
      <div className="-mt-1 h-full">
        <Skeleton className="!w-full h-[110px] md:h-1/2" />
        <div className="flex flex-col p-2 md:p-3 gap-6">
          <Skeleton count={3} />
        </div>
      </div>
    </div>
  ));
}