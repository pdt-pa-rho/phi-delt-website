import GoogleProvider from "next-auth/providers/google";
import { isAllowedAndrewID } from "@/helpers/auth/andrewIDs";


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signIn({ user, account, profile }) {
      if (user?.email && await isAllowedAndrewID(user.email.split("@")[0])) {
        return true;
      }
      return false;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async session({ session, token, user }) {
      // Expose email in session
      return session;
    },
  },
};
