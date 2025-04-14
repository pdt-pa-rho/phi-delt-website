import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

// Placeholder: update this list with allowed emails
const ALLOWED_EMAILS = [
  "rohanjai@andrew.cmu.edu",
  "allowed2@example.com",
];

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only allow users whose emails are in the allowed list
      if (user?.email && ALLOWED_EMAILS.includes(user.email)) {
        return true;
      }
      return false;
    },
    async session({ session, token, user }) {
      // Expose email in session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
