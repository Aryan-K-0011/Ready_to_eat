import React, { useState } from 'react';
import { useApp } from '../context';
import { Navigate, Link } from 'react-router-dom';
import { Package, User as UserIcon, LogOut, MapPin, Mail, ChevronRight, Settings, Calendar, Plus, Trash2, Edit2, Save } from 'lucide-react';
import { Address, Preferences } from '../types';

export const Profile = () => {
  const { user, logout, orders, addresses, addAddress, deleteAddress, preferences, updatePreferences } = useApp();
  const [activeTab, setActiveTab] = useState<'orders' | 'scheduled' | 'addresses' | 'preferences' | 'settings'>('orders');
  
  // Address Form State
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({ type: 'Home' });

  // Preference State (Local for editing)
  const [localPrefs, setLocalPrefs] = useState<Preferences>(preferences);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if(newAddress.name && newAddress.street && newAddress.city && newAddress.pincode && newAddress.phone) {
      addAddress({
        id: Date.now().toString(),
        type: newAddress.type as any || 'Home',
        name: newAddress.name,
        street: newAddress.street,
        city: newAddress.city,
        pincode: newAddress.pincode,
        phone: newAddress.phone
      });
      setShowAddressForm(false);
      setNewAddress({ type: 'Home' });
    }
  };

  const handleSavePreferences = () => {
    updatePreferences(localPrefs);
    alert("Preferences Saved!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center text-2xl font-bold">
                   {user.name.charAt(0).toUpperCase()}
                 </div>
                 <div className="overflow-hidden">
                   <h2 className="font-bold text-gray-900 truncate">{user.name}</h2>
                   <p className="text-sm text-gray-500 truncate">{user.email}</p>
                 </div>
               </div>
               
               <nav className="space-y-1">
                 <button onClick={() => setActiveTab('orders')} className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center gap-3 transition ${activeTab === 'orders' ? 'bg-brand-green text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                   <Package size={18} /> My Orders
                 </button>
                 <button onClick={() => setActiveTab('scheduled')} className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center gap-3 transition ${activeTab === 'scheduled' ? 'bg-brand-green text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                   <Calendar size={18} /> Scheduled
                 </button>
                 <button onClick={() => setActiveTab('addresses')} className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center gap-3 transition ${activeTab === 'addresses' ? 'bg-brand-green text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                   <MapPin size={18} /> Addresses
                 </button>
                 <button onClick={() => setActiveTab('preferences')} className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center gap-3 transition ${activeTab === 'preferences' ? 'bg-brand-green text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                   <UserIcon size={18} /> Preferences
                 </button>
                 <button onClick={() => setActiveTab('settings')} className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center gap-3 transition ${activeTab === 'settings' ? 'bg-brand-green text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                   <Settings size={18} /> Settings
                 </button>
                 <button onClick={logout} className="w-full text-left px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition flex items-center gap-3 mt-4 border-t border-gray-100">
                   <LogOut size={18} /> Logout
                 </button>
               </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
             <div className="bg-white rounded-xl shadow-sm min-h-[500px]">
                
                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <div>
                    <div className="p-6 border-b border-gray-100">
                      <h2 className="font-heading font-bold text-xl">Instant Orders</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {orders.filter(o => o.type !== 'scheduled').map((order) => (
                        <div key={order.id} className="p-6 hover:bg-gray-50 transition">
                           <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                             <div>
                               <div className="flex items-center gap-3 mb-1">
                                 <span className="font-bold text-gray-900">Order #{order.id}</span>
                                 <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                                   order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                 }`}>
                                   {order.status}
                                 </span>
                               </div>
                               <p className="text-sm text-gray-500">
                                 {new Date(order.date).toLocaleDateString()}
                               </p>
                               <div className="text-sm text-gray-600 mt-2">
                                 {order.items.length} Items • Total: <strong>₹{order.total}</strong>
                               </div>
                             </div>
                             <div>
                               {order.status !== 'Delivered' ? (
                                 <Link to="/order-tracking" className="inline-flex items-center px-4 py-2 bg-brand-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition">
                                   Track Live
                                 </Link>
                               ) : (
                                 <button className="text-brand-green font-semibold text-sm hover:underline">Reorder</button>
                               )}
                             </div>
                           </div>
                        </div>
                      ))}
                      {orders.filter(o => o.type !== 'scheduled').length === 0 && (
                        <div className="p-12 text-center text-gray-500">No past orders.</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Scheduled Orders Tab */}
                {activeTab === 'scheduled' && (
                  <div>
                    <div className="p-6 border-b border-gray-100">
                      <h2 className="font-heading font-bold text-xl">Scheduled Orders</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {orders.filter(o => o.type === 'scheduled').map((order) => (
                        <div key={order.id} className="p-6 hover:bg-gray-50 transition">
                           <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                             <div>
                               <div className="flex items-center gap-3 mb-1">
                                 <span className="font-bold text-gray-900">Order #{order.id}</span>
                                 <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-bold uppercase">Scheduled</span>
                               </div>
                               <p className="text-sm text-gray-500">
                                 Scheduled for: <span className="font-bold">{new Date(order.scheduledDate!).toLocaleString()}</span>
                               </p>
                               <div className="text-sm text-gray-600 mt-2">
                                 {order.items.length} Items • Total: <strong>₹{order.total}</strong>
                               </div>
                             </div>
                             <button className="text-red-500 text-sm hover:underline">Cancel Order</button>
                           </div>
                        </div>
                      ))}
                      {orders.filter(o => o.type === 'scheduled').length === 0 && (
                         <div className="p-12 text-center text-gray-500">No scheduled orders.</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Addresses Tab */}
                {activeTab === 'addresses' && (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="font-heading font-bold text-xl">Saved Addresses</h2>
                      <button onClick={() => setShowAddressForm(!showAddressForm)} className="flex items-center gap-2 bg-brand-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
                        <Plus size={16} /> Add New
                      </button>
                    </div>

                    {showAddressForm && (
                      <form onSubmit={handleSaveAddress} className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200 animate-in fade-in slide-in-from-top-4">
                        <h3 className="font-bold mb-4">Add New Address</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                           <input placeholder="Name" className="input-field" value={newAddress.name || ''} onChange={e => setNewAddress({...newAddress, name: e.target.value})} required />
                           <input placeholder="Phone" className="input-field" value={newAddress.phone || ''} onChange={e => setNewAddress({...newAddress, phone: e.target.value})} required />
                           <input placeholder="Street / Flat / Building" className="input-field md:col-span-2" value={newAddress.street || ''} onChange={e => setNewAddress({...newAddress, street: e.target.value})} required />
                           <input placeholder="City" className="input-field" value={newAddress.city || ''} onChange={e => setNewAddress({...newAddress, city: e.target.value})} required />
                           <input placeholder="Pincode (6 digits)" maxLength={6} className="input-field" value={newAddress.pincode || ''} onChange={e => setNewAddress({...newAddress, pincode: e.target.value.replace(/\D/g,'')})} required />
                           <select className="input-field" value={newAddress.type} onChange={e => setNewAddress({...newAddress, type: e.target.value as any})}>
                             <option>Home</option>
                             <option>Work</option>
                             <option>Other</option>
                           </select>
                        </div>
                        <div className="flex gap-2">
                          <button type="submit" className="bg-brand-green text-white px-6 py-2 rounded-lg text-sm font-bold">Save</button>
                          <button type="button" onClick={() => setShowAddressForm(false)} className="text-gray-500 px-4 py-2">Cancel</button>
                        </div>
                      </form>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {addresses.map(addr => (
                         <div key={addr.id} className="border border-gray-200 rounded-xl p-4 hover:border-brand-green transition group relative">
                           <div className="flex justify-between items-start">
                              <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded uppercase mb-2 inline-block">{addr.type}</span>
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                <button className="text-gray-400 hover:text-blue-500"><Edit2 size={16} /></button>
                                <button onClick={() => deleteAddress(addr.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                              </div>
                           </div>
                           <h3 className="font-bold text-gray-900">{addr.name}</h3>
                           <p className="text-sm text-gray-500 mt-1">{addr.street}, {addr.city}, {addr.pincode}</p>
                           <p className="text-sm text-gray-500 mt-1">Phone: {addr.phone}</p>
                         </div>
                       ))}
                    </div>
                  </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                  <div className="p-6">
                    <h2 className="font-heading font-bold text-xl mb-6">Food Preferences</h2>
                    <div className="space-y-6 max-w-lg">
                      <div className="flex items-center justify-between p-4 border rounded-xl">
                        <div>
                          <h3 className="font-medium text-gray-900">Vegetarian Only</h3>
                          <p className="text-sm text-gray-500">Only show veg recipes</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked={localPrefs.isVegetarian} onChange={e => setLocalPrefs({...localPrefs, isVegetarian: e.target.checked})} />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                        </label>
                      </div>

                      <div className="p-4 border rounded-xl">
                         <h3 className="font-medium text-gray-900 mb-3">Spiciness Level</h3>
                         <div className="flex gap-4">
                           {['Low', 'Medium', 'High'].map(level => (
                             <button 
                               key={level}
                               onClick={() => setLocalPrefs({...localPrefs, spiciness: level as any})}
                               className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${localPrefs.spiciness === level ? 'bg-brand-yellow text-white border-brand-yellow' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                             >
                               {level}
                             </button>
                           ))}
                         </div>
                      </div>

                      <button onClick={handleSavePreferences} className="bg-brand-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                        <Save size={18} /> Save Preferences
                      </button>
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div className="p-6">
                    <h2 className="font-heading font-bold text-xl mb-6">Account Settings</h2>
                    <div className="space-y-4 max-w-lg">
                      <div className="p-4 bg-gray-50 rounded-xl">
                         <h3 className="font-bold mb-2">Change Password</h3>
                         <input type="password" placeholder="Current Password" className="input-field mb-2" />
                         <input type="password" placeholder="New Password" className="input-field mb-2" />
                         <button className="text-brand-green text-sm font-bold">Update Password</button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-xl">
                        <div>
                          <h3 className="font-medium text-gray-900">Email Notifications</h3>
                          <p className="text-sm text-gray-500">Order updates and offers</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked={localPrefs.notifications} onChange={e => setLocalPrefs({...localPrefs, notifications: e.target.checked})} />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                        </label>
                      </div>
                      <div className="p-4 border border-red-100 bg-red-50 rounded-xl">
                        <h3 className="font-bold text-red-600 mb-1">Delete Account</h3>
                        <p className="text-sm text-red-400 mb-3">This action cannot be undone.</p>
                        <button className="text-red-600 text-sm font-bold border border-red-200 px-3 py-1 rounded bg-white">Delete My Account</button>
                      </div>
                    </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
