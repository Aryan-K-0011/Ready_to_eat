import React from 'react';
import { Toast as ToastType } from '../types';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  toasts: ToastType[];
  removeToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[300px] animate-in slide-in-from-right duration-300 ${
            toast.type === 'success' ? 'bg-white border-l-4 border-green-500' :
            toast.type === 'error' ? 'bg-white border-l-4 border-red-500' :
            'bg-white border-l-4 border-blue-500'
          }`}
        >
          {toast.type === 'success' && <CheckCircle size={20} className="text-green-500" />}
          {toast.type === 'error' && <AlertCircle size={20} className="text-red-500" />}
          {toast.type === 'info' && <Info size={20} className="text-blue-500" />}
          
          <p className="text-sm font-medium text-gray-800 flex-grow">{toast.message}</p>
          
          <button 
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
