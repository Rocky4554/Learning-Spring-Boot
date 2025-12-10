'use client';

import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import { login } from '@/lib/auth';
import { API_ENDPOINTS, apiCall } from '@/lib/api';

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = async (username, password) => {
        const result = await login(username, password);
        if (result.success) {
            // Check if patient profile exists
            try {
                // Using username as email/id for lookup as per API structure
                const patientCheck = await apiCall(API_ENDPOINTS.GET_PATIENT_DETAILS(username), {
                    headers: { 'Authorization': `Bearer ${result.data.jwt}` }
                });

                if (patientCheck.success && patientCheck.data) {
                    router.push('/home');
                } else {
                    router.push('/onboarding');
                }
            } catch (error) {
                console.error("Error checking patient profile:", error);
                // Fallback to onboarding if check fails
                router.push('/onboarding');
            }
        }
        return result;
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100 via-gray-100 to-gray-50 dark:from-purple-900/20 dark:via-gray-900 dark:to-black">
            <AuthForm type="login" onSubmit={handleLogin} />
        </main>
    );
}
