import { type NextRequest, NextResponse } from "next/server";
import { getCookie, setCookie } from "cookies-next";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const res = NextResponse.next();
  const accessToken = getCookie("accessToken", { res, req });
  const refreshToken = getCookie("refreshToken", { res, req });
  const pathname = url.pathname;

  const isProtectedPath = (path: string) => {
    // const protectedPatterns = [
    //   /^\/pro-user/,
    //   /^\/create-ad/,
    //   /^\/user-profile/,
    // ];

    const protectedPatterns = [
      /^\/pro-user5555/,
    ];

    return protectedPatterns.some((pattern) => pattern.test(path));
  };

  if (accessToken === undefined && refreshToken !== undefined) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/token/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        },
      );
      if (response.ok) {
        const data = await response.json();
        if (data.access && refreshToken) {
          setCookie("accessToken", data.access, {
            res,
            req,
            maxAge: data.expire,
            secure: process.env.NODE_ENV === "production",
          });
        }
      } else {
        return NextResponse.redirect(new URL("/new-user", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/new-user", req.url));
    }
  }

  if (pathname === "newUser" && accessToken) {
    return NextResponse.redirect(new URL("/home/pro-user", req.url));
  }

  if (isProtectedPath(pathname) && !accessToken) {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  return res;
}
