'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, getToken } from '@/lib/auth';
import { API_ENDPOINTS, apiCall } from '@/lib/api';

export default function OnboardingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dateofBirth: '',
        gender: 'Male',
        bloodGroup: 'O+',
        location: '',
    });

    // ⚠️ Final fix: Hard reset the form on mount
    useEffect(() => {
        console.log("User from localStorage:", getUser());

        setFormData({
            name: '',
            email: '',
            dateofBirth: '',
            gender: 'Male',
            bloodGroup: 'O+',
            location: '',
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = getToken();
            if (!token) throw new Error('Not authenticated');

            // Validation
            if (!formData.name || !formData.email || !formData.dateofBirth || !formData.location || formData.location.trim() === '') {
                throw new Error('All fields are required, including Location');
            }

            const payload = { ...formData };

            console.log('Sending onboarding data to backend:', payload);
            console.log('Explicitly checking City field:', payload.city);

            // Check for empty city
            if (!payload.city || payload.city.trim() === '') {
                console.warn("WARNING: City/Location field is empty!");
            }

            const result = await apiCall(API_ENDPOINTS.CREATE_PATIENT, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (result.success) {
                console.log('Onboarding success:', result);
                router.push('/home');
            } else {
                setError(result.message || 'Failed to create patient profile');
            }
        } catch (err) {
            console.error('Onboarding error:', err);
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-black">
            <div className="card max-w-2xl w-full p-8 animate-scale-in">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">
                        Complete Your Profile
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Please provide your details to finish setting up your patient account.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">

                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input"
                                required
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input"
                                required
                                placeholder="email@example.com"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Date of Birth</label>
                            <input
                                name="dateofBirth"
                                type="date"
                                value={formData.dateofBirth}
                                onChange={handleChange}
                                className="input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="input"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Blood Group</label>
                            <select
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleChange}
                                className="input"
                            >
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Location</label>
                            <input
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="input"
                                required
                                placeholder="Enter your city/location"
                            />
                        </div>

                    </div>

                    {error && (
                        <div className="alert alert-error text-center text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full text-lg shadow-lg shadow-blue-500/20"
                    >
                        {loading ? 'Saving Profile...' : 'Complete Registration'}
                    </button>
                </form>
            </div>
        </div>
    );
}
