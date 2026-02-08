import { NewsType } from "@/types";
import MainHeroCard from "./cards/MainHeroCard";
import MixedGrid from "./layouts/MixedGrid";
import EqualGrid from "./layouts/EqualGrid";

const NewsSection = ({ section }: { section: NewsType }) => {
  switch (section.layout) {
    case "FEATURED_ROW":
      const topSpecialPost = [...section.posts].reduce((prev, current) =>
        prev.special > current.special ? prev : current,
      );

      return (
        <div className="w-full">
          <MainHeroCard post={topSpecialPost} title="اخبار املاک" />
        </div>
      );
    case "MIXED_GRID":
      return <MixedGrid title={section.title} posts={section.posts} />;

    case "EQUAL_GRID":
      return <EqualGrid title={section.title} posts={section.posts} />;
    default:
      return null;
  }
};

export default NewsSection;
