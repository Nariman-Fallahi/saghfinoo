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
  email: string;
  code: number | string;
  token: string;
};

export type SignUpDataType = {
  firstName: string;
  lastName: string;
  password: string;
  token: number | string;
  email: string;
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
    firstName: string | undefined;
    lastName: string | undefined;
    number: number | undefined;
    imageFullPath?: string | undefined;
    email: string | null;
    password: string;
    newPassword: string;
  };
};

export type ProvincesType = {
  id: number;
  name: string;
};

export type CitiesType = {
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
  mainStreet: string;
  subStreet: string;
  score: number;
  numberOfActiveAds: number;
  numberOfComments: number;
  imageFullPath?: string;
  blueTick: boolean;
};

export type realEstateOfficesType = {
  name: string;
  description: string;
  username: string;
  city: string;
  mainStreet: string;
  subStreet: string;
  number: string;
  landlineNumber: string;
  score: number;
  numberOfActiveAds: number;
  numberOfComments: number;
  imageFullPath?: string;
  twitter: string;
  whatsapp: string;
  facebook: string;
  telegram: string;
  email: string;
  site: string;
  blueTick: boolean;
  bgImageFullPath?: string;
};

export type allRealtorDataType = {
  id: string;
  user: {
    firstName: string;
    lastName: string;
    imageFullPath: string;
  };
  score: number;
  blueTick: boolean;
  realEstateOffice: {
    name: string;
    username: string;
  };
};

export type RealtorDataType = {
  id: number;
  user: {
    firstName: string;
    lastName: string;
    imageFullPath: string;
  };
  bgImageFullPath: string;
  score: number;
  numberOfActiveAds: number;
  description: string;
  number: string;
  landlineNumber: string;
  telegram: string;
  whatsapp: string;
  twitter: string;
  facebook: string;
  email: string;
  blueTick: boolean;
  realEstateOffice: {
    name: string;
    username: string;
  };
};

export type DataModalREA = {
  profileIcon: string | undefined;
  name: string | undefined;
  number: {
    phoneNumber: string | undefined;
    landlineNumber: string | undefined;
  };
  socialNetwork: {
    twitter: string | undefined;
    whatsapp: string | undefined;
    facebook: string | undefined;
    telegram: string | undefined;
    email: string | undefined;
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
  buy?: number;

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

export type optionType =
  | {
      value: number;
      label: string;
    }[]
  | undefined;

export type AdPostingApi = {
  city: string | undefined;
  province: string | undefined;
  mainStreet: string | undefined;
  sideStreet: string | undefined;
  typeOfTransaction: number | undefined;
  propertyType: number | undefined;
  deposit: number | undefined;
  rent: number | undefined;
  buy: number | undefined;
  convertible: boolean | undefined;
  area: number | undefined;
  room: number | undefined;
  floor: number | undefined;
  numberOfFloors: number | undefined;
  parking: number | undefined;
  restroom: number | undefined;
  typeOfRestroom: number | undefined;
  storage: number | undefined;
  elevator: number | undefined;
  flooring: number | undefined;
  cooling_system: number | undefined;
  heating_system: number | undefined;
  description: string | undefined;
};

export type AdsDataType = {
  id: number;
  imageFullPath: string;
  typeOfTransaction: string;
  propertyType: string;
  area: number;
  city: string;
  mainStreet: string;
  deposit: number;
  rent: number;
  isSaved: boolean;
};

export type CommentType = {
  id: number;
  owner__first_name: string;
  owner__last_name: string;
  owner__image_full_path: string;
  score: number;
  description: string;
  score_reason: string;
};

export type AdsFilterDataType = {
  province?: { value?: string; id?: number };
  city?: string;
  rentalPrice?: { min: number; max: number };
  depositPrice?: { min: number; max: number };
  metre?: { min: number; max: number };
};

export type ScoreReasonsType = {
  id: number;
  name: string;
  score: number;
};

export type ReportModaltDataType = {
  id: number;
  name: string;
};

export type NewsDataType = {
  imageFullPath: string;
  readTime: number;
  title: string;
  shortDescription: string;
  slug: string;
};

export type SuggestedSearchesDataType = {
  id: number;
  name: string;
};

export type FilterDataType = {
  city?: string;
  propertyType?: string;
  rent_from?: string;
  rent_to?: string;
  deposit_from?: string;
  deposit_to?: string;
  //MoreItems
  numberOfBedroom?: string;
  numberOfParking?: string;
  numberOfStorageRoom?: string;
  numberOfElevators?: string;
  numberOfRestrooms?: string;
  typeOfRestroom?: string;
  numberOfFloors?: string;
  coolingSystem?: string;
  heatingSystem?: string;
};
