import React, { useState, useMemo } from 'react';
import { useApp } from '../context';
import { Search, Filter, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UpsellModal } from '../components/UpsellModal';
import { Recipe } from '../types';

export const RecipeList = () => {
  const { recipes } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | 'Veg' | 'Non-Veg'>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const openUpsell = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(search.toLowerCase());
      const matchesType = filter === 'All' || recipe.category === filter;
      const matchesDifficulty = difficultyFilter === 'All' || recipe.difficulty === difficultyFilter;
      return matchesSearch && matchesType && matchesDifficulty;
    });
  }, [search, filter, difficultyFilter, recipes]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <UpsellModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        recipe={selectedRecipe} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="font-heading text-3xl font-bold text-gray-900">Explore Recipes</h1>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search for paneer, chicken, pasta..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10" 
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-gray-500 font-medium mr-4">
            <Filter size={18} /> Filters:
          </div>
          
          <div className="flex gap-2">
            {['All', 'Veg', 'Non-Veg'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  filter === f 
                    ? 'bg-brand-green text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-gray-200 hidden md:block"></div>

           <div className="flex gap-2">
            {['All', 'Easy', 'Medium', 'Hard'].map((d) => (
              <button
                key={d}
                onClick={() => setDifficultyFilter(d as any)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  difficultyFilter === d 
                    ? 'bg-brand-yellow text-brand-black shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 flex flex-col h-full group">
               <Link to={`/recipe/${recipe.id}`} className="block relative h-48 overflow-hidden rounded-t-2xl">
                  <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute top-3 left-3">
                     <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${recipe.category === 'Veg' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                       {recipe.category}
                     </span>
                  </div>
               </Link>
               
               <div className="p-5 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <Link to={`/recipe/${recipe.id}`} className="font-heading font-semibold text-lg text-gray-900 hover:text-brand-green transition line-clamp-1">
                      {recipe.title}
                    </Link>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Clock size={12} /> {recipe.cookingTime}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{recipe.difficulty}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="flex items-center gap-1 text-brand-yellow font-bold"><Star size={12} className="fill-current" /> {recipe.rating}</span>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                     <span className="text-lg font-bold text-gray-900">₹{recipe.price}</span>
                     <button 
                        onClick={() => openUpsell(recipe)}
                        className="bg-brand-green/10 text-brand-green px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-brand-green hover:text-white transition"
                      >
                        Add Kit
                      </button>
                  </div>
               </div>
            </div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No recipes found matching your filters.</p>
            <button onClick={() => { setSearch(''); setFilter('All'); setDifficultyFilter('All'); }} className="mt-4 text-brand-green font-semibold hover:underline">Clear all filters</button>
          </div>
        )}
      </div>
    </div>
  );
};
