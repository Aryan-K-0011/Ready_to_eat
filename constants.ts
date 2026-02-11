import { Recipe, AddOn } from './types';

export const RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Paneer Butter Masala',
    description: 'Rich and creamy curry made with paneer, spices, onions, tomatoes, cashews and butter.',
    image: 'https://myfoodstory.com/wp-content/uploads/2021/07/restaurant-style-paneer-butter-masala-2-500x500.jpg',
    price: 349,
    category: 'Veg',
    mealType: 'Dinner',
    cookingTime: '30 mins',
    difficulty: 'Medium',
    servings: 2,
    rating: 4.8,
    calories: 450,
    ingredients: [
      { name: 'Paneer', quantity: '200g' },
      { name: 'Onion Tomato Masala Base', quantity: '1 pack' },
      { name: 'Butter', quantity: '50g' },
      { name: 'Fresh Cream', quantity: '30ml' },
      { name: 'Spice Mix', quantity: '1 sachet' }
    ]
  },
  {
    id: '2',
    title: 'Chicken Biryani Kit',
    description: 'Authentic Hyderabadi style chicken biryani kit with basmati rice and marinated chicken.',
    image: 'https://static.toiimg.com/thumb/53096628.cms?width=1200&height=900',
    price: 499,
    category: 'Non-Veg',
    mealType: 'Dinner',
    cookingTime: '45 mins',
    difficulty: 'Hard',
    servings: 2,
    rating: 4.9,
    calories: 600,
    ingredients: [
      { name: 'Basmati Rice', quantity: '250g' },
      { name: 'Marinated Chicken', quantity: '300g' },
      { name: 'Fried Onions', quantity: '50g' },
      { name: 'Biryani Masala', quantity: '1 pack' },
      { name: 'Saffron Milk', quantity: '20ml' }
    ]
  },
  {
    id: '3',
    title: 'Vegetable Hakka Noodles',
    description: 'Quick and delicious stir-fried noodles with crunchy vegetables.',
    image: 'https://www.whiskaffair.com/wp-content/uploads/2020/10/Veg-Hakka-Noodles-2-3.jpg',
    price: 199,
    category: 'Veg',
    mealType: 'Quick Meal',
    cookingTime: '15 mins',
    difficulty: 'Easy',
    servings: 2,
    rating: 4.5,
    calories: 320,
    ingredients: [
      { name: 'Noodles', quantity: '2 cakes' },
      { name: 'Chopped Veggies (Carrot, Cabbage, Capsicum)', quantity: '200g' },
      { name: 'Stir Fry Sauce', quantity: '1 pack' },
      { name: 'Garlic Oil', quantity: '1 sachet' }
    ]
  },
  {
    id: '4',
    title: 'Butter Chicken',
    description: 'Classic creamy tomato curry with tender chicken pieces.',
    image: 'https://www.mysavoryadventures.com/wp-content/uploads/2023/04/restaurant-style-butter-chicken.jpg',
    price: 449,
    category: 'Non-Veg',
    mealType: 'Dinner',
    cookingTime: '35 mins',
    difficulty: 'Medium',
    servings: 2,
    rating: 4.7,
    calories: 550,
    ingredients: [
      { name: 'Chicken', quantity: '300g' },
      { name: 'Makhani Gravy', quantity: '1 pack' },
      { name: 'Butter', quantity: '40g' },
      { name: 'Kasuri Methi', quantity: '1 tsp' }
    ]
  },
  {
    id: '5',
    title: 'Masala Pasta',
    description: 'Indian style pasta with tangy tomato sauce and spices.',
    image: 'https://www.spiceupthecurry.com/wp-content/uploads/2019/07/masala-pasta-recipe-16.jpg',
    price: 179,
    category: 'Veg',
    mealType: 'Snack',
    cookingTime: '20 mins',
    difficulty: 'Easy',
    servings: 2,
    rating: 4.3,
    calories: 300,
    ingredients: [
      { name: 'Penne Pasta', quantity: '200g' },
      { name: 'Pasta Sauce', quantity: '1 jar' },
      { name: 'Veggies', quantity: '100g' },
      { name: 'Cheese', quantity: '2 slices' }
    ]
  },
    {
    id: '6',
    title: 'Grilled Fish with Herbs',
    description: 'Healthy and light grilled fish with lemon butter sauce.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFOe91CbnUN8WLf0KkabzCLDHxXmO5jP5PqA&s',
    price: 549,
    category: 'Non-Veg',
    mealType: 'Dinner',
    cookingTime: '25 mins',
    difficulty: 'Medium',
    servings: 2,
    rating: 4.6,
    calories: 380,
    ingredients: [
      { name: 'Fish Fillet', quantity: '2 pcs' },
      { name: 'Lemon Butter Sauce', quantity: '50ml' },
      { name: 'Mixed Herbs', quantity: '1 sachet' },
      { name: 'Asparagus', quantity: '50g' }
    ]
  }
];

export const ADDONS: AddOn[] = [
  { id: 'a1', name: 'Amul Butter', price: 55, category: 'Essential', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe_iuhdl20eZ191RHDLFSx7fKgiqbMIWL2Mw&s' },
  { id: 'a2', name: 'Fresh Curd (Dahi)', price: 30, category: 'Essential', image: 'https://ayufarms.com/wp-content/uploads/2024/06/Toned-Milk-Dahi-Cup.jpg' },
  { id: 'a3', name: 'Desi Ghee', price: 45, category: 'Essential', image: 'https://cdn.shopaccino.com/refresh/articles/organic-desi-ghee-426160_l.jpg?v=591' },
  { id: 'a4', name: 'Everest Garam Masala', price: 65, category: 'Essential', image: 'https://cdn.shopaccino.com/edible-smart/products/everest-garam-masala-642547_l.jpg?v=651' },
  { id: 'a5', name: 'Fresh Paneer (200g)', price: 90, category: 'Essential', image: 'https://m.media-amazon.com/images/I/81hD14MN91L.jpg' },
  { id: 'a6', name: 'Olive Oil (100ml)', price: 150, category: 'Essential', image: 'https://images.apollo247.in/pub/media/catalog/product/a/p/apo0042_1_.jpg?tr=q-80,f-webp,w-400,dpr-3,c-at_max%20400w' },
  { id: 'u1', name: 'Non-Stick Pan', price: 899, category: 'Utensil', image: 'https://m.media-amazon.com/images/I/61k-5v-ENSL.jpg' },
  { id: 'u2', name: 'Wooden Spatula', price: 149, category: 'Utensil', image: 'https://www.theindusvalley.in/cdn/shop/products/neem-wood-spatula-set-for-cooking-and-serving-set-of-6-oval-stir-the-indus-valley-1.jpg?v=1640361956' },
  { id: 'u3', name: 'Kitchen Knife Set', price: 499, category: 'Utensil', image: 'https://seidoknives.com/cdn/shop/files/SeidoHero5-PieceMasterChefKnifeSet_1_1.jpg?v=1762439577' },
  { id: 'u4', name: 'Chopping Board', price: 299, category: 'Utensil', image: 'https://media-uk.landmarkshops.in/cdn-cgi/image/h=750,w=750,q=85,fit=cover/homecentre/1000012208417-1000012208416_01-2100.jpg' },
];