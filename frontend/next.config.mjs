/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thlearn.storage.iran.liara.space",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "Content-Security-Policy",
  //           value: `
  //             default-src 'self';
  //             script-src 'self' 'unsafe-eval' 'unsafe-inline';
  //             style-src 'self' 'unsafe-inline';
  //             img-src 'self' blob: data:;
  //             font-src 'self' data:;
  //             connect-src 'self' http://127.0.0.1:8000 https://saghfinoo.onrender.com;
  //             object-src 'none';
  //             base-uri 'self';
  //             form-action 'self';
  //             frame-ancestors 'none';
  //             upgrade-insecure-requests;
  //           `.replace(/\n/g, ""),
  //         },
  //         {
  //           key: "Cross-Origin-Opener-Policy",
  //           value: "same-origin",
  //         },
  //         {
  //           key: "X-Frame-Options",
  //           value: "DENY",
  //         },
  //       ],
  //     },
  //   ];
  // },
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === "production",
  // },
};

export default nextConfig;
