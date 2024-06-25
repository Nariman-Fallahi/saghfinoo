interface IconItem {
  icon: string;
  text: string;
}

type FooterItem = string | IconItem;

interface FooterSection {
  title: string;
  items: FooterItem[];
}

export type dataMenuType = FooterSection[];

export type staticFooterItemsType = {
  titleFooterMenu: string;
  icon: string;
  title: string;
  Description: string;
};
