import React from 'react';
import { AuthCard } from './components/AuthCard';
import { Users, Globe, Share2 } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 md:p-8">
      
      {/* Main Container - Split Layout on Desktop */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 md:gap-16">
        
        {/* Left Side: Branding & Value Prop */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-bold text-blue-600 tracking-tighter drop-shadow-sm">
              SocialConnect
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-800 font-medium leading-tight">
              Connect with friends and the world around you on SocialConnect.
            </h2>
          </div>

          {/* Features List (Visual enhancement) */}
          <div className="hidden md:flex flex-col gap-4 mt-8 text-gray-600">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-full shadow-sm text-blue-500">
                <Users size={24} />
              </div>
              <span className="text-lg">See photos and updates from friends.</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-full shadow-sm text-blue-500">
                <Share2 size={24} />
              </div>
              <span className="text-lg">Share what's new in your life.</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-full shadow-sm text-blue-500">
                <Globe size={24} />
              </div>
              <span className="text-lg">Find more of what you're looking for.</span>
            </div>
          </div>
        </div>

        {/* Right Side: Authentication Form */}
        <div className="w-full md:w-auto flex flex-col items-center">
          <AuthCard />
          
          <div className="mt-6 text-sm text-gray-600">
            <p>
              <span className="font-bold hover:underline cursor-pointer">Create a Page</span> for a celebrity, brand or business.
            </p>
          </div>
        </div>

      </div>

      {/* Footer (Imitating standard footer) */}
      <footer className="mt-auto w-full max-w-6xl pt-10 pb-4 text-xs text-gray-500 text-center md:text-left">
        <div className="border-t border-gray-300 pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
          <span>English (UK)</span>
          <span>Tiếng Việt</span>
          <span>Français (France)</span>
          <span>中文(简体)</span>
          <span>Español</span>
          <span>Português (Brasil)</span>
        </div>
        <div className="border-t border-gray-300 mt-4 pt-4">
           <p>© 2024 SocialConnect. All rights reserved. This is a demo template.</p>
        </div>
      </footer>

    </div>
  );
}