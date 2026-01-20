import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/database/db";
import Doctor from "@/lib/models/Doctor";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
        updateAge: 0, // Update session on every request
    },

    jwt: {
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    },

    callbacks: {
        async signIn({ user }) {
            await connectDB();

            const existing = await Doctor.findOne({ email: user.email });

            if (!existing) {
                await Doctor.create({
                    name: user.name,
                    email: user.email,
                    role: "doctor",
                    isProfileComplete: false,
                });
            }

            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                await connectDB();
                const doctor = await Doctor.findOne({ email: user.email });
                if (doctor) {
                    token.id = doctor._id?.toString();
                    token.email = doctor.email;
                    token.name = doctor.name;
                    token.role = doctor.role || "doctor";
                    token.isProfileComplete = doctor.isProfileComplete;
                    token.specializations = doctor.specializations || [];
                    token.experience = doctor.experience || 0;
                }
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.role = token.role;
                session.user.isProfileComplete = token.isProfileComplete;
                (session.user as any).specializations = token.specializations;
                (session.user as any).experience = token.experience;
            }
            return session;
        },

        async redirect({ url, baseUrl }) {
            // After sign in, check if we need to redirect to profile completion
            if (url.startsWith(baseUrl)) {
                return url;
            }
            // Default redirect to base URL (middleware will handle the rest)
            return baseUrl;
        },
    },

    pages: {
        signIn: "/login",
    },

    secret: process.env.NEXTAUTH_SECRET,
    cookies: {
        sessionToken: {
            name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60, // 7 days
            },
        },
    },
});

export { handler as GET, handler as POST };
