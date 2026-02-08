import CustomButton from "@/components/ui/CustomButton";
import { Title } from "@/components/ui/Title";
import { NewsPostsType } from "@/types";
import { toPersianDate } from "@/utils/toPersianDate";
import Image from "next/image";
import ReadingTimeBadge from "../ReadingTimeBadge";

interface MainHeroCardProps {
  title: string;
  post: NewsPostsType;
}

export default function MainHeroCard({ title, post }: MainHeroCardProps) {
  return (
    <div className="flex w-full flex-col">
      <Title title={title} />

      <div className="flex flex-col w-full bg-[#F9F9F9] mt-4 md:flex-row-reverse h-[400px] md:rounded-lg lg:rounded-xl md:items-center md:mt-6 lg:mt-7 md:justify-between md:gap-4">
        <Image
          width={1000}
          height={500}
          className="w-full h-1/2 md:h-full md:w-1/2 md:rounded-l-lg lg:rounded-l-xl object-cover"
          src={post.imageFullPath}
          alt="Image News"
        />

        <div className="w-full flex flex-col p-3 mt-1 md:w-1/2">
          <ReadingTimeBadge time={post.readTime} />
          <h3 className="font-bold mt-4 md:text-3xl lg:text-[40px] md:mt-6">
            {post.title}
          </h3>
          <p className="text-xs text-[#353535] mt-4 line-clamp-2 md:text-base lg:text-lg md:mt-6">
            {post.shortDescription}
          </p>
          <div className="w-full flex justify-between mt-6">
            <div className="px-2 flex items-center text-xs bg-[#EDEDED] rounded-lg w-fit md:text-[13px] cursor-default">
              <span className="mr-2">{toPersianDate(post.createdAt)}</span>
            </div>
            <CustomButton className="bg-primary text-white" radius="sm">
              ادامه مطلب
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
