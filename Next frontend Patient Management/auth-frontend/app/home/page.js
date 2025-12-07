'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, logout, isAuthenticated } from '@/lib/auth';

export default function HomePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check authentication
        if (!isAuthenticated()) {
            router.push('/login');
            return;
        }

        const userData = getUser();
        if (userData) {
            setUser(userData);
        }
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black p-8">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                {/* Header */}
                <header className="flex justify-between items-center card-glass p-6 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            {user?.username?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                Welcome back, {user?.username}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                User ID: {user?.userId}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="btn btn-secondary text-sm"
                    >
                        Sign Out
                    </button>
                </header>

                {/* Dashboard Content */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="card p-6 space-y-4 hover:shadow-2xl transition-shadow duration-300">
                        <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold">Authentication Status</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            You are successfully authenticated via JWT. Your session is secure and active.
                        </p>
                        <div className="flex items-center gap-2 text-green-500 font-medium text-sm bg-green-50 dark:bg-green-900/10 p-2 rounded-lg w-fit">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            Active Session
                        </div>
                    </div>

                    <div className="card p-6 space-y-4 hover:shadow-2xl transition-shadow duration-300">
                        <div className="h-12 w-12 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold">Quick Actions</h2>
                        <div className="space-y-3">
                            <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between group">
                                <span className="font-medium">View Profile</span>
                                <span className="text-gray-400 group-hover:text-purple-500 transition-colors">→</span>
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between group">
                                <span className="font-medium">Settings</span>
                                <span className="text-gray-400 group-hover:text-purple-500 transition-colors">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
