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
        email: { label: "email", type: "text" }, 
        password: { label: "password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        // connect the database bro     
        await dbConnect();

        console.log("Credentials ", credentials);
        try {
          if(!credentials?.username || !credentials?.password){
            console.log("Username or password not provided");
            return null;
          }
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
            console.log("Password is incorrect");
            throw new Error("Password is incorrect");
            // return null;
          }

          // ok so everything good at this point now return the user
          return user;
        } catch (error) {
          console.log("Error in authorize:", error);
          return null
        }
      }
    }),
  ],
  callbacks: {
    async redirect({url, baseUrl}){
      // console.log("Redirecting to ", url, " from baseUrl ", baseUrl); 
      if(url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      else return baseUrl
    },
    // it will store data in token
    async jwt({ user, token }) {
      if (user) {
        token.username = user.username;
        token.role = user.role;
        token.storeCategory = user.storeCategory
        token.email = user.email;
      }
      return token;
    },
    // it will read that data from token and expose in session like useSession() or getServerSession()
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.storeCategory = token.storeCategory;
        session.user.email = token.email;
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
