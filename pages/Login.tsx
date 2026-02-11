import React, { useState } from 'react';
import { useApp } from '../context';
import { useNavigate, Link } from 'react-router-dom';
import { ChefHat, Lock } from 'lucide-react';

export const Login = () => {
  const { login, addToast } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Admin Credentials Check
    if (email === 'admin@Readytoeat.com' && password === 'Ready_to_eat') {
      login(email, 'admin');
      navigate('/admin');
    } else if (email) {
      // Default to customer login for any other email (Mock Logic)
      login(email, 'customer');
      navigate('/');
    } else {
      addToast('Please enter a valid email', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
           <div className="bg-brand-green p-3 rounded-xl shadow-lg transform hover:rotate-12 transition duration-300">
             <ChefHat className="text-white w-10 h-10" />
           </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-heading font-bold text-gray-900">Sign in to Ready To Eat</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or <Link to="/signup" className="font-medium text-brand-green hover:text-green-500 hover:underline">create a new account</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-100 sm:rounded-xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  autoComplete="current-password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="Enter your password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={16} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a href="#" className="font-medium text-brand-green hover:text-green-500">Forgot your password?</a>
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-green-100 text-sm font-bold text-white bg-brand-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green transition transform hover:-translate-y-0.5"
              >
                Sign in
              </button>
            </div>
          </form>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400">Secure Login</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};