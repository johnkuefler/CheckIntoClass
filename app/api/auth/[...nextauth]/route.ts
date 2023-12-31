import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) throw new Error("User with that email does not exist");

        // Compare hashed password with the provided password
        const isValid = await bcrypt.compare(
          credentials?.password,
          user.password
        );
        if (!isValid) throw new Error("Incorrect password");

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  secret: process.env.JWT_SECRET, // store this in a .env file
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
