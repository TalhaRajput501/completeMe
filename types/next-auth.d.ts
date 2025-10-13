import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    username?: string;
    role?: string;
    storeCategory?: string;
  }


  interface Session {
    user: {
      username?: string;
      role?: string;
      storeCategory?: string;

    } & DefaultSession["user"];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    username?: string;
    role?: string;
    storeCategory?: string;


  }


}