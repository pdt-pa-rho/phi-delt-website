import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

// Placeholder: update this list with allowed emails
const ALLOWED_EMAILS = [
  "rohanjai@andrew.cmu.edu",
  "rsarabu@andrew.cmu.edu",
  "aayushba@andrew.cmu.edu",
  "asangava@andrew.cmu.edu",
  "mschaef2@andrew.cmu.edu",
  "alexxu@andrew.cmu.edu",
  "rdube@andrew.cmu.edu",
  "ervins@andrew.cmu.edu",
  "maesparz@andrew.cmu.edu",
  "jackshah@andrew.cmu.edu",
  "jolschwa@andrew.cmu.edu",
  "domelia@andrew.cmu.edu",
  "smfisher@andrew.cmu.edu",
  "arjunvas@andrew.cmu.edu",
  "lpenaloz@andrew.cmu.edu",
  "sphart@andrew.cmu.edu",
  "gpacell2@andrew.cmu.edu",
  "siddhanc@andrew.cmu.edu",
  "troym@andrew.cmu.edu",
  "prakashs@andrew.cmu.edu",
  "sdelueque@andrew.cmu.edu",
  "jasonmok@andrew.cmu.edu",
  "austina@andrew.cmu.edu",
  "fwaag@andrew.cmu.edu",
  "mgershe2@andrew.cmu.edu",
  "junyounb@andrew.cmu.edu",
  "seanx@andrew.cmu.edu"
];

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signIn({ user, account, profile }) {
      if (user?.email && ALLOWED_EMAILS.includes(user.email)) {
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
