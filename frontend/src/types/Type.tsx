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

type contact = {
  image: string;
  url: string;
};

export type DevelopersType = {
  fullName: string;
  role: string;
  contact: contact[];
}[];

export type usePostRequestType = {
  url: string;
  key: string;
  headers?: Record<string, string>;
  method?: "POST" | "DELETE" | "PUT";
};

export type LoginDataType = {
  number: number | undefined;
  code: number | string;
  token: string;
};

export type SignUpDataType = {
  first_name: string;
  last_name: string;
  password: string;
  token: number | string;
  number: number | undefined;
};

export type editUserProfileType = {
  first_name: string;
  last_name: string;
};

export type changePasswordType = {
  new_password: string;
  current_password: string;
};

export type useGetRequestType = {
  url: string;
  key: string[];
  headers?: Record<string, string>;
  enabled: boolean;
  staleTime: number;
};

export type userInfoDataType = {
  data: {
    first_name: string | undefined;
    last_name: string | undefined;
    number: number | undefined;
    image_full_path?: string | undefined;
    email: string | undefined;
    password: string;
    newPassword: string;
  };
};

export type getProvincesType = {
  id: number;
  name: string;
};

export type getProvinceCitiesType = {
  name: string;
};

export type filterValuesType = {
  selectedProvince?: { id?: number; name?: string } | undefined;
  selectedCity?: string | undefined;
};

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

export type allRealtorDataType = {
  id: number;
  user__first_name: string;
  user__last_name: string;
  user__image_full_path: string;
  score: number;
  real_estate_office__name: string;
  real_estate_office__username: string;
};

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

export type DataModalREA = {
  profileIcon: string | undefined;
  name: string | undefined;
  number: {
    phoneNumber: string | undefined;
    landlineNumber: string | undefined;
  };
  socialNetwork: {
    telegram?: string;
    whatsapp?: string;
    x?: string;
    facebook?: string;
    email?: string;
  };
};

// Ad Posting Form Data Type
export type AdPostingFormDataType = {
  // LocationDetails
  province?: string;
  city?: string;
  mainSt?: string;
  sideStreet?: string;

  // DealType
  typeOfTransaction?: number;
  propertyType?: number;
  deposit?: number;
  rent?: number;

  // Specifications
  area?: number;
  room?: number;
  floor?: number;
  numberFloors?: number;

  // Amenities
  parking?: number;
  storage?: number;
  elevator?: number;
  flooring?: number;
  restroom?: number;
  typeOfRestroom?: number;
  coolingSystem?: number;
  heatingSystem?: number;

  // AdditionalInformation
  description?: string;
};

export type SelectionDataType = {
  value: string;
  id: number;
  key: string;
};

export type optionAdFormType =
  | {
      value: number;
      label: string;
    }[]
  | undefined;

export type AdPostingApi = {
  city: string | undefined;
  province: string | undefined;
  main_street: string | undefined;
  side_street: string | undefined;
  type_of_transaction: number | undefined;
  property_type: number | undefined;
  deposit: number | undefined;
  rent: number | undefined;
  convertible: boolean | undefined;
  area: number | undefined;
  room: number | undefined;
  floor: number | undefined;
  number_of_floors: number | undefined;
  parking: number | undefined;
  restroom: number | undefined;
  type_of_restroom: number | undefined;
  storage: number | undefined;
  elevator: number | undefined;
  flooring: number | undefined;
  cooling_system: number | undefined;
  heating_system: number | undefined;
  description: string | undefined;
};

export type MyAdsDataType = {
  id: number;
  image_full_path: string;
  type_of_transaction__value: string;
  property_type__value: string;
  area: number;
  city: string;
  main_street: string;
  deposit: number;
  rent: number;
  is_confirmed: boolean;
};

export type CommentType = {
  id: number;
  owner__first_name: string;
  owner__last_name: string;
  owner__image_full_path: string;
  score: number;
  description: string;
};
