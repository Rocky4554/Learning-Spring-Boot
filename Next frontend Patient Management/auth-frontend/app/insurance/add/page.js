'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { API_ENDPOINTS, apiCall } from '@/lib/api';
import { getToken } from '@/lib/auth';

export default function AddInsurancePage() {
    const router = useRouter();
    const { data: patient, status: patientStatus } = useSelector((state) => state.patient);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        policyNumber: '',
        provider: '',
        validUntill: '' // Note: Double 'l' as per requirement
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!patient?.id) {
            setError('Patient information not found. Please try refreshing or go back home.');
            setLoading(false);
            return;
        }

        try {
            const token = getToken();
            if (!token) {
                router.push('/login');
                return;
            }

            console.log("Submitting Insurance for Patient ID:", patient.id);
            console.log("Payload:", formData);

            const result = await apiCall(API_ENDPOINTS.ADD_INSURANCE(patient.id), {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (result.success) {
                console.log("Insurance added success:", result.data);
                router.push('/home'); // Redirect to home on success
            } else {
                setError(result.error || 'Failed to add insurance');
            }
        } catch (err) {
            console.error('Submit error:', err);
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    // If patient data is loading or missing (redirect to home or show loader)
    if (patientStatus === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black p-4 flex items-center justify-center">
            <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-800">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">
                        Add Insurance
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">Enter insurance details for {patient?.name || 'Patient'}</p>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Policy Number
                        </label>
                        <input
                            type="text"
                            name="policyNumber"
                            required
                            placeholder="e.g., NI-2025-78945"
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 text-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            value={formData.policyNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Provider
                        </label>
                        <input
                            type="text"
                            name="provider"
                            required
                            placeholder="e.g., National Insurance Company"
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 text-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            value={formData.provider}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Valid Until
                        </label>
                        <input
                            type="date"
                            name="validUntill"
                            required
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 text-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            value={formData.validUntill}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transform transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Adding...' : 'Add Insurance'}
                    </button>

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="w-full py-2 px-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium transition-colors"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}
