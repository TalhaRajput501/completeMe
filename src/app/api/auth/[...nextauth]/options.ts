import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcrypt";
import { User as UserModel } from "@/models/user.model"; 

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "admin-login",
      name: "Admin Login",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        // connect the database bro  
        // right now i decided to sleep but i will work hard to become a billionaire and i will be inshallah yes i will be    
        await dbConnect();

        console.log("this is the data coming from frontend ", credentials);
        try {
          const user = await UserModel.findOne({ username: credentials?.username });

          if (!user) {
            console.log("user not found");
            // throw new Error("User not found");
            return null;
          }

          const isMatched = credentials?.password
            ? await bcrypt.compare(credentials?.password, user.password)
            : false;

          if (!isMatched) {
            console.log("password is incorrect");
            // throw new Error("Password is incorrect");
            return null;
          }

          // ok so everything good at this point now return the user
          return user;
        } catch (error) {
          console.log("Error in authorize:", error);
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.username = user.username;
        token.role = user.role;
        token.storeCategory = user.storeCategory
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.storeCategory = token.storeCategory;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET,
};
