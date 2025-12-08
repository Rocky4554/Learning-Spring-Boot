'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-teal-600/20 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
          {/* Hero Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              Modern Healthcare Solutions
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Next-Gen Patient
              <br />
              <span className="gradient-text bg-gradient-to-r from-blue-500 to-teal-400">Management System</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Streamline your practice with secure records, effortless appointment scheduling, and real-time patient analytics.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/login"
              className="btn btn-primary bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-lg px-8 py-4 w-full sm:w-auto min-w-[200px] shadow-lg shadow-blue-500/25"
            >
              Access Portal
            </Link>
            <Link
              href="/signup"
              className="btn bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm text-lg px-8 py-4 w-full sm:w-auto min-w-[200px] border border-white/10"
            >
              New Registration
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 pt-16 text-left">
            <div className="card-glass p-6 rounded-2xl group hover:bg-white/10 transition-colors duration-300">
              <div className="h-12 w-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Records</h3>
              <p className="text-gray-400 text-sm">HIPAA-compliant data storage with end-to-end encryption for all patient history and sensitivity.</p>
            </div>

            <div className="card-glass p-6 rounded-2xl group hover:bg-white/10 transition-colors duration-300">
              <div className="h-12 w-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-4 text-teal-400 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Smart Scheduling</h3>
              <p className="text-gray-400 text-sm">Intelligent appointment booking system that optimizes doctor availability and reduces wait times.</p>
            </div>

            <div className="card-glass p-6 rounded-2xl group hover:bg-white/10 transition-colors duration-300">
              <div className="h-12 w-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Practice Analytics</h3>
              <p className="text-gray-400 text-sm">Comprehensive insights into patient demographics, diagnosis trends, and clinic performance.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
