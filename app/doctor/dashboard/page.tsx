"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function DoctorDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [clinics, setClinics] = React.useState<any[]>([]);

    React.useEffect(() => {
        if (status === "authenticated") {
            fetch("/api/v1/clinic")
                .then(res => res.ok ? res.json() : null)
                .then(data => data && setClinics(data.clinics))
                .catch(err => console.error("Error fetching clinics:", err));
        }
    }, [status]);

    if (status === "loading") {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-6xl"
            >
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
                        <p className="mt-2 text-gray-600">Welcome back, Dr. {session?.user?.name}!</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="px-4 py-2 rounded-lg bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition-colors"
                    >
                        Sign Out
                    </motion.button>
                </div>

                {/* Login Status Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="mb-6 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 p-6 shadow-lg text-white"
                >
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
                            {session?.user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">✅ You are logged in!</h2>
                            <p className="text-teal-50 text-sm mt-1">
                                Your session is active and secure with JWT authentication
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Profile Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-black/5"
                >
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Your Profile</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Name</p>
                                <p className="text-lg text-gray-900 font-medium">{session?.user?.name}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Email</p>
                                <p className="text-lg text-gray-900 font-medium">{session?.user?.email}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Role</p>
                                <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-800 font-semibold text-sm">
                                    {session?.user?.role || "Doctor"}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Experience</p>
                                <p className="text-lg text-gray-900 font-medium">
                                    {(session?.user as any)?.experience || 0} years
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Specializations</p>
                                <div className="flex flex-wrap gap-2">
                                    {(session?.user as any)?.specializations?.length > 0 ? (
                                        (session?.user as any)?.specializations.map((spec: string, index: number) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-medium text-sm"
                                            >
                                                {spec}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 text-sm">No specializations added</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Profile Status</p>
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                    <span className="text-green-700 font-semibold text-sm">
                                        {session?.user?.isProfileComplete ? "Complete" : "Incomplete"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => router.push("/doctor/profile")}
                            className="px-6 py-3 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors"
                        >
                            Edit Profile
                        </motion.button>
                    </div>
                </motion.div>

                {/* Clinics Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="mt-6 rounded-2xl bg-white p-8 shadow-lg ring-1 ring-black/5"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Registered Clinics</h3>
                        <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 font-bold text-xs">
                            {clinics.length} {clinics.length === 1 ? "Clinic" : "Clinics"}
                        </span>
                    </div>

                    {clinics.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-500 text-sm">No clinics registered. Add one from your profile!</p>
                            <button
                                onClick={() => router.push("/doctor/profile")}
                                className="mt-4 text-teal-600 font-semibold text-sm hover:underline"
                            >
                                Go to Profile →
                            </button>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-4">
                            {clinics.map((clinic) => (
                                <div key={clinic._id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:border-teal-200 transition-all">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-gray-900">{clinic.clinicName}</h4>
                                        <div className="flex items-center gap-1 text-xs font-bold text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded">
                                            ⭐ {clinic.stars || 0}
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">
                                        {clinic.address.street}, {clinic.address.city}
                                    </p>
                                    <div className="flex items-center justify-between mt-3">
                                        <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded uppercase">
                                            {clinic.timing.startTime} - {clinic.timing.endTime}
                                        </span>
                                        <span className="text-[10px] text-gray-500 font-medium">
                                            {clinic.reviewsCount || 0} reviews
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                                        <p className="text-xs text-teal-800 font-bold">₹{clinic.consultationFee}</p>
                                        <p className="text-[10px] text-gray-400">Consultation Fee</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* JWT Token Info */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 rounded-lg bg-blue-50 p-4 border border-blue-200"
                >
                    <h4 className="font-semibold text-blue-900 mb-2">🔐 Authentication Info</h4>
                    <p className="text-sm text-blue-800">
                        Your session is secured with a <strong>JWT token</strong> stored in an <strong>httpOnly cookie</strong> named{" "}
                        <code className="px-2 py-1 bg-blue-100 rounded font-mono text-xs">
                            next-auth.session-token
                        </code>
                        . This cookie is automatically sent with every request and expires in 7 days.
                    </p>
                    <p className="text-sm text-blue-800 mt-2">
                        <strong>Note:</strong> You cannot see this cookie in the browser because it's httpOnly (security feature),
                        but the server can read it on every request to verify your identity.
                    </p>
                </motion.div>
            </motion.div>
        </main>
    );
}
