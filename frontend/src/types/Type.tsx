// Home
export type navigationMenuType = {
  title: string;
  icon: string;
}[];

// Menu
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

//   Otp
export type OtpType = {
  otp: string;
  setOtp: (value: string) => void;
  handleFocus: (index: number) => void;
  handleBlur: () => void;
  focusedInput: number | null;
};

// InputPhoneNumber
export type InputPhoneNumberType = {
  setPhone: (value: string) => void;
  inputErr: boolean;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
  btnSendPhoneNumber: () => void;
};
