import React from 'react';
import { useApp } from '../context';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useApp();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <ShoppingBag size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added any recipe kits yet. Start cooking by exploring our menu.</p>
        <Link to="/recipes" className="bg-brand-green text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition">
          Browse Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-8">Your Cart ({cart.length})</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg bg-gray-100" />
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                     <div>
                       <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                       <p className="text-sm text-gray-500 capitalize">{item.type} Kit</p>
                     </div>
                     <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 p-1">
                       <Trash2 size={18} />
                     </button>
                  </div>
                  
                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)} 
                        className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-black"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-semibold text-sm w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)} 
                        className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-black"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-bold text-lg text-gray-900">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
            
            <Link to="/addons" className="block mt-6 text-center bg-white border border-dashed border-gray-300 p-4 rounded-xl text-gray-600 font-medium hover:border-brand-green hover:text-brand-green transition">
              + Add Utensils or Extra Ingredients
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="font-heading font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Item Total</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes & Charges</span>
                  <span>₹49</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">To Pay</span>
                  <span className="font-heading font-bold text-2xl text-brand-green">₹{total + 49}</span>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-brand-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
