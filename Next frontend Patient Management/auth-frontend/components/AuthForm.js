'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AuthForm({ type, onSubmit }) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const isLogin = type === 'login';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await onSubmit(formData.username, formData.password);
            if (!result.success) {
                setError(result.error || 'Authentication failed. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md animate-scale-in">
            <div className="card-glass p-8 md:p-10 relative overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold mb-2">
                            <span className="gradient-text">
                                {isLogin ? 'Welcome Back' : 'Create Account'}
                            </span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            {isLogin
                                ? 'Enter your credentials to access your account'
                                : 'Sign up to get started with our platform'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="username">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="input"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="input"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <div className="alert alert-error animate-fade-in text-center text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full shadow-lg shadow-purple-500/25"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                isLogin ? 'Sign In' : 'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="my-6 flex items-center justify-between">
                        <span className="w-1/3 border-b border-gray-300 dark:border-gray-600 lg:w-1/4"></span>
                        <span className="text-xs text-center text-gray-500 dark:text-gray-400 uppercase">Or continue with</span>
                        <span className="w-1/3 border-b border-gray-300 dark:border-gray-600 lg:w-1/4"></span>
                    </div>

                    <button
                        type="button"
                        onClick={() => window.location.href = "http://localhost:8080/oauth2/authorization/google"}
                        className="btn w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center justify-center gap-2 transition-all duration-300"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        {isLogin ? (
                            <p>
                                Don't have an account?{' '}
                                <Link href="/signup" className="link font-semibold">
                                    Sign up now
                                </Link>
                            </p>
                        ) : (
                            <p>
                                Already have an account?{' '}
                                <Link href="/login" className="link font-semibold">
                                    Sign in
                                </Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
