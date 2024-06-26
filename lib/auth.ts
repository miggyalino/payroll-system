import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from "@/prisma/client";

function areStringsEqual(str1: string, str2: string): boolean {
  return str1 === str2;
}

export const authOptions : NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
    session: {
      strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            // Add logic here to look up the user from the credentials supplied
            if(!credentials?.username || !credentials?.password) {
              return null
            }
      
            const existingUser = await prisma.user.findUnique({
              where: { username: credentials?.username}
            });

            if(!existingUser){
              return null;
            }

            const passwordMatch = await areStringsEqual(credentials.password, existingUser.password);

            if(!passwordMatch){
              return null;
            }

            return {
              id: `${existingUser.id}`,
              username: existingUser.username,
              role: existingUser.role
            }

          }
        })
      ],
      callbacks: {
        async jwt({ token, user }) {
          if(user){
            return{
              ...token,
              id: user.id,
              username: user.username,
              role: user.role
            }
          }
          return token
        },
        async session ({ session, user, token }) {
          return {
            ...session,
            user: {
              ...session.user,
              id: token.id,
              username: token.username,
              role: token.role
            }
          }
          return session
        }
      }
}