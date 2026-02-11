import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, ArrowRight, Utensils, Truck } from 'lucide-react';
import { useApp } from '../context';
import { UpsellModal } from '../components/UpsellModal';
import { Recipe } from '../types';

export const Home = () => {
  const { recipes } = useApp();
  const featuredRecipes = recipes.slice(0, 3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const openUpsell = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  return (
    <div className="pb-16">
      <UpsellModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        recipe={selectedRecipe} 
      />

      {/* Hero Section */}
      <section className="relative bg-[#FFFBE6] py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10">
            <span className="inline-block bg-brand-yellow/20 text-brand-black text-sm font-semibold px-3 py-1 rounded-full mb-6">
              🚀 Delivered in 60 Minutes
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-brand-black leading-tight mb-6">
              Cook Like a Chef <br />
              <span className="text-brand-green">Zero Shopping.</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-lg leading-relaxed">
              Select a recipe, and we deliver the complete pre-portioned ingredient kit to your doorstep. Fresh, easy, and delicious.
            </p>
            <div className="flex gap-4">
              <Link to="/recipes" className="bg-brand-green text-white px-8 py-3.5 rounded-full font-semibold text-lg hover:bg-green-700 transition shadow-lg shadow-green-200">
                Explore Recipes
              </Link>
              <Link to="/how-it-works" className="bg-white text-brand-black border border-gray-200 px-8 py-3.5 rounded-full font-semibold text-lg hover:bg-gray-50 transition">
                How It Works
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 relative">
             <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Cooking Kit" 
                  className="rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition duration-500"
                />
             </div>
             {/* Decorative blob */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-green/10 rounded-full blur-3xl -z-0"></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="p-6 bg-gray-50 rounded-2xl flex flex-col items-center text-center">
               <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                 <Utensils size={28} />
               </div>
               <h3 className="font-heading font-semibold text-xl mb-2">No Grocery Runs</h3>
               <p className="text-gray-500">We send exactly what you need. No waste, no shopping stress.</p>
             </div>
             <div className="p-6 bg-gray-50 rounded-2xl flex flex-col items-center text-center">
               <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                 <Clock size={28} />
               </div>
               <h3 className="font-heading font-semibold text-xl mb-2">Ready in Minutes</h3>
               <p className="text-gray-500">Pre-measured ingredients mean less prep time and more eating time.</p>
             </div>
             <div className="p-6 bg-gray-50 rounded-2xl flex flex-col items-center text-center">
               <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                 <Truck size={28} />
               </div>
               <h3 className="font-heading font-semibold text-xl mb-2">1-Hour Delivery</h3>
               <p className="text-gray-500">Super fast delivery ensures your ingredients are always fresh.</p>
             </div>
           </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-heading text-3xl font-bold text-gray-900 mb-2">Trending This Week</h2>
              <p className="text-gray-500">Customer favorites you must try.</p>
            </div>
            <Link to="/recipes" className="hidden md:flex items-center text-brand-green font-semibold hover:text-green-700">
              View All Recipes <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden group">
                <div className="relative h-56 overflow-hidden">
                  <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute top-4 left-4">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${recipe.category === 'Veg' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                       {recipe.category}
                     </span>
                  </div>
                   <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-semibold shadow-sm">
                    <Clock size={14} className="text-gray-500" /> {recipe.cookingTime}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-heading font-semibold text-xl text-gray-900 line-clamp-1">{recipe.title}</h3>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md">
                      <Star size={14} className="text-brand-yellow fill-current" />
                      <span className="ml-1 text-xs font-bold text-gray-700">{recipe.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{recipe.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-gray-900">₹{recipe.price}</span>
                    <button 
                      onClick={() => openUpsell(recipe)}
                      className="bg-brand-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                    >
                      Add to Kit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <Link to="/recipes" className="inline-flex items-center text-brand-green font-semibold hover:text-green-700">
              View All Recipes <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
