'use client';

import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import { login } from '@/lib/auth';

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = async (username, password) => {
        const result = await login(username, password);
        if (result.success) {
            router.push('/home');
        }
        return result;
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100 via-gray-100 to-gray-50 dark:from-purple-900/20 dark:via-gray-900 dark:to-black">
            <AuthForm type="login" onSubmit={handleLogin} />
        </main>
    );
}
