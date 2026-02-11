export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: 'Veg' | 'Non-Veg';
  mealType: 'Dinner' | 'Snack' | 'Quick Meal' | 'Lunch';
  cookingTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  rating: number;
  calories: number;
  ingredients: Ingredient[];
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  category: 'Essential' | 'Utensil';
  image: string;
}

export interface CartItem {
  id: string;
  type: 'recipe' | 'addon';
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Packed' | 'Out for Delivery' | 'Delivered';
  date: string; // Order placed date
  type: 'instant' | 'scheduled';
  scheduledDate?: string; // For scheduled orders
  eta: number; // Time in minutes remaining
  assignedDeliveryBoyId?: string;
}

export interface User {
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  name: string;
  phone: string;
  street: string;
  city: string;
  pincode: string;
}

export interface Preferences {
  isVegetarian: boolean;
  spiciness: 'Low' | 'Medium' | 'High';
  allergies: string[];
  notifications: boolean;
}

export interface DeliveryBoy {
  id: string;
  name: string;
  phone: string;
  status: 'Available' | 'Busy';
  currentOrderId?: string;
}