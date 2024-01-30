import UserModel from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextAuthOptions, RequestInternal } from "next-auth";
import NextAuth from "next-auth/next";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        await connectToDB();

        // User not found:
        const user = await UserModel.findOne({ email });
        if (!user) {
          throw Error("email/password are wrong");
        }

        // Password is incorrect:
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
          throw Error("email/password are wrong");
        }

        return {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt(params: any) {
      if (params.user?.role) {
        params.token.role = params.user.role;
        params.token.id = params.user.id;
      }
      return params.token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { role: string }).role = token.role as string;
      }
      return session;
    },
  },
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
