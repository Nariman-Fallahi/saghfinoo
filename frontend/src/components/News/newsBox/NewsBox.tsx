import { Title } from "@/components/ui/Title";
import Image from "next/image";
import ReadingTimeCard from "../ReadingTimeCard";
import Slider from "./Slider";
import { NewsDataType } from "@/Types";

type NewsBoxType = {
  title: string;
  importantNews: NewsDataType;
  newsData: NewsDataType[];
  pageName: string;
  totalPages: number;
};

export default function NewsBox({
  title,
  importantNews,
  newsData,
  pageName,
  totalPages,
}: NewsBoxType) {
  return (
    <div className="flex flex-col mt-6 md:mt-10">
      <Title title={title} />

      <div
        className="flex flex-col mt-4 md:flex-row md:gap-2 md:w-full md:h-[80vh]
        md:mt-6 lg:mt-7"
      >
        <div className="w-full flex flex-col border rounded-lg md:w-[70%] ">
          <Image
            width={1000}
            height={500}
            className="w-full h-1/2 rounded-t-lg md:h-3/5"
            src={importantNews.imageFullPath}
            alt="Image"
          />

          <div className="p-2 mt-1 pb-2">
            <ReadingTimeCard time={20} />
            <h3 className="mt-2 text-[13px] font-bold md:text-xl lg:text-2xl">
              {importantNews.title}
            </h3>
            <p className="mt-2 text-xs line-clamp-2 md:text-base lg:text-lg">
              {importantNews.shortDescription}
            </p>
          </div>
        </div>
        <Slider data={newsData} pageName={pageName} totalPages={totalPages} />
      </div>
    </div>
  );
}
