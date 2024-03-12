import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id: string;
    username: string;
    role: string;
  }
  interface Session {
    user: User & {
      id: string;
      username: string
      role: string
    }
    token: {
      id: string;
      username: string
      role: string
    }
  }
}