import HorizontalCard from "../cards/HorizontalCard";
import { NewsPostsType } from "@/types";
import SectionHeader from "../SectionHeader";

interface EqualGridProps {
  title: string;
  posts: NewsPostsType[];
}

export default function EqualGrid({ title, posts }: EqualGridProps) {
  return (
    <section>
      <SectionHeader title={title} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <HorizontalCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
