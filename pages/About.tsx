import React from 'react';
import { ChefHat, Heart, Leaf, Clock, Users, Award, Smile } from 'lucide-react';

export const About = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        <img 
          src="https://static.vecteezy.com/system/resources/previews/029/340/815/non_2x/ready-to-eat-meal-sign-label-precooked-food-stock-illustration-vector.jpg" 
          alt="Kitchen Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <span className="inline-block bg-brand-green/20 backdrop-blur-md border border-brand-green/30 text-brand-yellow font-bold px-4 py-1.5 rounded-full mb-6 text-sm uppercase tracking-wider">
            Established 2023
          </span>
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Revolutionizing <br/><span className="text-brand-green">Home Cooking</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
            We deliver perfectly portioned fresh ingredients so you can cook delicious meals in minutes, not hours.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-brand-black text-white py-12 -mt-16 relative z-20 max-w-6xl mx-auto rounded-xl shadow-2xl px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-800">
          <div>
            <div className="text-4xl font-bold text-brand-green mb-2">50k+</div>
            <div className="text-gray-400 text-sm uppercase tracking-wide">Meals Delivered</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-brand-yellow mb-2">10k+</div>
            <div className="text-gray-400 text-sm uppercase tracking-wide">Happy Chefs</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-2">100+</div>
            <div className="text-gray-400 text-sm uppercase tracking-wide">Partner Farms</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-pink-400 mb-2">4.9</div>
            <div className="text-gray-400 text-sm uppercase tracking-wide">App Rating</div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 relative">
             <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-yellow/20 rounded-full z-0"></div>
             <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-brand-green/20 rounded-full z-0"></div>
             <img 
              src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" 
              alt="Fresh Ingredients" 
              className="rounded-2xl shadow-2xl relative z-10 hover:scale-[1.02] transition duration-500"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                <span className="text-brand-green font-bold text-xl">Ready To Eat</span> started in a small apartment kitchen in Bangalore. We realized that while people love eating good food, the process of planning, shopping, and measuring ingredients was often too tiring after a long day of work.
              </p>
              <p>
                We set out to create a solution: perfectly portioned ingredient kits with easy-to-follow recipes, delivered in under an hour. 
              </p>
              <p>
                Today, we help thousands of families cook fresh, healthy meals every single day without the waste or the hassle. We are more than just a delivery service; we are your sous-chef.
              </p>
            </div>
            <div className="mt-8 flex gap-4">
               <div className="flex items-center gap-2 text-gray-800 font-semibold bg-gray-100 px-4 py-2 rounded-lg">
                 <Award className="text-brand-yellow" /> Award Winning Service
               </div>
               <div className="flex items-center gap-2 text-gray-800 font-semibold bg-gray-100 px-4 py-2 rounded-lg">
                 <Smile className="text-brand-green" /> 100% Satisfaction
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">Why Choose Ready To Eat?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">We don't just deliver food, we deliver an experience. Here is what makes us special.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Leaf, title: 'Freshness First', desc: 'Sourced directly from local farms every morning to ensure crisp vegetables and fresh meats.', color: 'text-green-600', bg: 'bg-green-100' },
              { icon: Heart, title: 'Zero Waste', desc: 'Pre-portioned ingredients mean you use exactly what you need. No more throwing away food.', color: 'text-red-600', bg: 'bg-red-100' },
              { icon: Clock, title: 'Time Saver', desc: 'Skip the grocery store queues and meal planning. We deliver everything in 60 minutes.', color: 'text-blue-600', bg: 'bg-blue-100' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 text-center group border border-gray-100">
                <div className={`w-20 h-20 ${item.bg} ${item.color} rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition duration-300`}>
                  <item.icon size={40} />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-4 text-gray-900">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="font-heading text-4xl font-bold text-gray-900 text-center mb-16">The Masterminds</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
           {[
             { name: 'Alex Richardson', role: 'Culinary Director', img: 32 },
             { name: 'Sarah Chen', role: 'Head of Sourcing', img: 44 },
             { name: 'Marcus Johnson', role: 'Operations Lead', img: 11 },
             { name: 'Priya Patel', role: 'Recipe Developer', img: 24 }
           ].map((member, i) => (
             <div key={i} className="text-center group">
               <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[3/4] shadow-md">
                 <img 
                   src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${member.img}.jpg`} 
                   alt={member.name} 
                   className="w-full h-full object-cover group-hover:scale-110 transition duration-700 grayscale group-hover:grayscale-0"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center pb-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                        <div className="flex gap-3 justify-center text-white">
                           {/* Social Icons Placeholder */}
                           <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xs hover:bg-brand-green cursor-pointer">IN</div>
                           <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xs hover:bg-brand-green cursor-pointer">TW</div>
                        </div>
                    </div>
                 </div>
               </div>
               <h3 className="font-heading font-bold text-xl text-gray-900">{member.name}</h3>
               <p className="text-brand-green font-medium text-sm mt-1">{member.role}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};