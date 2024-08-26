import { type NextRequest, NextResponse } from "next/server";
import { getCookie, setCookie } from "cookies-next";
import { Api } from "./ApiService";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const res = NextResponse.next();
  const access = getCookie("access", { res, req });
  const refresh = getCookie("refresh", { res, req });

  if (access === undefined && refresh !== undefined) {
    try {
      const response = await fetch(Api.Refresh, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.access && refresh) {
          setCookie("access", data.access, { res, req, maxAge: data.expire });
        } else {
          return NextResponse.redirect(new URL("/newUser", req.url));
        }
      } else {
        return NextResponse.redirect(new URL("/newUser", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/newUser", req.url));
    }
  }

  const protectedPaths = [
    "/",
    "/proUser",
    "/adPosting",
    "/userProfile/EditingInformation",
    "/userProfile/MyAds",
    "/userProfile/SavedAds",
  ];
  if (protectedPaths.includes(url.pathname) && (!access || !refresh)) {
    return NextResponse.redirect(new URL("/newUser", req.url));
  }

  return res;
}
