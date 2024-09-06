export default function ReadingTimeCard({ time }: { time: number }) {
  return (
    <div
      className="p-1 px-2 text-[10px] bg-[#EDEDED] rounded-md w-fit md:text-xs lg:text-[13px]
     md:p-2 cursor-default"
    >
      {`زمان مطالعه : ${time}`}
    </div>
  );
}
