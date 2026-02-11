import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context';
import { ShoppingBag, User as UserIcon, Menu, X, ChefHat, LayoutDashboard, LogOut } from 'lucide-react';
import { ToastContainer } from './Toast';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cart, user, logout, toasts, removeToast } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path ? 'text-brand-green font-semibold' : 'text-gray-600 hover:text-brand-green';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-brand-green p-2 rounded-lg">
                <ChefHat className="text-white w-6 h-6" />
              </div>
              <span className="font-heading font-bold text-xl text-brand-black tracking-tight">Ready To Eat</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={isActive('/')}>Home</Link>
              <Link to="/recipes" className={isActive('/recipes')}>Recipes</Link>
              <Link to="/addons" className={isActive('/addons')}>Add-ons</Link>
              <Link to="/about" className={isActive('/about')}>About</Link>
              <Link to="/contact" className={isActive('/contact')}>Contact</Link>
              {user?.role === 'admin' && (
                 <Link to="/admin" className="text-brand-yellow font-semibold flex items-center gap-1">
                   <LayoutDashboard size={18} /> Admin
                 </Link>
              )}
            </div>

            {/* Right Side Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/cart" className="relative text-gray-600 hover:text-brand-green">
                <ShoppingBag size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-yellow text-brand-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </Link>
              
              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-brand-green font-medium">
                    <UserIcon size={20} />
                    <span>{user.name}</span>
                  </Link>
                   <button onClick={handleLogout} className="text-red-500 hover:text-red-600">
                    <LogOut size={20} />
                   </button>
                </div>
              ) : (
                <Link to="/login" className="bg-brand-green text-white px-5 py-2 rounded-full font-medium hover:bg-green-700 transition">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
               <Link to="/cart" className="relative text-gray-600 mr-4">
                <ShoppingBag size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-yellow text-brand-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-3 px-2 text-base font-medium text-gray-700">Home</Link>
              <Link to="/recipes" onClick={() => setIsMenuOpen(false)} className="block py-3 px-2 text-base font-medium text-gray-700">Recipes</Link>
              <Link to="/addons" onClick={() => setIsMenuOpen(false)} className="block py-3 px-2 text-base font-medium text-gray-700">Add-ons</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block py-3 px-2 text-base font-medium text-gray-700">About</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block py-3 px-2 text-base font-medium text-gray-700">Contact</Link>
               {user?.role === 'admin' && (
                 <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block py-3 px-2 text-base font-medium text-brand-yellow">Admin Dashboard</Link>
              )}
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block py-3 px-2 text-base font-medium text-gray-700">Profile</Link>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left py-3 px-2 text-base font-medium text-red-500">Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-center mt-4 bg-brand-green text-white px-5 py-3 rounded-lg font-medium">
                  Login / Signup
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center gap-2 mb-4">
                <div className="bg-brand-green p-1.5 rounded-lg">
                  <ChefHat className="text-white w-5 h-5" />
                </div>
                <span className="font-heading font-bold text-xl tracking-tight">Ready To Eat</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Cooking made easy. Get fresh ingredients and recipes delivered in 1 hour.
              </p>
            </div>
            
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link to="/about" className="hover:text-white">Team</Link></li>
              </ul>
            </div>

             <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQs</Link></li>
                <li><Link to="/contact" className="hover:text-white">Support</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Contact</h3>
              <p className="text-gray-400 text-sm mb-2">support@readytoeat.com</p>
              <p className="text-gray-400 text-sm">+91 98765 43210</p>
              <div className="mt-4 flex gap-4">
                 {/* Social placeholders */}
                 <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-xs">FB</div>
                 <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-xs">IG</div>
                 <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-xs">TW</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-xs">
            © {new Date().getFullYear()} Ready To Eat. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};