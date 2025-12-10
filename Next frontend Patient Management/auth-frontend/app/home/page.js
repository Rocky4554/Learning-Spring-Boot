'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, logout, isAuthenticated, getToken } from '@/lib/auth';
import { API_ENDPOINTS, apiCall } from '@/lib/api';
// import PatientList from '@/components/PatientList'; // Assuming we still might want this, or replace with single patient view

export default function HomePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check authentication
        if (!isAuthenticated()) {
            router.push('/login');
            return;
        }

        const userData = getUser();

        console.log("FULL USER DATA:", userData);
        console.log("USER ID (sub):", userData?.username);

        if (userData) {
            setUser(userData);
            fetchPatientDetails(userData.username); // Fetching by username as requested
        } else {
            setLoading(false);
        }
    }, [router]);

    const fetchPatientDetails = async (username) => {
        try {
            const token = getToken();
            // Adjust endpoint logic: typically GET /api/patients/{id} or /api/patients/me
            // Using the user-specified GET http://localhost:8080/api/patient/{username}
            const result = await apiCall(API_ENDPOINTS.GET_PATIENT_DETAILS(username), {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (result.success) {
                setPatient(result.data);
            } else {
                // If 404, maybe redirect to onboarding? Leaving as is for dashboard logic
                console.log('Patient not found, maybe redirect to onboarding?');
            }
        } catch (error) {
            console.error('Failed to fetch patient', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            {user?.username?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                Welcome, {user?.username || 'User'}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Patient ID: {patient?.id || user?.userId} • {patient?.bloodGroup || 'N/A'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                        <button
                            onClick={handleLogout}
                            className="btn btn-secondary text-sm py-2 px-4"
                        >
                            Sign Out
                        </button>
                    </div>
                </header>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Main Content - Patient Details & Stats */}
                    <div className="lg:col-span-3 space-y-6">

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="card p-6 border-l-4 border-blue-500">
                                <h3 className="text-gray-500 text-sm font-medium">Next Appointment</h3>
                                <p className="text-xl font-bold mt-1 text-gray-900 dark:text-white">Oct 24, 10:00 AM</p>
                                <p className="text-xs text-blue-500 mt-1">Dr. Smith - Cardiology</p>
                            </div>
                            <div className="card p-6 border-l-4 border-teal-500">
                                <h3 className="text-gray-500 text-sm font-medium">Latest Vitals</h3>
                                <p className="text-xl font-bold mt-1 text-gray-900 dark:text-white">120/80 mmHg</p>
                                <p className="text-xs text-teal-500 mt-1">Normal Range</p>
                            </div>
                            <div className="card p-6 border-l-4 border-purple-500">
                                <h3 className="text-gray-500 text-sm font-medium">Insurance Status</h3>
                                <p className="text-xl font-bold mt-1 text-gray-900 dark:text-white">Active</p>
                                <p className="text-xs text-purple-500 mt-1">Valid till Dec 2025</p>
                            </div>
                        </div>

                        {/* Patient Info Card */}
                        {patient && (
                            <div className="card p-6">
                                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Personal Information</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Full Name</label>
                                        <p className="font-medium">{patient.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Email</label>
                                        <p className="font-medium">{patient.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Date of Birth</label>
                                        <p className="font-medium">{patient.dateofBirth}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Gender</label>
                                        <p className="font-medium">{patient.gender}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar - Quick Actions */}
                    <div className="space-y-6">
                        <div className="card p-6">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full group btn bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white justify-between shadow-lg shadow-blue-500/20">
                                    <span>Book Appointment</span>
                                    <svg className="w-5 h-5 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </button>
                                <button className="w-full group btn btn-secondary justify-between hover:text-blue-600 transition-colors border border-gray-100 dark:border-gray-800">
                                    <span>Add Insurance</span>
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </button>
                                <button className="w-full group btn btn-secondary justify-between hover:text-blue-600 transition-colors border border-gray-100 dark:border-gray-800">
                                    <span>Find a Doctor</span>
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </button>
                                <button className="w-full group btn btn-secondary justify-between hover:text-blue-600 transition-colors border border-gray-100 dark:border-gray-800">
                                    <span>My Profile</span>
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                </button>
                            </div>
                        </div>

                        <div className="card p-6 bg-gradient-to-br from-teal-500 to-emerald-600 text-white border-none">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold">Health Tip</h3>
                                <span className="bg-white/20 text-xs px-2 py-1 rounded">Daily</span>
                            </div>
                            <p className="text-sm text-teal-50 leading-relaxed">
                                "Stay hydrated! Drinking enough water can help maintain your blood pressure and energy levels."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
