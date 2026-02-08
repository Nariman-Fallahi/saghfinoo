import Image from "next/image";
import ReadingTimeBadge from "../ReadingTimeBadge";
import { NewsPostsType } from "@/types";

type VerticalNewsCardProps = {
  post: NewsPostsType;
  size?: "sm" | "md";
};

export default function VerticalNewsCard({
  post,
  size = "md",
}: VerticalNewsCardProps) {
  const isSmall = size === "sm";

  return (
    <div className="w-full flex flex-col border rounded-lg overflow-hidden transition-shadow">
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-t-lg overflow-hidden">
        <Image
          src={post.imageFullPath}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-3 flex flex-col gap-2">
        <ReadingTimeBadge time={post.readTime} />

        <h3
          className={`font-bold line-clamp-2 ${
            isSmall
              ? "text-sm md:text-base lg:text-lg"
              : "text-base md:text-xl lg:text-2xl"
          }`}
        >
          {post.title}
        </h3>

        <p
          className={`${
            isSmall
              ? "text-xs md:text-sm lg:text-base line-clamp-2"
              : "text-sm md:text-base lg:text-lg line-clamp-4"
          }`}
        >
          {post.shortDescription}
        </p>
      </div>
    </div>
  );
}
