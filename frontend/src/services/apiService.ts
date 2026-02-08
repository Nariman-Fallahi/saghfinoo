import axios from "axios";
import { getCookie } from "cookies-next";

export enum Api {
  // users Api
  SendOTP = "users/send-otp",
  VerifyOTP = "users/verify-otp",
  CompleteSignup = "users/complete-signup",
  ChangePassword = "users/change-password",
  EditUserProfile = "users/edit-user",
  GetUserInfo = "users/user-info",
  UploadProfileImage = "users/upload-profile-image",

  // reos Api
  Reos = "reos",
  CreateReportRealEstate = "reos/report/create/",

  // realtors Api
  Realtors = "realtors",
  GetAllScoreReasons = "realtors/comments/score-reasons",
  GetAllReportReasonsRealtors = "realtors/report/reasons",

  // ads Api
  Ad = "ads",
  GetSelectionData = "ads/choices",
  DeleteAllMyAds = "ads/self-all",
  GetAllMyAds = "ads/self",
  AdsSaved = "ads/saved",

  // tools Api
  GetProvinces_Cities = "tools/provinces",
  SearchCity = "tools/cities",

  // news Api
  News = "news",
}

export enum QueryKeys {
  GET_PROVINCES = "get-provinces",
  GET_CITIES = "get-cities",
  GET_ALL_CITY = "get-all-city",
  GET_SELECTION_DATA = "get-selection-data",
  GET_ADS_SAVED = "get-ads-saved",
  DELETE_ALL_ADS_SAVED = "delete-all-ads-saved",
  GET_ALL_MY_ADS = "get-all-my-ads",
  GET_USER_INFO = "get-user-info",
  GET_ALL_SCORE_REASONS = "get-all-score-reasons",
  GET_REPORT_DATA = "get-report-data",
  CREATE_REPORT = "create-report",
  GET_PROPERTY_TYPE = "get-property-type",
  GET_NEWEST_HOUSE_RENT = "get-newest-house-rent-data",
  GET_REAL_ESTATE_CONSULTANTS = "get-real-estate-consultants",
  GET_REAL_ESTATE_OFFICES = "get-real-estate-offices",
  GET_REAL_ESTATE_OFFICES_TOP = "get-real-estate-offices-top",
  SEARCH_RESULTS = "search-results",
  GET_REAL_ESTATE_ADS = "get-real-estate-ads",
  GET_REAL_ESTATE_COMMENTS = "get-real-estate-comments",
  GET_REALTORS = "get-realtors",
  GET_REALTOR_TOP = "get-realtor-top",
  GET_REALATOR_ADS = "get-realator-ads",
  GET_REALTOR_COMMENTS = "get-realtor-comments",
  GET_NEWS = "get-news",
}

export const baseURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/`;

export const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
