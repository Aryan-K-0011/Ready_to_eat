import React from 'react';
import { useApp } from '../context';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AddOn } from '../types';

export const AddOns = () => {
  const { addToCart, user, addToast, addons } = useApp();
  const navigate = useNavigate();

  const handleAddToCart = (addon: AddOn) => {
    if (!user) {
      addToast('Please login to start your order', 'info');
      navigate('/login');
      return;
    }

    addToCart({ 
      id: addon.id, 
      type: 'addon', 
      name: addon.name, 
      price: addon.price, 
      quantity: 1, 
      image: addon.image 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">Kitchen Essentials & Utensils</h1>
        <p className="text-gray-500 mb-10">Don't have a pan? Or need some extra butter? We've got you covered.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {addons.map((addon) => (
            <div key={addon.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4">
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <img src={addon.image} alt={addon.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex justify-between items-start mb-2">
                 <div>
                    <span className="text-xs font-bold text-brand-green uppercase tracking-wide">{addon.category}</span>
                    <h3 className="font-semibold text-gray-900">{addon.name}</h3>
                 </div>
                 <span className="font-bold text-lg">₹{addon.price}</span>
              </div>
              <button 
                onClick={() => handleAddToCart(addon)}
                className="w-full mt-2 border border-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-brand-black transition flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} /> Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
