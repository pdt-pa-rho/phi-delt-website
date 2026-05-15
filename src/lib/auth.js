import GoogleProvider from "next-auth/providers/google";
import { isAllowedEmail } from "@/helpers/auth/access";


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async signIn({ user }) {
      if (user?.email && await isAllowedEmail(user.email)) {
        return true;
      }

      return false;
    },

    async session({ session }) {
      return session;
    },
  },
};
