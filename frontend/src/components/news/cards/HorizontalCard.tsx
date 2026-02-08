import { NewsPostsType } from "@/types";
import ReadingTimeBadge from "../ReadingTimeBadge";
import { toPersianDate } from "@/utils/toPersianDate";
import Image from "next/image";

export default function HorizontalCard({ post }: { post: NewsPostsType }) {
  return (
    <div className="flex bg-white rounded-2xl overflow-hidden border border-gray-100 h-40">
      <div className="flex-grow p-4 flex flex-col justify-between text-right">
        <div>
          <ReadingTimeBadge time={post.readTime} />
          <h3 className="mt-3 text-sm md:text-base font-bold text-gray-800 line-clamp-2">
            {post.title}
          </h3>
        </div>
        <span className="text-xs text-gray-400">
          {toPersianDate(post.createdAt)}
        </span>
      </div>

      <div className="w-1/3 md:w-40 flex-shrink-0">
        <Image
          width={500}
          height={500}
          src={post.imageFullPath}
          className="size-full object-cover"
          alt={post.title}
        />
      </div>
    </div>
  );
}
