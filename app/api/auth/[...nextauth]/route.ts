import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/db";
import Doctor from "@/models/Doctor";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      await connectDB();

      const existing = await Doctor.findOne({ email: user.email });

      if (!existing) {
        await Doctor.create({
          name: user.name,
          email: user.email,
          isProfileComplete: false,
        });
      }

      return true;
    },

    async session({ session }) {
      if (session.user) {
        delete (session.user as any).image;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
