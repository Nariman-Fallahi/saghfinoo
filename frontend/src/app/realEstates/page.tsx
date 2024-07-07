import Menu from "@/components/Menu/HeaderMenu/Menu";
import SearchBox from "@/components/SearchBox";
import RealEstatesCards from "@/components/RealEstatesCards";
import FooterMenu from "@/components/Menu/FooterMenu/FooterMenu";

export default function page() {
  return (
    <>
      <Menu />
      <SearchBox title="املاک و مستغلات" />
      <RealEstatesCards />
      <FooterMenu />
    </>
  );
}
