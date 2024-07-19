// Home
export type navigationMenuType = {
  title: string;
  icon: string;
  link: string;
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
  time: number;
  setTime: (value: number) => void;
  btnSendPhoneNumber: () => void;
};

// InputPhoneNumber
export type InputPhoneNumberType = {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  inputErr: boolean;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
  btnSendPhoneNumber: () => void;
  isPendingVerifyNumber: boolean;
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

export type InputPasswordType = {
  type: string;
  icon: string;
};

// real-estate-offices Type
export type RealEstateOfficesType = {
  data: [
    {
      name: string;
      username: string;
      city: string;
      main_street: string;
      sub_street: string;
      score: number;
      number_of_active_ads: number;
      number_of_comments: number;
    }
  ];
};

// BtnSizeType
export type BtnSizeType = "sm" | "md" | "lg" | undefined;

// usePostRequestType
export type usePostRequestType = {
  url: string;
  key: string;
};

// Login data type
export type LoginDataType = {
  number: string;
  code: number | string;
  token: string;
};

// SignUp Data Type
export type SignUpDataType = {
  first_name: string;
  last_name: string;
  password: string;
  token: number | string;
  number: string;
};

// useGetRequestType
export type useGetRequestType = {
  url: string;
  key: string;
  headers: HeadersInit;
  enabled?: boolean;
  staleTime?: number;
};

// user Info Data Type
export type userInfoDataType = {
  data:{
    first_name: string;
    last_name: string;
    number: number;
    image_full_path?: string;
  }
}