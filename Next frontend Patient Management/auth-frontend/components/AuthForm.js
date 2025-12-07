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
