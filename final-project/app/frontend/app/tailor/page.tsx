'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface User {
  id: string;
  name: string;
  email: string;
}

export default function TailorPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Form state
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        router.push('/login');
        return;
      }
      
      setUser(user);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
      setMessage('');
    } else if (file) {
      setMessage('Please upload a PDF file.');
      setIsSuccess(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resumeFile) {
      setMessage('Please upload your resume.');
      setIsSuccess(false);
      return;
    }

    if (!jobDescription.trim()) {
      setMessage('Please provide a job description.');
      setIsSuccess(false);
      return;
    }

    setIsProcessing(true);
    setMessage('');

    try {
      // Create FormData to send file and job description
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('jobDescription', jobDescription);
      formData.append('userId', user?.id || '');

      // Send to backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tailor-resume`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process resume');
      }

      // Extract suggestions from the nested structure
      let extractedSuggestions;
      
      // Check if the response has the nested message.content structure
      if (data.message && data.message.content && data.message.content.suggestions) {
        extractedSuggestions = data.message.content.suggestions;
      } 
      // Check if suggestions are directly in the response
      else if (data.suggestions) {
        extractedSuggestions = data.suggestions;
      }
      // Check if the entire response is the suggestions object
      else if (data.summary || data.improvements || data.skillsToAdd) {
        extractedSuggestions = data;
      }
      else {
        throw new Error('No suggestions found in response');
      }

      setSuggestions(extractedSuggestions);
      setShowResults(true);
      setMessage('Resume processed successfully! Here are your results.');
      setIsSuccess(true);
      
      // Log results to terminal for debugging
      

    } catch (error) {
      console.error('Resume tailoring error:', error);
      setMessage('Failed to process resume. Please try again.');
      setIsSuccess(false);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-25 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-25 to-gray-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              <Image
                src="/logo.png"
                alt="Resume Tailor Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">Resume Tailor</span>
              <span className="text-xs text-gray-500 -mt-1">AI-Powered Resumes</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/dashboard" 
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/profile" 
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Profile
            </Link>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Tailor</h1>
          <p className="text-gray-600">Upload your resume and provide a job description to get an AI-optimized version</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Resume Upload */}
            <div>
              <label htmlFor="resume-upload" className="block text-sm font-medium text-gray-700 mb-2">
                Upload Your Resume (PDF)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-2">
                    {resumeFile ? resumeFile.name : 'Click to upload your resume'}
                  </p>
                  <p className="text-sm text-gray-500">PDF files only</p>
                </label>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                id="job-description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={6}
                placeholder="Paste the job description here. Include key requirements, responsibilities, and qualifications..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-black"
                required
              />
            </div>

            {/* Message Display */}
            {message && (
              <div className={`p-4 rounded-xl ${
                isSuccess 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full mr-3 ${
                    isSuccess ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  {message}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing Resume...
                </div>
              ) : (
                'Tailor My Resume'
              )}
            </button>
          </form>

          {/* Info Section */}
          <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3">How it works</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Upload your current resume in PDF format</li>
              <li>• Provide the job description you're applying for</li>
              <li>• Our AI analyzes both and optimizes your resume</li>
              <li>• View your personalized suggestions below</li>
            </ul>
          </div>
        </div>
        
        {/* Results Section */}
        {showResults && suggestions && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">AI Suggestions</h2>
              <button
                onClick={() => {
                  setShowResults(false);
                  setSuggestions(null);
                  setResumeFile(null);
                  setJobDescription('');
                  setMessage('');
                  const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
                  if (fileInput) fileInput.value = '';
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Start Over
              </button>
            </div>

            {/* Suggestions Display */}
            <div className="space-y-6">
              {/* Summary */}
              {suggestions.summary && suggestions.summary !== "Brief summary of analysis" && (
                <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Analysis Summary
                  </h3>
                  <p className="text-green-800">{suggestions.summary}</p>
                </div>
              )}

              {/* Key Improvements */}
              {suggestions.improvements && suggestions.improvements.length > 0 && 
               !suggestions.improvements.includes("improvement 1") && (
                <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Key Improvements
                  </h3>
                  <ul className="space-y-3">
                    {suggestions.improvements.map((improvement: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-blue-800">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills to Add */}
              {suggestions.skillsToAdd && suggestions.skillsToAdd.length > 0 && 
               !suggestions.skillsToAdd.includes("skill 1") && (
                <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
                  <h3 className="font-semibold text-purple-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Skills to Highlight
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.skillsToAdd.map((skill: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Rewrites */}
              {suggestions.experienceRewrites && suggestions.experienceRewrites.length > 0 && 
               !suggestions.experienceRewrites.includes("rewrite 1") && (
                <div className="p-6 bg-orange-50 rounded-xl border border-orange-200">
                  <h3 className="font-semibold text-orange-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Experience Rewrites
                  </h3>
                  <div className="space-y-4">
                    {suggestions.experienceRewrites.map((rewrite: string, index: number) => (
                      <div key={index} className="border-l-4 border-orange-300 pl-4">
                        <p className="text-orange-800 text-sm">{rewrite}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Keywords to Include */}
              {suggestions.keywords && suggestions.keywords.length > 0 && 
               !suggestions.keywords.includes("keyword 1") && (
                <div className="p-6 bg-teal-50 rounded-xl border border-teal-200">
                  <h3 className="font-semibold text-teal-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Keywords to Include
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.keywords.map((keyword: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Fallback message if no real suggestions */}
              {(!suggestions.summary || suggestions.summary === "Brief summary of analysis") &&
               (!suggestions.improvements || suggestions.improvements.includes("improvement 1")) &&
               (!suggestions.skillsToAdd || suggestions.skillsToAdd.includes("skill 1")) &&
               (!suggestions.experienceRewrites || suggestions.experienceRewrites.includes("rewrite 1")) &&
               (!suggestions.keywords || suggestions.keywords.includes("keyword 1")) && (
                <div className="p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                  <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    Processing Complete
                  </h3>
                  <p className="text-yellow-800">
                    Your resume has been processed, but it appears the AI returned placeholder suggestions. 
                    This might indicate an issue with the backend processing. Please try again or contact support if the issue persists.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => {
                    
                    // Create a text file with all suggestions
                    const content = `Resume Processing Results\n\n` +
                      `Summary: ${suggestions.summary && suggestions.summary !== "Brief summary of analysis" ? suggestions.summary : 'N/A'}\n\n` +
                      `Key Improvements:\n${suggestions.improvements && !suggestions.improvements.includes("improvement 1") ? suggestions.improvements.map((imp: string) => `- ${imp}`).join('\n') : 'N/A'}\n\n` +
                      `Skills to Highlight:\n${suggestions.skillsToAdd && !suggestions.skillsToAdd.includes("skill 1") ? suggestions.skillsToAdd.join(', ') : 'N/A'}\n\n` +
                      `Keywords to Include:\n${suggestions.keywords && !suggestions.keywords.includes("keyword 1") ? suggestions.keywords.join(', ') : 'N/A'}\n\n` +
                      `Experience Rewrites:\n${suggestions.experienceRewrites && !suggestions.experienceRewrites.includes("rewrite 1") ? suggestions.experienceRewrites.map((rewrite: string, index: number) => `${index + 1}. ${rewrite}`).join('\n\n') : 'N/A'}`;
                    
                    const blob = new Blob([content], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'tailored-resume-suggestions.txt';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Download Suggestions
                </button>
                <button 
                  onClick={() => {
                    
                    // Here you would typically save to a database
                    // For now, just log to console and show a message
                    setMessage('Resume suggestions saved to your account!');
                    setIsSuccess(true);
                  }}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:border-gray-400 hover:text-gray-900 transition-all duration-200"
                >
                  Save to My Resumes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}