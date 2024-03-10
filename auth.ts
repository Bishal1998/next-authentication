import User from "@/models/userModel";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: {
      label: "E-mail",
      type: "email",
      placeholder: "email",
    },
    password: {
      label: "Password",
      type: "password",
      placeholder: "Password",
    },
  },
  async authorize(credentials) {
    if (!credentials.email || !credentials.password) {
      throw new Error("All fields are required");
    }

    const userExists = await User.findOne({ email: credentials.email });

    if (!userExists) {
      throw new Error("User does not exist");
    }

    const passCompare = await bcryptjs.compare(
      credentials.password as string,
      userExists.password
    );

    if (!passCompare) {
      throw new Error("Invalid password");
    }

    if (
      credentials.email === userExists.email &&
      credentials.password === userExists.password
    ) {
      const { password: pass, ...data } = userExists._doc;

      return data;
    } else {
      return null;
    }
  },
});

const config = {
  providers: [credentialsConfig],
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut } = NextAuth(config);
