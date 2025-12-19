import Image from "next/image";
import ReadingTimeCard from "./ReadingTimeCard";

type SliderBoxDataType = {
  image: string;
  title: string;
  readTime: number;
};

export default function SliderBox({
  image,
  title,
  readTime,
}: SliderBoxDataType) {
  return (
    <div
      className="mb-1 w-full flex flex-col border rounded-lg
      md:pb-5"
    >
      <Image
        width={1000}
        height={500}
        src={image}
        className="w-full h-1/2 rounded-t-lg md:h-2/3"
        alt=""
      />

      <div className="p-2 px-4 mt-1">
        <ReadingTimeCard time={readTime} />

        <h4 className="mt-2 text-xs font-bold line-clamp-2 md:text-lg lg:text-xl">
          {title}
        </h4>
      </div>
    </div>
  );
}
