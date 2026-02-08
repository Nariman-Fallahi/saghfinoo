import React from "react";
import VerticalNewsCard from "../cards/VerticalNewsCard";
import { NewsPostsType } from "@/types";
import { Title } from "@/components/ui/Title";
import SectionHeader from "../SectionHeader";

interface MixedGridProps {
  title: string;
  posts: NewsPostsType[];
}

export default function MixedGrid({ title, posts }: MixedGridProps) {
  const featuredPost = [...posts].sort((a, b) => b.special - a.special)[0];

  const sidePosts = posts.filter((p) => p.slug !== featuredPost.slug);

  return (
    <section>
      <SectionHeader title={title} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 direction-rtl">
        <div className="lg:col-span-2">
          <VerticalNewsCard post={featuredPost} />
        </div>

        <div className="flex flex-col gap-6">
          {sidePosts.slice(0, 2).map((p) => (
            <VerticalNewsCard key={p.slug} post={p} size="sm" />
          ))}
        </div>
      </div>
    </section>
  );
}
