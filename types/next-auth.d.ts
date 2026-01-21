import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      role?: string;
      isProfileComplete?: boolean;
      experience?: number;
      specializations?: string[];
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    name?: string;
    role?: string;
    isProfileComplete?: boolean;
    experience?: number;
    specializations?: string[];
    image?: string | null;
  }
}
