import Features from "@/components/Home/NewUser/Features";
import LatestNews from "@/components/Home/NewUser/LatestNews";
import RealEstate from "@/components/Home/NewUser/RealEstate";
import TopRealEstate from "@/components/Home/NewUser/TopRealEstate";
import SearchBox from "@/components/Home/SearchBox";

export default function Home() {
  return (
    <>
      <SearchBox />
      <TopRealEstate />
      <Features />
      <LatestNews />
      <RealEstate />
    </>
  );
}