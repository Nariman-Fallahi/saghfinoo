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

type FooterSection = {
  title: string;
  items: FooterItem[];
};

export type dataMenuType = FooterSection[];

export type staticFooterItemsType = {
  titleFooterMenu: string;
  icon: string;
  title: string;
  description: string;
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
  setPhoneNumber: (value: string) => void;
  inputErr: boolean;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
  btnSendPhoneNumber: () => void;
};

// DeveloperMenuFooter
type contact = {
  image: string;
  url: string;
};

export type DevelopersType = {
  fullName: string;
  role: string;
  contact: contact[];
}[];

// SignUp
export type SignUpInputType = {
  id: number;
  title: string;
  placeholder: string;
  icon: string;
}[];

export type SignUpType = {
  token: string;
  phoneNumber: string;
};
