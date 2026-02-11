import React, { useEffect, useState } from 'react';
import { useApp } from '../context';
import { CheckCircle, Truck, Package, Clock, MapPin, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OrderTracking = () => {
  const { orders, deliveryBoys } = useApp();
  // Find first active instant order
  const latestOrder = orders.find(o => o.type === 'instant' && o.status !== 'Delivered') || orders[0];
  const assignedDeliveryBoy = latestOrder?.assignedDeliveryBoyId ? deliveryBoys.find(d => d.id === latestOrder.assignedDeliveryBoyId) : null;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!latestOrder) return;
    const statuses = ['Pending', 'Packed', 'Out for Delivery', 'Delivered'];
    const index = statuses.indexOf(latestOrder.status);
    setProgress((index + 1) * 25);
  }, [latestOrder]);

  if (!latestOrder) {
    return (
       <div className="min-h-screen flex items-center justify-center flex-col">
         <p className="text-gray-500 mb-4">No active orders found.</p>
         <Link to="/" className="text-brand-green font-semibold">Start Ordering</Link>
       </div>
    );
  }

  const steps = [
    { name: 'Order Placed', icon: Clock, completed: true },
    { name: 'Packed', icon: Package, completed: latestOrder.status !== 'Pending' },
    { name: 'On the Way', icon: Truck, completed: latestOrder.status === 'Out for Delivery' || latestOrder.status === 'Delivered' },
    { name: 'Delivered', icon: MapPin, completed: latestOrder.status === 'Delivered' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-brand-green rounded-t-2xl p-8 text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            {latestOrder.status === 'Delivered' ? (
                <div className="flex flex-col items-center">
                    <CheckCircle size={48} className="mb-2" />
                    <h1 className="font-heading text-2xl font-bold mb-2">Order Delivered!</h1>
                </div>
            ) : (
                <>
                    <h1 className="font-heading text-3xl font-bold mb-2">{latestOrder.eta} Mins</h1>
                    <p className="opacity-90 font-medium">Estimated Delivery Time</p>
                </>
            )}
            <p className="text-sm opacity-70 mt-4">Order #{latestOrder.id} • {latestOrder.items.length} Items</p>
          </div>
          {/* Pulse Effect */}
          {latestOrder.status !== 'Delivered' && (
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          )}
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-b-2xl shadow-lg p-8 mb-8">
           <div className="relative">
              {/* Progress Bar Background */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-100 md:hidden"></div>
              <div className="hidden md:block absolute top-6 left-0 right-0 h-1 bg-gray-100"></div>
              
              <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex md:flex-col items-center gap-4 md:gap-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors duration-500 bg-white ${step.completed ? 'border-brand-green text-brand-green' : 'border-gray-100 text-gray-400'}`}>
                      <step.icon size={20} />
                    </div>
                    <div className="md:text-center">
                      <p className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>{step.name}</p>
                      {step.completed && <p className="text-xs text-green-600 font-medium">Completed</p>}
                    </div>
                  </div>
                ))}
              </div>
           </div>

           {(latestOrder.status === 'Out for Delivery' || latestOrder.status === 'Delivered') && assignedDeliveryBoy && (
               <div className="mt-10 border-t border-gray-100 pt-8 animate-in fade-in slide-in-from-bottom-4">
                 <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                       <img src={`https://randomuser.me/api/portraits/men/${parseInt(assignedDeliveryBoy.id.replace(/\D/g,'')) + 30}.jpg`} alt="Driver" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{assignedDeliveryBoy.name}</h3>
                      <p className="text-sm text-gray-500">Your delivery partner</p>
                      <div className="flex gap-2 mt-2">
                         <button className="bg-brand-green text-white px-3 py-1 rounded text-sm hover:bg-green-700">Call {assignedDeliveryBoy.phone}</button>
                      </div>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-xs text-gray-400 uppercase">Vehicle</p>
                      <p className="font-semibold text-gray-900">Honda Activa</p>
                      <p className="text-sm text-gray-500">MH 12 AB 1234</p>
                    </div>
                 </div>
               </div>
           )}
        </div>

        <div className="text-center">
           <Link to="/recipes" className="text-gray-500 hover:text-brand-green font-medium">Place another order</Link>
        </div>
      </div>
    </div>
  );
};