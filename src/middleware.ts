import withAuth from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized: ({ token }) => { 
      return token?.role === "admin";
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
