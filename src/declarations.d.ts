declare module "*.css";

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      alumn?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    alumn?: boolean;
  }
}
