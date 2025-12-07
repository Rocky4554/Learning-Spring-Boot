'use client';

import Link from 'next/link';

export default function ErrorPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-4">
            <div className="card max-w-md w-full p-8 text-center space-y-6 animate-scale-in">
                <div className="mx-auto h-20 w-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                    <svg className="h-10 w-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Authentication Error
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        We encountered an issue verifying your credentials. Please try signing in again.
                    </p>
                </div>

                <div className="pt-4">
                    <Link href="/login" className="btn btn-primary w-full">
                        Return to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
