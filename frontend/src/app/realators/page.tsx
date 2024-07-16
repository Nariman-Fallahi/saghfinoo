import Menu from "@/components/Menu/HeaderMenu/Menu";
import SearchBox from "@/components/realEstates-realators/SearchBox";
import RealatorsCarts from "@/components/RealatorsCarts";
import FooterMenu from "@/components/Menu/FooterMenu/FooterMenu";

export default function page() {
  return (
    <>
      <Menu />
      <SearchBox title="مشاورین املاک" />
      <RealatorsCarts />
      <FooterMenu />
    </>
  );
}
