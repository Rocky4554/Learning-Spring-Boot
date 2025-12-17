'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { API_ENDPOINTS, apiCall } from '@/lib/api';

export default function OAuthSuccess() {
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        const handleOAuthSuccess = async () => {
            const token = params.get('token');

            if (token) {
                try {
                    // 1. Store token
                    localStorage.setItem('auth_token', token);

                    // 2. Decode token manually to get username (sub)
                    // JWT structure: header.payload.signature
                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));

                    const payload = JSON.parse(jsonPayload);
                    const username = payload.sub; // 'sub' usually holds the username/email in Spring Security

                    // 3. Store user info
                    const userData = {
                        username: username,
                        // We might not have userId yet, but home page fetches patient by username primarily
                    };
                    localStorage.setItem('auth_user', JSON.stringify(userData));

                    // 4. Check if patient profile exists
                    const patientCheck = await apiCall(API_ENDPOINTS.GET_PATIENT_DETAILS(username), {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    if (patientCheck.success && patientCheck.data) {
                        router.push('/home');
                    } else {
                        // Profile not found or error, send to onboarding
                        router.push('/onboarding');
                    }

                } catch (error) {
                    console.error("OAuth Success processing error:", error);
                    router.push('/login?error=oauth_processing_failed');
                }
            } else {
                router.push('/login?error=oauth_failed');
            }
        };

        handleOAuthSuccess();
    }, [params, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-lg text-gray-600 dark:text-gray-300">Logging you in...</p>
            </div>
        </div>
    );
}
