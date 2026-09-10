import GoogleProvider from "next-auth/providers/google";
import { getAccessForEmail } from "@/helpers/auth/access";

/** @type {import("next-auth").NextAuthOptions} */
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

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
      return Boolean(user?.email && await getAccessForEmail(user.email));
    },

    async jwt({ token, user }) {
      const email = user?.email ?? token.email;

      if (email) {
        const access = await getAccessForEmail(email);
        token.alumn = Boolean(access?.alumn);
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.alumn = Boolean(token.alumn);
      }

      return session;
    },
  },
};
