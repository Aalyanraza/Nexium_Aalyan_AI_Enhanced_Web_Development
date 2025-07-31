'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Image from "next/image";
import Link from "next/link";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkForMagicLink = async () => {
      if (typeof window === 'undefined') return;

      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');

      if (accessToken && refreshToken) {
        try {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            console.error('Failed to set session:', error.message);
            return;
          }

          // Clear hash to prevent reprocessing on reload
          window.history.replaceState(null, '', window.location.pathname);

          // Redirect to dashboard
          router.push('/dashboard');
        } catch (err) {
          console.error('Error processing magic link:', err);
        }
      }
    };

    checkForMagicLink();
  }, [router]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-25 to-gray-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Resume Tailor Logo"
              width={80}
              height={80}
              className="object-contain"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">Resume Tailor</span>
              <span className="text-xs text-gray-500 -mt-1">AI-Powered Resumes</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <Link 
              href="/login" 
              className="relative px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors group"
            >
              Sign In
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/login" 
              className="relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
            Tailor Your Resume
            <br />
            <span className="text-gray-900">Perfectly</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Create personalized resumes that stand out. Our AI-powered platform helps you craft 
            the perfect resume for every job application, ensuring you get noticed by recruiters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/login" 
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-lg font-semibold"
            >
              Start Creating
            </Link>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:text-gray-900 transition-all duration-200 text-lg font-semibold">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose Resume Tailor?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">AI-Powered Optimization</h3>
              <p className="text-gray-600">
                Our advanced AI analyzes job descriptions and optimizes your resume to match exactly what employers are looking for.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Multiple Templates</h3>
              <p className="text-gray-600">
                Choose from a variety of professional templates designed to impress across different industries and roles.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Instant Results</h3>
              <p className="text-gray-600">
                Get your tailored resume in seconds. No more hours spent tweaking and formatting - focus on what matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have already transformed their careers with Resume Tailor.
          </p>
          <Link 
            href="/login" 
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl text-lg font-semibold"
          >
            Create Your Resume Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RT</span>
              </div>
              <span className="text-xl font-bold">Resume Tailor</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2025 Resume Tailor. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
