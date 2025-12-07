import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-pink-600/20 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
          {/* Hero Content */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Secure Authentication
              <br />
              <span className="gradient-text">Made Simple</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience a modern, secure, and seamless authentication flow integrated with Spring Boot Security and JWT.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/login"
              className="btn btn-primary text-lg px-8 py-4 w-full sm:w-auto min-w-[200px]"
            >
              Get Started
            </Link>
            <Link
              href="/signup"
              className="btn bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm text-lg px-8 py-4 w-full sm:w-auto min-w-[200px] border border-white/10"
            >
              Create Account
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 pt-16 text-left">
            <div className="card-glass p-6 rounded-2xl">
              <div className="h-10 w-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 text-purple-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Secure & Encrypted</h3>
              <p className="text-gray-400 text-sm">Enterprise-grade security using JWT tokens and BCrypt password encryption.</p>
            </div>

            <div className="card-glass p-6 rounded-2xl">
              <div className="h-10 w-10 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4 text-pink-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-400 text-sm">Built on Next.js 14 App Router for optimized performance and SEO.</p>
            </div>

            <div className="card-glass p-6 rounded-2xl">
              <div className="h-10 w-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Modern UI</h3>
              <p className="text-gray-400 text-sm">Beautiful, responsive interface with premium glassmorphism effects.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
