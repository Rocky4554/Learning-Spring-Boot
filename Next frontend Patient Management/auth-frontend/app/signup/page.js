'use client';

import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import { signup } from '@/lib/auth';

export default function SignupPage() {
    const router = useRouter();

    const handleSignup = async (username, password) => {
        const result = await signup(username, password);
        if (result.success) {
            router.push('/home');
        }
        return result;
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-100 via-gray-100 to-gray-50 dark:from-pink-900/20 dark:via-gray-900 dark:to-black">
            <AuthForm type="signup" onSubmit={handleSignup} />
        </main>
    );
}
