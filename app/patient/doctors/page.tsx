"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Stethoscope, Phone } from "lucide-react";

export default function FindDoctorsPage() {
    const [doctors, setDoctors] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch("/api/doctor/list")
            .then(res => res.json())
            .then(data => {
                if (data.doctors) setDoctors(data.doctors);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const handleBook = (clinicId: string) => {
        // Navigate to queue join page
        window.location.href = `/patient/queue/${clinicId}`;
    };

    return (
        <main className="min-h-screen bg-[#FDFDFF] p-6 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Find Doctors</h1>
                    <p className="text-gray-500 mt-1">Connect with top specialists for your health needs</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <p className="text-center col-span-3 text-gray-500">Loading doctors...</p>
                    ) : doctors.length === 0 ? (
                        <p className="text-center col-span-3 text-gray-500">No active doctors found.</p>
                    ) : doctors.map((doctor) => (
                        <motion.div
                            key={doctor.id}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 ring-1 ring-gray-100"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl font-black text-blue-600">
                                    {doctor.image}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{doctor.name}</h3>
                                    <p className="text-sm text-blue-600 font-medium">{doctor.specialty}</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Stethoscope className="h-4 w-4 text-gray-400" />
                                    <span>{doctor.clinic}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    <span>{doctor.location || `${doctor.address?.city}, ${doctor.address?.state}`}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Star className="h-4 w-4 text-yellow-400" />
                                    <span className="font-bold text-gray-900">{doctor.rating}</span>
                                    <span className="text-xs">({doctor.reviews} reviews)</span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleBook(doctor.id)}
                                className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors"
                            >
                                Join Queue
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
