import { clerkMiddleware } from "@clerk/nextjs/server";

// PUBLIC ROUTES (jahan login required nahi)
export default clerkMiddleware({
  publicRoutes: [
    "/",          // home
    "/login",     // sign-in page
    "/register",  // sign-up page
  ],
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
