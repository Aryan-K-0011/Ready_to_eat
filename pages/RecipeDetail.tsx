import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context';
import { Clock, Users, BarChart, ShoppingBag, ArrowLeft, Star, PlayCircle, Check } from 'lucide-react';

export const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, user, addToast, recipes, addons } = useApp();
  const recipe = recipes.find((r) => r.id === id);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Suggest first 3 addons for sidebar
  const recommendedAddons = addons.slice(0, 3);

  if (!recipe) {
    return <div className="text-center py-20">Recipe not found</div>;
  }

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    if (!user) {
      addToast('Please login to start your order', 'info');
      navigate('/login');
      return;
    }

    // Add base recipe
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
       if(addon) {
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

    navigate('/cart');
  };

  const addonsPrice = selectedAddons.reduce((sum, id) => {
    const item = addons.find(a => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const totalPrice = recipe.price + addonsPrice;

  return (
    <div className="bg-white min-h-screen pb-12">
      <div className="relative h-[400px] md:h-[500px]">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute top-6 left-4 md:left-8">
          <button onClick={() => navigate(-1)} className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition">
            <ArrowLeft size={24} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
             <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${recipe.category === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`}>
                {recipe.category}
             </span>
             <div className="flex items-center bg-yellow-500/20 backdrop-blur-sm px-2 py-1 rounded text-yellow-300 font-bold text-sm">
                <Star size={14} className="fill-current mr-1" /> {recipe.rating}
             </div>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-gray-200 text-lg max-w-2xl">{recipe.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-3 rounded-full text-blue-600"><Clock size={24} /></div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Time</p>
                  <p className="font-semibold text-gray-900">{recipe.cookingTime}</p>
                </div>
              </div>
               <div className="flex items-center gap-3">
                <div className="bg-orange-50 p-3 rounded-full text-orange-600"><BarChart size={24} /></div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Difficulty</p>
                  <p className="font-semibold text-gray-900">{recipe.difficulty}</p>
                </div>
              </div>
               <div className="flex items-center gap-3">
                <div className="bg-purple-50 p-3 rounded-full text-purple-600"><Users size={24} /></div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Servings</p>
                  <p className="font-semibold text-gray-900">{recipe.servings} People</p>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="bg-white border border-gray-100 rounded-xl p-8">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">What's in the Kit?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recipe.ingredients.map((ing, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-800">{ing.name}</span>
                    <span className="text-gray-500 text-sm">{ing.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 bg-green-50 p-4 rounded-lg border border-green-100">
                <span className="bg-green-100 text-green-700 p-1 rounded-full text-xs">Fresh</span>
                All vegetables are chopped, washed, and vacuum packed.
              </div>
            </div>
            
             {/* Tutorial Teaser */}
             <div className="bg-gray-900 text-white rounded-xl p-8 flex items-center justify-between overflow-hidden relative">
                <div className="relative z-10">
                  <h3 className="font-heading text-xl font-bold mb-2">Video Tutorial Included</h3>
                  <p className="text-gray-400 text-sm mb-4">Scan the QR code on the box to watch the chef cook this.</p>
                  <button className="flex items-center gap-2 text-brand-yellow font-semibold hover:text-white transition">
                    <PlayCircle /> Watch Preview
                  </button>
                </div>
                <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent"></div>
             </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
             <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-gray-900 font-bold text-lg">Total Price</h3>
                  <div className="text-right">
                    <span className="font-heading text-3xl font-bold text-brand-green">₹{totalPrice}</span>
                    {selectedAddons.length > 0 && <p className="text-xs text-gray-500">(Includes extra items)</p>}
                  </div>
                </div>
                
                <hr className="border-gray-100 mb-6" />

                {/* Upsell Section */}
                <div className="mb-6">
                   <h4 className="font-semibold text-gray-900 mb-3 text-sm">Make it a Complete Combo</h4>
                   <div className="space-y-2">
                     {recommendedAddons.map(addon => (
                       <div 
                         key={addon.id}
                         onClick={() => toggleAddon(addon.id)}
                         className={`flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition ${selectedAddons.includes(addon.id) ? 'border-brand-green bg-green-50' : 'border-gray-100 hover:bg-gray-50'}`}
                       >
                         <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedAddons.includes(addon.id) ? 'bg-brand-green border-brand-green text-white' : 'border-gray-300'}`}>
                           {selectedAddons.includes(addon.id) && <Check size={10} />}
                         </div>
                         <img src={addon.image} alt={addon.name} className="w-8 h-8 rounded object-cover" />
                         <div className="flex-1 flex justify-between text-sm">
                           <span className="text-gray-700">{addon.name}</span>
                           <span className="font-semibold">₹{addon.price}</span>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-brand-green rounded-full"></div> Recipe Card Included
                  </div>
                   <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-brand-green rounded-full"></div> Pre-measured Ingredients
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-brand-black text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-800 transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={20} /> Add to Cart
                </button>
                
                <p className="text-center text-xs text-gray-400 mt-4">Secure Checkout • 100% Fresh Guarantee</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
