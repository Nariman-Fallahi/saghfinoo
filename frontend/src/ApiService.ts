import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { usePostRequestType } from "./types/Type";
import { ErrorNotification } from "@/notification/Error";
import { useGetRequestType } from "./types/Type";
import axios from "axios";

export enum Api {
  // users Api
  verifynumber = "/api/v1/users/verify-number",
  CompleteSignup = "/api/v1/users/complete-signup",
  ChangePassword = "/api/v1/users/change-password",
  EditUserProfile = "/api/v1/users/edit-user",
  Refresh = "/api/v1/users/token/refresh",
  GetUserInfo = "/api/v1/users/get-user-info",
  UploadProfileImage = "/api/v1/users/upload-profile-image",

  // real-estate-offices Api
  GetAllRealEstateOffices = "/api/v1/real-estate-offices/search?page=",
  GetRealEstateOffices = "/api/v1/real-estate-offices/get/",
  GetAllReportReasonsRealEstate = "/api/v1/real-estate-offices/report/get-all-reasons",
  CreateReportRealEstate = "/api/v1/real-estate-offices/report/create",

  // realtors Api
  GetRealEstateConsultants = "/api/v1/realtors/search?reo_username=",
  GetAllRealtor = "/api/v1/realtors/search?page=",
  GetRealtor = "/api/v1/realtors/get/",
  CreateRealtorsComment = "/api/v1/realtors/comment/create/",
  GetRealtorComments = "/api/v1/realtors/comment/get-all/",
  GetAllScoreReasons = "/api/v1/realtors/comment/get-all-score-reasons?",
  GetAllReportReasonsRealtors = "/api/v1/realtors/report/get-all-reasons",
  CreateReportRealtors = "/api/v1/realtors/report/create",

  // advertisements Api
  GetSelectionData = "/api/v1/advertisements/create?key=",
  UploadImageFile = "/api/v1/advertisements/upload-image/",
  DeleteAllMyAds = "/api/v1/advertisements/delete-all-for-realtor",
  AdPosting = "/api/v1/advertisements/create",
  GetAllMyAds = "/api/v1/advertisements/get-all-for-realtor?page=",
  DeleteMyAds = "/api/v1/advertisements/delete/",

  // tools Api
  GetProvinces = "/api/v1/tools/get-provinces",
  GetProvinceCities = "/api/v1/tools/get-province-cities/",
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// PostRequest
export const usePostRequest = <dataType>({
  url,
  key,
  headers,
  method,
}: usePostRequestType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [key],
    mutationFn: async (data: dataType) => {
      const response = await axiosInstance({
        url: url,
        method: method ? method : "POST",
        headers: headers,
        data: data,
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
    onError: () => {
      ErrorNotification("در ارتباط با سرور مشکلی پیش آمد.");
    },
  });
};
// END PostRequest

// GetRequest
export const useGetRequest = <dataType>({
  url,
  key,
  headers,
  enabled,
  staleTime,
}: useGetRequestType) => {
  return useQuery<dataType>({
    queryKey: key,
    queryFn: async () => {
      const response = await axiosInstance({
        url: url,
        method: "GET",
        headers: headers,
      });

      if (response.status !== 200) {
        ErrorNotification("در ارتباط با سرور مشکلی پیش آمد.");
      }

      return response.data;
    },
    staleTime: staleTime,
    enabled: enabled,
  });
};
// END GetRequest
