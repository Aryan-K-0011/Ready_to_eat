import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { CartItem, Order, User, Toast, Recipe, AddOn, Address, Preferences, DeliveryBoy } from './types';
import { RECIPES as INITIAL_RECIPES, ADDONS as INITIAL_ADDONS } from './constants';

interface AppContextType {
  user: User | null;
  login: (email: string, role: 'customer' | 'admin') => void;
  signup: (name: string, email: string, role: 'customer' | 'admin') => void;
  logout: () => void;
  
  // Data State (Synced between User and Admin)
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
  
  addons: AddOn[];
  addAddon: (addon: AddOn) => void;
  updateAddon: (addon: AddOn) => void;
  deleteAddon: (id: string) => void;

  // Cart & Orders
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  orders: Order[];
  placeOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  assignOrderToDeliveryBoy: (orderId: string, deliveryBoyId: string) => void;
  
  // User Profile
  addresses: Address[];
  addAddress: (address: Address) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;
  preferences: Preferences;
  updatePreferences: (prefs: Preferences) => void;

  // Admin Specific
  deliveryBoys: DeliveryBoy[];
  updateDeliveryBoyStatus: (id: string, status: DeliveryBoy['status']) => void;

  // Feedback
  toasts: Toast[];
  addToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [addons, setAddons] = useState<AddOn[]>(INITIAL_ADDONS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-7782',
      items: [],
      total: 450,
      status: 'Out for Delivery',
      date: new Date().toISOString(),
      type: 'instant',
      eta: 25, // minutes
      assignedDeliveryBoyId: 'd2'
    }
  ]);
  
  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', type: 'Home', name: 'User Name', phone: '+91 9876543210', street: '123 Green Street', city: 'Bangalore', pincode: '560001' }
  ]);
  
  const [preferences, setPreferences] = useState<Preferences>({
    isVegetarian: false,
    spiciness: 'Medium',
    allergies: [],
    notifications: true
  });

  const [deliveryBoys, setDeliveryBoys] = useState<DeliveryBoy[]>([
    { id: 'd1', name: 'Ramesh Kumar', phone: '9988776655', status: 'Available' },
    { id: 'd2', name: 'Suresh Singh', phone: '8877665544', status: 'Busy', currentOrderId: 'ORD-7782' },
    { id: 'd3', name: 'Amit Verma', phone: '7766554433', status: 'Available' },
  ]);

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Live Timer Effect: Updates ETA every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setOrders(prevOrders => prevOrders.map(order => {
        if (order.status === 'Delivered' || order.type === 'scheduled') return order;
        
        let newEta = order.eta;
        let newStatus: Order['status'] = order.status;

        // Simulate progress
        if (newEta > 0) {
           newEta = newEta - 1;
        }

        // Auto update status based on time (Simulation)
        if (newEta < 45 && newStatus === 'Pending') newStatus = 'Packed';
        if (newEta < 30 && newStatus === 'Packed') newStatus = 'Out for Delivery';
        if (newEta <= 0 && newStatus === 'Out for Delivery') newStatus = 'Delivered';

        return { ...order, eta: newEta, status: newStatus };
      }));
    }, 60000); // Run every minute for realistic ETA reduction

    return () => clearInterval(timer);
  }, []);

  const addToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const login = (email: string, role: 'customer' | 'admin') => {
    setUser({ name: email.split('@')[0], email, role });
    addToast(`Welcome back, ${email.split('@')[0]}!`, 'success');
  };

  const signup = (name: string, email: string, role: 'customer' | 'admin') => {
    setUser({ name, email, role });
    addToast(`Account created successfully! Welcome, ${name}`, 'success');
  };

  const logout = () => {
    setUser(null);
    addToast('Logged out successfully', 'info');
  };

  // --- Data Management ---
  const addRecipe = (recipe: Recipe) => setRecipes(prev => [...prev, recipe]);
  const updateRecipe = (updated: Recipe) => setRecipes(prev => prev.map(r => r.id === updated.id ? updated : r));
  const deleteRecipe = (id: string) => setRecipes(prev => prev.filter(r => r.id !== id));

  const addAddon = (addon: AddOn) => setAddons(prev => [...prev, addon]);
  const updateAddon = (updated: AddOn) => setAddons(prev => prev.map(a => a.id === updated.id ? updated : a));
  const deleteAddon = (id: string) => setAddons(prev => prev.filter(a => a.id !== id));

  // --- Cart ---
  const addToCart = (newItem: CartItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === newItem.id);
      if (existing) {
        addToast(`Updated quantity for ${newItem.name}`, 'info');
        return prev.map(item => item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      addToast(`Added ${newItem.name} to cart`, 'success');
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    addToast('Item removed from cart', 'info');
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  // --- Order ---
  const placeOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    clearCart();
    addToast(order.type === 'scheduled' ? 'Order scheduled successfully!' : 'Order placed successfully!', 'success');
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    addToast(`Order #${id} status updated to ${status}`, 'info');
  };

  const assignOrderToDeliveryBoy = (orderId: string, deliveryBoyId: string) => {
    // 1. Update Order
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, assignedDeliveryBoyId: deliveryBoyId, status: 'Out for Delivery' } : o));
    
    // 2. Update Delivery Boy
    setDeliveryBoys(prev => prev.map(db => 
      db.id === deliveryBoyId 
        ? { ...db, status: 'Busy', currentOrderId: orderId } 
        : db
    ));

    addToast('Delivery staff assigned successfully', 'success');
  };

  // --- Profile ---
  const addAddress = (addr: Address) => setAddresses(prev => [...prev, addr]);
  const updateAddress = (addr: Address) => setAddresses(prev => prev.map(a => a.id === addr.id ? addr : a));
  const deleteAddress = (id: string) => setAddresses(prev => prev.filter(a => a.id !== id));
  
  const updatePreferences = (prefs: Preferences) => setPreferences(prefs);

  const updateDeliveryBoyStatus = (id: string, status: DeliveryBoy['status']) => {
    setDeliveryBoys(prev => prev.map(d => d.id === id ? { ...d, status, currentOrderId: status === 'Available' ? undefined : d.currentOrderId } : d));
  };

  return (
    <AppContext.Provider value={{ 
      user, login, signup, logout, 
      recipes, addRecipe, updateRecipe, deleteRecipe,
      addons, addAddon, updateAddon, deleteAddon,
      cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      orders, placeOrder, updateOrderStatus, assignOrderToDeliveryBoy,
      addresses, addAddress, updateAddress, deleteAddress,
      preferences, updatePreferences,
      deliveryBoys, updateDeliveryBoyStatus,
      toasts, addToast, removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};