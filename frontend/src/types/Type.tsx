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
  key: string[];
  headers?: Record<string, string>;
  enabled: boolean;
  staleTime: number;
};

// user Info Data Type
export type userInfoDataType = {
  data: {
    first_name: string;
    last_name: string;
    number: number;
    image_full_path?: string;
  };
};

// get Provinces Type

type getProvincesType = {
  id: number;
  name: string;
};

export type getProvincesDataType = {
  data: getProvincesType[];
};

// get Province Cities
type getProvinceCitiesType = {
  name: string;
};

export type getProvinceCitiesDataType = {
  data: getProvinceCitiesType[];
};

// filter Values Type
export type filterValuesType = {
  selectedProvince?: { id: number; name: string } | undefined;
  selectedCity?: string | undefined;
};

// get All RealEstateOffices Type
export type allrealEstateOfficesDataType = {
  name: string;
  username: string;
  city: string;
  main_street: string;
  sub_street: string;
  score: number;
  number_of_active_ads: number;
  number_of_comments: number;
  image_full_path?: string;
  blue_tick: boolean;
};

// get RealEstateOffices Type
export type realEstateOfficesType = {
  data: {
    name: string;
    description: string;
    username: string;
    city: string;
    main_street: string;
    sub_street: string;
    number: string;
    landline_number: string;
    score: number;
    number_of_active_ads: number;
    number_of_comments: number;
    image_full_path?: string;
    site: string;
    linkedin: string;
    telegram: string;
    instagram: string;
    blue_tick: boolean;
    bg_image_full_path?: string;
  };
  status: number;
};

// get AllRealtor Type
export type allRealtorDataType = {
  id: number;
  user__first_name: string;
  user__last_name: string;
  user__image_full_path: string;
  score: number;
  real_estate_office__name: string;
  real_estate_office__username: string;
};

// get RealtorDataType
export type realtorDataType = {
  user__first_name: string;
  user__last_name: string;
  user__image_full_path: string;
  bg_image_full_path: string;
  score: number;
  number_of_active_ads: number;
  description: string;
  number: string;
  landline_number: string;
  real_estate_office__name: string;
  real_estate_office__username: string;
};

// share Data Modal Type
export type shareDataModalType = {
  socialNetwork: {
    telegram?: string;
    whatsapp?: string;
    x?: string;
    facebook?: string;
    email?: string;
  };
};

// contact Info Data Type
export type contactInfoDataType = {
  profileIcon: string | undefined;
  name: string | undefined;
  number: {
    phoneNumber: string | undefined;
    landlineNumber: string | undefined;
  };
};
