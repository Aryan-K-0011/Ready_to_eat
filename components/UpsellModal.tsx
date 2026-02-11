import React, { useState } from 'react';
import { Recipe } from '../types';
import { X, Check } from 'lucide-react';
import { useApp } from '../context';
import { useNavigate } from 'react-router-dom';

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
}

export const UpsellModal: React.FC<UpsellModalProps> = ({ isOpen, onClose, recipe }) => {
  const { addToCart, user, addToast, addons } = useApp();
  const navigate = useNavigate();
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  if (!isOpen || !recipe) return null;

  // Suggest a mix of essentials and utensils
  const suggestedAddons = addons.slice(0, 4); // Just take the first 4 for simplicity in this demo

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    if (!user) {
      addToast('Please login to start your order', 'info');
      onClose();
      navigate('/login');
      return;
    }

    // Add the main recipe
    addToCart({
      id: recipe.id,
      type: 'recipe',
      name: recipe.title,
      price: recipe.price,
      quantity: 1,
      image: recipe.image
    });

    // Add selected addons
    selectedAddons.forEach(addonId => {
      const addon = addons.find(a => a.id === addonId);
      if (addon) {
        addToCart({
          id: addon.id,
          type: 'addon',
          name: addon.name,
          price: addon.price,
          quantity: 1,
          image: addon.image
        });
      }
    });

    onClose();
    setSelectedAddons([]);
  };

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = addons.find(a => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const finalPrice = recipe.price + addonsTotal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="font-heading font-bold text-lg text-gray-900">Complete Your Kit</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="flex items-center gap-4 mb-6 p-4 bg-green-50 rounded-xl border border-green-100">
             <img src={recipe.image} alt={recipe.title} className="w-16 h-16 rounded-lg object-cover" />
             <div>
               <h3 className="font-bold text-gray-900">{recipe.title}</h3>
               <p className="text-sm text-gray-600">Base Kit Price: <span className="font-bold text-brand-green">₹{recipe.price}</span></p>
             </div>
          </div>

          <h3 className="font-semibold text-gray-900 mb-3">Add Essentials & Utensils?</h3>
          <p className="text-sm text-gray-500 mb-4">Don't miss out on these commonly bought items.</p>
          
          <div className="space-y-3">
            {suggestedAddons.map(addon => (
              <div 
                key={addon.id} 
                onClick={() => toggleAddon(addon.id)}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  selectedAddons.includes(addon.id) 
                    ? 'border-brand-green bg-green-50 ring-1 ring-brand-green' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                   selectedAddons.includes(addon.id) ? 'bg-brand-green border-brand-green text-white' : 'border-gray-300'
                }`}>
                  {selectedAddons.includes(addon.id) && <Check size={12} />}
                </div>
                <img src={addon.image} alt={addon.name} className="w-10 h-10 rounded object-cover bg-gray-100" />
                <div className="flex-1">
                  <div className="flex justify-between">
                     <span className="font-medium text-gray-900 text-sm">{addon.name}</span>
                     <span className="font-bold text-gray-900 text-sm">₹{addon.price}</span>
                  </div>
                  <span className="text-xs text-gray-500 uppercase">{addon.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
             <span className="text-gray-600">Total Amount</span>
             <span className="font-heading font-bold text-2xl text-brand-green">₹{finalPrice}</span>
          </div>
          <button 
            onClick={handleAddToCart}
            className="w-full bg-brand-black text-white py-3.5 rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-lg"
          >
            Add to Cart {selectedAddons.length > 0 ? `(${selectedAddons.length + 1} Items)` : ''}
          </button>
        </div>
      </div>
    </div>
  );
};
