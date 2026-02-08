import { axiosInstance } from "./apiService";

export const universalFetcher = async (
  url: string,
  headers?: Record<string, string>,
) => {
  const response = await axiosInstance({
    url: url,
    method: "GET",
    headers: headers,
  });
  return response.data;
};
