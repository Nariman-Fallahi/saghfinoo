import FooterMenu from "@/components/menu/FooterMenu/FooterMenu";
import HeaderMenu from "@/components/menu/HeaderMenu/HeaderMenu";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderMenu />
      <main>{children}</main>
      <FooterMenu />
    </>
  );
}
