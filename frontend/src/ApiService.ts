import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { usePostRequestType } from "./types/Type";
import { ErrorNotification } from "@/notification/Error";
import { useGetRequestType } from "./types/Type";
import axios from "axios";

export enum Api {
  verifynumber = "http://127.0.0.1:8000/api/v1/users/verify-number",
  CompleteSignup = "http://127.0.0.1:8000/api/v1/users/complete-signup",
  Refresh = "http://127.0.0.1:8000/api/v1/users/token/refresh",
  GetUserInfo = "http://127.0.0.1:8000/api/v1/users/get-user-info",
  GetAllRealEstateOffices = "http://127.0.0.1:8000/api/v1/real-estate-offices/search?page=",
  GetRealEstateOffices = "http://127.0.0.1:8000/api/v1/real-estate-offices/get/",
  GetProvinces = "http://127.0.0.1:8000/api/v1/tools/get-provinces",
  GetProvinceCities = "http://127.0.0.1:8000/api/v1/tools/get-province-cities/",
  GetAllRealtor = "http://127.0.0.1:8000/api/v1/realtors/search?page=",
  GetRealtor = "http://127.0.0.1:8000/api/v1/realtors/get/",
  GetSelectionData = "http://127.0.0.1:8000/api/v1/advertisements/create?key=",
  UploadImageFile = "http://127.0.0.1:8000/api/v1/advertisements/upload-image/",
  AdPosting = "http://127.0.0.1:8000/api/v1/advertisements/create",
  DeleteAllMyAds = "http://127.0.0.1:8000/api/v1/advertisements/delete-all-for-realtor",
  GetAllMyAds = "http://127.0.0.1:8000/api/v1/advertisements/get-all-for-realtor?page=",
  DeleteMyAds = "http://127.0.0.1:8000/api/v1/advertisements/delete/",
  EditUserProfile = "http://127.0.0.1:8000/api/v1/users/edit-user",
  UploadProfileImage = "http://127.0.0.1:8000/api/v1/users/upload-profile-image",
  ChangePassword = "http://127.0.0.1:8000/api/v1/users/change-password",
  CreateRealtorsComment = "http://127.0.0.1:8000/api/v1/realtors/comment/create/",
  GetRealtorComments = "http://127.0.0.1:8000/api/v1/realtors/comment/get-all/",
  GetRealEstateConsultants = "http://127.0.0.1:8000/api/v1/realtors/search?reo_username=",
  GetAllScoreReasons = "http://127.0.0.1:8000/api/v1/realtors/comment/get-all-score-reasons?",
  GetAllReportReasonsRealEstate = "http://127.0.0.1:8000/api/v1/real-estate-offices/report/get-all-reasons",
  GetAllReportReasonsRealtors = "http://127.0.0.1:8000/api/v1/realtors/report/get-all-reasons",
  CreateReportRealtors = "http://127.0.0.1:8000/api/v1/realtors/report/create",
  CreateReportRealEstate = "http://127.0.0.1:8000/api/v1/real-estate-offices/report/create",
}

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
      const response = await axios({
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
      const response = await axios({
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
