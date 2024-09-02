import { type NextRequest, NextResponse } from "next/server";
import { getCookie, setCookie } from "cookies-next";
import { Api } from "./ApiService";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const res = NextResponse.next();
  const access = getCookie("access", { res, req });
  const refresh = getCookie("refresh", { res, req });
  const pathname = url.pathname;

  const isProtectedPath = (path: string) => {
    const protectedPatterns = [/^\/proUser/, /^\/adPosting/, /^\/userProfile/];

    return protectedPatterns.some((pattern) => pattern.test(path));
  };

  if (access === undefined && refresh !== undefined) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${Api.Refresh}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.access && refresh) {
          setCookie("access", data.access, {
            res,
            req,
            maxAge: data.expire,
            secure: process.env.NODE_ENV === "production",
          });
        }
      } else {
        return NextResponse.redirect(new URL("/newUser", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/newUser", req.url));
    }
  }

  if (pathname === "newUser" && access && refresh) {
    return NextResponse.redirect(new URL("/proUser", req.url));
  }

  if (isProtectedPath(pathname) && (!access || !refresh)) {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  return res;
}
