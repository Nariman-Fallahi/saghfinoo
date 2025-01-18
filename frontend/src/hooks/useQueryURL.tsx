import { baseURL } from "@/ApiService";
import { useSearchParams } from "next/navigation";

export const useQueryURL = (
  apiURL: string,
  customQueries?: { [key: string]: string }
) => {
  const searchParams = useSearchParams();

  const queryObject: { [key: string]: string } = { ...customQueries };

  searchParams.forEach((value, key) => {
    queryObject[key] = value;
  });

  const url = new URL(apiURL, baseURL);

  Object.entries(queryObject).forEach(([key, value]) => {
    url.searchParams.append(key, value || "");
  });

  return url.toString();
};
