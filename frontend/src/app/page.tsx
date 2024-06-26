import Features from "@/components/Home/NewUser/Features";
import LatestNews from "@/components/Home/NewUser/LatestNews";
import RealEstate from "@/components/Home/NewUser/RealEstate";
import TopRealEstate from "@/components/Home/NewUser/TopRealEstate";
import SearchBox from "@/components/Home/SearchBox";
import FooterMenu from "@/components/Menu/FooterMenu/FooterMenu";
import Menu from "@/components/Menu/HeaderMenu/Menu";
import Register from "@/components/Register";

export default function Home() {
  return (
  <>
   <Menu />
   <SearchBox />
   <TopRealEstate />
   <Features />
   <LatestNews />
   <RealEstate />
   <FooterMenu />
   <Register />
   </>
  );
}