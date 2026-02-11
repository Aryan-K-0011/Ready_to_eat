import React, { useState } from 'react';
import { useApp } from '../context';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, Calendar, Smartphone, MapPin } from 'lucide-react';
import { Order } from '../types';

export const Checkout = () => {
  const { cart, clearCart, placeOrder, user, addresses } = useApp();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'upi'>('card');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  
  // Form State
  const [addressId, setAddressId] = useState(addresses[0]?.id || '');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [upiId, setUpiId] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + 49;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardDetails({ ...cardDetails, number: val });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setCardDetails({ ...cardDetails, expiry: val });
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCardDetails({ ...cardDetails, cvv: val });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to place an order");
      navigate('/login');
      return;
    }

    if(paymentMethod === 'card') {
      if (cardDetails.number.length !== 16) {
        alert("Card number must be exactly 16 digits.");
        return;
      }
      if (cardDetails.cvv.length !== 3) {
        alert("CVV must be exactly 3 digits.");
        return;
      }
      if (cardDetails.expiry.length !== 5) {
        alert("Expiry date must be in MM/YY format.");
        return;
      }
    }
    
    if(paymentMethod === 'upi' && !upiId.includes('@')) {
      alert("Please enter a valid UPI ID");
      return;
    }

    if(isScheduled && !scheduleDate) {
      alert("Please select a date for scheduled delivery");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      
      const order: Order = {
        id: orderId,
        items: [...cart],
        total: total,
        status: 'Pending',
        date: new Date().toISOString(),
        type: isScheduled ? 'scheduled' : 'instant',
        scheduledDate: isScheduled ? scheduleDate : undefined,
        eta: isScheduled ? 0 : 60
      };

      placeOrder(order);
      setIsLoading(false);
      navigate(isScheduled ? '/profile' : '/order-tracking');
    }, 2000);
  };

  if (cart.length === 0) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-8">Secure Checkout</h1>
        
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            
            {/* Delivery Options */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <h2 className="font-heading font-semibold text-lg mb-4">Delivery Type</h2>
               <div className="flex gap-4 p-1 bg-gray-100 rounded-xl">
                 <button type="button" onClick={() => setIsScheduled(false)} className={`flex-1 py-3 rounded-lg text-sm font-bold transition ${!isScheduled ? 'bg-white shadow text-brand-green' : 'text-gray-500'}`}>Instant Delivery</button>
                 <button type="button" onClick={() => setIsScheduled(true)} className={`flex-1 py-3 rounded-lg text-sm font-bold transition ${isScheduled ? 'bg-white shadow text-brand-green' : 'text-gray-500'}`}>Schedule Order</button>
               </div>
               
               {isScheduled && (
                 <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                   <label className="block text-sm font-medium text-gray-700 mb-2">Select Date & Time</label>
                   <input 
                     type="datetime-local" 
                     className="input-field"
                     value={scheduleDate}
                     onChange={(e) => setScheduleDate(e.target.value)}
                     min={new Date().toISOString().slice(0, 16)}
                     required={isScheduled}
                   />
                 </div>
               )}
            </div>

            {/* Address Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="font-heading font-semibold text-lg mb-4">Delivery Address</h2>
              
              {addresses.length > 0 ? (
                <div className="space-y-3">
                  {addresses.map(addr => (
                    <label key={addr.id} className={`block border p-4 rounded-xl cursor-pointer transition ${addressId === addr.id ? 'border-brand-green bg-green-50 ring-1 ring-brand-green' : 'border-gray-200'}`}>
                      <div className="flex items-start gap-3">
                        <input type="radio" name="address" className="mt-1" checked={addressId === addr.id} onChange={() => setAddressId(addr.id)} />
                        <div>
                           <p className="font-bold text-gray-900">{addr.type} - {addr.name}</p>
                           <p className="text-sm text-gray-500">{addr.street}, {addr.city} - {addr.pincode}</p>
                           <p className="text-sm text-gray-500">Phone: {addr.phone}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                  <button type="button" onClick={() => navigate('/profile')} className="text-brand-green font-bold text-sm mt-2 flex items-center gap-1">+ Add New Address</button>
                </div>
              ) : (
                 <div className="text-center py-4">
                   <p className="text-gray-500 mb-2">No addresses saved.</p>
                   <button type="button" onClick={() => navigate('/profile')} className="bg-brand-black text-white px-4 py-2 rounded-lg text-sm">Add Address</button>
                 </div>
              )}
            </div>

            {/* Payment Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="font-heading font-semibold text-lg mb-4">Payment Method</h2>
              
              <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                 {['card', 'upi', 'cod'].map(method => (
                   <button 
                     key={method}
                     type="button"
                     onClick={() => setPaymentMethod(method as any)}
                     className={`px-6 py-3 rounded-xl border font-medium whitespace-nowrap transition ${paymentMethod === method ? 'bg-brand-black text-white border-brand-black' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                   >
                     {method === 'card' ? 'Credit/Debit Card' : method === 'upi' ? 'UPI / Wallet' : 'Cash on Delivery'}
                   </button>
                 ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <input 
                      type="text" 
                      placeholder="Card Number (16 digits)" 
                      maxLength={16}
                      className="input-field mb-3"
                      value={cardDetails.number}
                      onChange={handleCardNumberChange}
                      required
                    />
                    <div className="grid grid-cols-2 gap-3 mb-3">
                       <input 
                         type="text" 
                         placeholder="MM/YY" 
                         className="input-field"
                         value={cardDetails.expiry}
                         onChange={handleExpiryChange}
                         maxLength={5}
                         required
                       />
                       <input 
                         type="password" 
                         placeholder="CVV (3 digits)" 
                         maxLength={3}
                         className="input-field"
                         value={cardDetails.cvv}
                         onChange={handleCvvChange}
                         required
                       />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Cardholder Name" 
                      className="input-field"
                      value={cardDetails.name}
                      onChange={e => setCardDetails({...cardDetails, name: e.target.value})}
                      required
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="animate-in fade-in">
                   <input 
                     type="text" 
                     placeholder="Enter UPI ID (e.g. user@okhdfcbank)" 
                     className="input-field"
                     value={upiId}
                     onChange={e => setUpiId(e.target.value)}
                     required
                   />
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-sm flex items-center gap-2 animate-in fade-in">
                  <Truck size={18} /> You can pay via Cash or UPI upon delivery.
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-1">
             <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24 border border-gray-100">
               <h3 className="font-heading font-semibold text-lg mb-4">Order Review</h3>
               <div className="divide-y divide-gray-100 mb-6 max-h-64 overflow-y-auto">
                 {cart.map((item) => (
                   <div key={item.id} className="py-3 flex justify-between text-sm">
                     <span className="text-gray-600">{item.quantity} x {item.name}</span>
                     <span className="font-medium text-gray-900">₹{item.price * item.quantity}</span>
                   </div>
                 ))}
               </div>
               
               <div className="border-t border-gray-200 pt-4 mb-6">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-gray-600">Subtotal</span>
                   <span className="font-medium">₹{total - 49}</span>
                 </div>
                 <div className="flex justify-between items-center mb-4">
                   <span className="text-gray-600">Delivery</span>
                   <span className="font-medium">₹49</span>
                 </div>
                 <div className="flex justify-between items-center text-lg font-bold">
                   <span>Total</span>
                   <span className="text-brand-green">₹{total}</span>
                 </div>
               </div>
               
               <button 
                type="submit"
                disabled={isLoading}
                className={`w-full bg-brand-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition flex items-center justify-center gap-2 shadow-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
               >
                 {isLoading ? 'Processing...' : `Pay ₹${total}`}
               </button>
               
               <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                 <ShieldCheck size={14} /> SSL Secured Payment
               </div>
             </div>
          </div>
        </form>
      </div>
    </div>
  );
};