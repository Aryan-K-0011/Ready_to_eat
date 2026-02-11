import React, { useState } from 'react';
import { useApp } from '../context';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, TrendingUp, Users, DollarSign, Edit, Trash2, Plus, ChefHat, Truck, ShoppingBag, User } from 'lucide-react';
import { Recipe, AddOn } from '../types';

export const Admin = () => {
  const { user, orders, updateOrderStatus, recipes, addRecipe, updateRecipe, deleteRecipe, addons, addAddon, updateAddon, deleteAddon, deliveryBoys, updateDeliveryBoyStatus, assignOrderToDeliveryBoy } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'recipes' | 'addons' | 'staff'>('dashboard');

  // Recipe Form State
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Partial<Recipe>>({});

  // Addon Form State
  const [showAddonForm, setShowAddonForm] = useState(false);
  const [editingAddon, setEditingAddon] = useState<Partial<AddOn>>({});

  if (user?.role !== 'admin') {
    return <div className="p-8 text-center text-red-500">Access Denied. Admin only area.</div>;
  }

  const handleSaveRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if(editingRecipe.title && editingRecipe.price) {
      const newRecipe = {
         ...editingRecipe,
         id: editingRecipe.id || Date.now().toString(),
         ingredients: editingRecipe.ingredients || [],
         rating: editingRecipe.rating || 0,
         calories: editingRecipe.calories || 0,
         image: editingRecipe.image || 'https://picsum.photos/800/600'
      } as Recipe;

      if(editingRecipe.id) {
         updateRecipe(newRecipe);
      } else {
         addRecipe(newRecipe);
      }
      setShowRecipeForm(false);
      setEditingRecipe({});
    }
  };

  const handleSaveAddon = (e: React.FormEvent) => {
     e.preventDefault();
     if(editingAddon.name && editingAddon.price) {
        const newAddon = {
           ...editingAddon,
           id: editingAddon.id || Date.now().toString(),
           image: editingAddon.image || 'https://picsum.photos/200/200'
        } as AddOn;

        if(editingAddon.id) {
           updateAddon(newAddon);
        } else {
           addAddon(newAddon);
        }
        setShowAddonForm(false);
        setEditingAddon({});
     }
  };

  const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.type === 'instant');
  
  const stats = [
    { title: 'Total Revenue', value: `₹${orders.reduce((acc, o) => acc + o.total, 0)}`, icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { title: 'Active Live Orders', value: activeOrders.length.toString(), icon: Package, color: 'bg-blue-100 text-blue-600' },
    { title: 'Registered Users', value: '1,204', icon: Users, color: 'bg-purple-100 text-purple-600' },
    { title: 'Conversion Rate', value: '12.5%', icon: TrendingUp, color: 'bg-orange-100 text-orange-600' },
  ];

  const availableDeliveryBoys = deliveryBoys.filter(db => db.status === 'Available');

  return (
    <div className="bg-gray-50 min-h-screen">
       {/* Sidebar / Tabs */}
       <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex space-x-8 overflow-x-auto">
                <button onClick={() => setActiveTab('dashboard')} className={`py-4 border-b-2 font-medium whitespace-nowrap ${activeTab === 'dashboard' ? 'border-brand-green text-brand-green' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Dashboard & Live Orders</button>
                <button onClick={() => setActiveTab('recipes')} className={`py-4 border-b-2 font-medium whitespace-nowrap ${activeTab === 'recipes' ? 'border-brand-green text-brand-green' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Recipe Management</button>
                <button onClick={() => setActiveTab('addons')} className={`py-4 border-b-2 font-medium whitespace-nowrap ${activeTab === 'addons' ? 'border-brand-green text-brand-green' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Add-ons Inventory</button>
                <button onClick={() => setActiveTab('staff')} className={`py-4 border-b-2 font-medium whitespace-nowrap ${activeTab === 'staff' ? 'border-brand-green text-brand-green' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Delivery Staff</button>
             </div>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
             <div className="animate-in fade-in">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${stat.color}`}>
                        <stat.icon size={24} />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Orders Table */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                   <h2 className="font-heading font-semibold text-xl mb-6 flex items-center gap-2">
                     <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                     Live Orders Monitor
                   </h2>
                   <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-500 text-sm">
                          <th className="pb-3 px-4">Order ID</th>
                          <th className="pb-3 px-4">Items</th>
                          <th className="pb-3 px-4">ETA</th>
                          <th className="pb-3 px-4">Status</th>
                          <th className="pb-3 px-4">Action</th>
                          <th className="pb-3 px-4">Assign Staff</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {orders.map(order => (
                          <tr key={order.id} className="text-sm hover:bg-gray-50">
                            <td className="py-4 px-4 font-bold text-gray-900">#{order.id}</td>
                            <td className="py-4 px-4 text-gray-600">{order.items.length} items (₹{order.total})</td>
                            <td className="py-4 px-4 font-medium text-brand-black">
                               {order.type === 'instant' ? (
                                   order.status === 'Delivered' ? 'Completed' : `${order.eta} mins left`
                               ) : (
                                   <span className="text-purple-600">Scheduled: {new Date(order.scheduledDate!).toLocaleDateString()}</span>
                               )}
                            </td>
                            <td className="py-4 px-4">
                               <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                 {order.status}
                               </span>
                            </td>
                            <td className="py-4 px-4">
                              <select 
                                className="bg-white text-gray-900 border border-gray-300 rounded-lg text-xs p-2 outline-none font-medium"
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                              >
                                <option className="text-gray-900">Pending</option>
                                <option className="text-gray-900">Packed</option>
                                <option className="text-gray-900">Out for Delivery</option>
                                <option className="text-gray-900">Delivered</option>
                              </select>
                            </td>
                            <td className="py-4 px-4">
                               {order.assignedDeliveryBoyId ? (
                                 <span className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                                   <User size={12} />
                                   {deliveryBoys.find(db => db.id === order.assignedDeliveryBoyId)?.name || 'Assigned'}
                                 </span>
                               ) : (
                                 order.status !== 'Delivered' && (
                                   <select 
                                     className="bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-xs p-2 outline-none w-32"
                                     onChange={(e) => assignOrderToDeliveryBoy(order.id, e.target.value)}
                                     defaultValue=""
                                   >
                                     <option value="" disabled>Assign...</option>
                                     {availableDeliveryBoys.map(db => (
                                       <option key={db.id} value={db.id}>{db.name}</option>
                                     ))}
                                   </select>
                                 )
                               )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                   </div>
                </div>
             </div>
          )}

          {/* Recipes Tab */}
          {activeTab === 'recipes' && (
            <div>
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold">Manage Recipes</h2>
                 <button onClick={() => { setEditingRecipe({}); setShowRecipeForm(true); }} className="bg-brand-black text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold"><Plus size={16} /> Add Recipe</button>
               </div>

               {showRecipeForm && (
                 <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-200">
                    <h3 className="font-bold mb-4">{editingRecipe.id ? 'Edit' : 'Add'} Recipe</h3>
                    <form onSubmit={handleSaveRecipe} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <input placeholder="Recipe Title" className="input-field" value={editingRecipe.title || ''} onChange={e => setEditingRecipe({...editingRecipe, title: e.target.value})} required />
                       <input placeholder="Price" type="number" className="input-field" value={editingRecipe.price || ''} onChange={e => setEditingRecipe({...editingRecipe, price: parseInt(e.target.value)})} required />
                       <textarea placeholder="Description" className="input-field md:col-span-2" value={editingRecipe.description || ''} onChange={e => setEditingRecipe({...editingRecipe, description: e.target.value})} />
                       <select className="input-field" value={editingRecipe.category || 'Veg'} onChange={e => setEditingRecipe({...editingRecipe, category: e.target.value as any})}>
                          <option>Veg</option>
                          <option>Non-Veg</option>
                       </select>
                       <select className="input-field" value={editingRecipe.difficulty || 'Medium'} onChange={e => setEditingRecipe({...editingRecipe, difficulty: e.target.value as any})}>
                          <option>Easy</option>
                          <option>Medium</option>
                          <option>Hard</option>
                       </select>
                       <input placeholder="Cooking Time (e.g. 30 mins)" className="input-field" value={editingRecipe.cookingTime || ''} onChange={e => setEditingRecipe({...editingRecipe, cookingTime: e.target.value})} />
                       <div className="md:col-span-2 flex gap-2 justify-end mt-4">
                          <button type="button" onClick={() => setShowRecipeForm(false)} className="text-gray-500 px-4 py-2">Cancel</button>
                          <button type="submit" className="bg-brand-green text-white px-6 py-2 rounded-lg font-bold">Save Recipe</button>
                       </div>
                    </form>
                 </div>
               )}

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recipes.map(recipe => (
                    <div key={recipe.id} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4">
                       <img src={recipe.image} className="w-20 h-20 rounded-lg object-cover bg-gray-100" />
                       <div className="flex-1">
                          <h4 className="font-bold text-gray-900">{recipe.title}</h4>
                          <p className="text-sm text-gray-500 mb-2">₹{recipe.price}</p>
                          <div className="flex gap-2">
                             <button onClick={() => { setEditingRecipe(recipe); setShowRecipeForm(true); }} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Edit size={16} /></button>
                             <button onClick={() => deleteRecipe(recipe.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 size={16} /></button>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}
          
          {/* Addons Tab */}
          {activeTab === 'addons' && (
             <div>
                <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold">Manage Inventory (Add-ons)</h2>
                 <button onClick={() => { setEditingAddon({}); setShowAddonForm(true); }} className="bg-brand-black text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold"><Plus size={16} /> Add Product</button>
               </div>

               {showAddonForm && (
                 <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-200">
                    <h3 className="font-bold mb-4">{editingAddon.id ? 'Edit' : 'Add'} Product</h3>
                    <form onSubmit={handleSaveAddon} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <input placeholder="Product Name" className="input-field" value={editingAddon.name || ''} onChange={e => setEditingAddon({...editingAddon, name: e.target.value})} required />
                       <input placeholder="Price" type="number" className="input-field" value={editingAddon.price || ''} onChange={e => setEditingAddon({...editingAddon, price: parseInt(e.target.value)})} required />
                       <input placeholder="Image URL (e.g. https://...)" className="input-field" value={editingAddon.image || ''} onChange={e => setEditingAddon({...editingAddon, image: e.target.value})} />
                       <select className="input-field" value={editingAddon.category || 'Essential'} onChange={e => setEditingAddon({...editingAddon, category: e.target.value as any})}>
                          <option>Essential</option>
                          <option>Utensil</option>
                       </select>
                       <div className="md:col-span-2 flex gap-2 justify-end mt-4">
                          <button type="button" onClick={() => setShowAddonForm(false)} className="text-gray-500 px-4 py-2">Cancel</button>
                          <button type="submit" className="bg-brand-green text-white px-6 py-2 rounded-lg font-bold">Save Product</button>
                       </div>
                    </form>
                 </div>
               )}

               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {addons.map(addon => (
                    <div key={addon.id} className="bg-white border border-gray-200 rounded-xl p-4">
                       <div className="flex justify-between items-start mb-2">
                          <img src={addon.image || 'https://picsum.photos/200/200'} alt={addon.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                          <div className="flex gap-2">
                             <button onClick={() => { setEditingAddon(addon); setShowAddonForm(true); }} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Edit size={16} /></button>
                             <button onClick={() => deleteAddon(addon.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 size={16} /></button>
                          </div>
                       </div>
                       <h4 className="font-bold text-gray-900 mt-2">{addon.name}</h4>
                       <p className="text-sm text-gray-500">₹{addon.price} • {addon.category}</p>
                    </div>
                  ))}
               </div>
             </div>
          )}

          {/* Staff Tab */}
          {activeTab === 'staff' && (
             <div>
                <h2 className="text-xl font-bold mb-6">Delivery Fleet Status</h2>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                   <table className="w-full text-left">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                          <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Phone</th>
                          <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Current Order</th>
                          <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                         {deliveryBoys.map(boy => (
                           <tr key={boy.id}>
                              <td className="px-6 py-4 font-medium text-gray-900">{boy.name}</td>
                              <td className="px-6 py-4 text-gray-500">{boy.phone}</td>
                              <td className="px-6 py-4">
                                 <span className={`px-2 py-1 rounded-full text-xs font-bold ${boy.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                   {boy.status}
                                 </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">{boy.currentOrderId || '-'}</td>
                              <td className="px-6 py-4">
                                 <button 
                                   onClick={() => updateDeliveryBoyStatus(boy.id, boy.status === 'Available' ? 'Busy' : 'Available')}
                                   className="text-brand-green font-semibold text-xs hover:underline"
                                 >
                                   Toggle Status
                                 </button>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          )}
       </div>
    </div>
  );
};