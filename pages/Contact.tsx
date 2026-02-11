import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, X, Bot } from 'lucide-react';
import { useApp } from '../context';

export const Contact = () => {
  const { addToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{id: string, text: string, sender: 'user' | 'bot'}[]>([
    { id: '1', text: 'Hi there! 👋 Welcome to Ready To Eat Support. How can we help you today?', sender: 'bot' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    if (isChatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const newMessage = { id: Date.now().toString(), text: currentMessage, sender: 'user' as const };
    setChatMessages(prev => [...prev, newMessage]);
    setCurrentMessage('');

    // Simulate Bot Response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "Thanks for reaching out! Our support team is currently busy packing fresh orders 📦. We will get back to you here shortly.",
        sender: 'bot'
      }]);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log('Form submitted:', formData);
    addToast('Message sent successfully! We will get back to you soon.', 'success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-brand-black text-white py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
           <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
           <p className="text-gray-400 text-lg md:text-xl">Have a question about a recipe? Need help with an order? We're here to help you 24/7.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Cards */}
          <div className="lg:col-span-1 space-y-6">
             {/* Main Info Card */}
             <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-start gap-5 mb-8 group">
                  <div className="bg-green-100 p-4 rounded-xl text-green-600 group-hover:bg-brand-green group-hover:text-white transition duration-300">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Phone Support</h3>
                    <p className="text-gray-500 font-medium">+91 98765 43210</p>
                    <p className="text-xs text-gray-400 mt-1">Mon-Sun 9am to 10pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 mb-8 group">
                  <div className="bg-blue-100 p-4 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-500 font-medium">support@readytoeat.com</p>
                    <p className="text-gray-500 text-sm">partnerships@readytoeat.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="bg-orange-100 p-4 rounded-xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition duration-300">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Headquarters</h3>
                    <p className="text-gray-500 text-sm">123 Foodie Street, Culinary Park,<br/>Bangalore - 560001, India</p>
                  </div>
                </div>
             </div>

             {/* Live Chat Teaser */}
             <div className="bg-gradient-to-br from-brand-green to-green-700 p-8 rounded-2xl shadow-lg text-white">
                <MessageSquare size={32} className="mb-4 opacity-80" />
                <h3 className="font-heading font-bold text-xl mb-2">Live Chat</h3>
                <p className="text-green-100 text-sm mb-6">Wait time: ~2 minutes. Chat with our support agents directly.</p>
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="bg-white text-brand-green w-full py-3 rounded-xl font-bold hover:bg-green-50 transition shadow-md hover:shadow-lg"
                >
                  Start Chat
                </button>
             </div>
          </div>

          {/* Form & Map */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="font-heading text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                Send us a Message <span className="text-brand-green">.</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-sm font-semibold text-gray-700">Your Name</label>
                     <input 
                       type="text" 
                       name="name"
                       value={formData.name}
                       onChange={handleChange}
                       required
                       className="input-field bg-gray-50 border-gray-200 focus:bg-white transition"
                       placeholder="John Doe"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-semibold text-gray-700">Email Address</label>
                     <input 
                       type="email" 
                       name="email"
                       value={formData.email}
                       onChange={handleChange}
                       required
                       className="input-field bg-gray-50 border-gray-200 focus:bg-white transition"
                       placeholder="john@example.com"
                     />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-semibold text-gray-700">Subject</label>
                   <input 
                     type="text" 
                     name="subject"
                     value={formData.subject}
                     onChange={handleChange}
                     required
                     className="input-field bg-gray-50 border-gray-200 focus:bg-white transition"
                     placeholder="How can we help?"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-semibold text-gray-700">Message</label>
                   <textarea 
                     name="message"
                     value={formData.message}
                     onChange={handleChange}
                     required
                     rows={5}
                     className="input-field bg-gray-50 border-gray-200 focus:bg-white transition resize-none"
                     placeholder="Tell us more about your inquiry..."
                   ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="bg-brand-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition flex items-center justify-center gap-2 w-full md:w-auto min-w-[200px]"
                >
                  <Send size={20} /> Send Message
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 h-80 overflow-hidden">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.886539092!2d77.49085452149588!3d12.953959988118836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1709904445558!5m2!1sen!2sin" 
                 width="100%" 
                 height="100%" 
                 style={{border:0, borderRadius: '1rem'}} 
                 allowFullScreen={true} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
               ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Widget Overlay */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-[90vw] md:w-96 bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Chat Header */}
          <div className="bg-brand-green p-4 flex justify-between items-center text-white">
             <div className="flex items-center gap-3">
               <div className="bg-white/20 p-2 rounded-full"><Bot size={20} /></div>
               <div>
                 <h3 className="font-bold text-sm">Ready To Eat Support</h3>
                 <p className="text-xs text-green-100 flex items-center gap-1">
                   <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span> Online
                 </p>
               </div>
             </div>
             <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition">
               <X size={20} />
             </button>
          </div>

          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50 space-y-4">
             {chatMessages.map(msg => (
               <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                 <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                   msg.sender === 'user' 
                     ? 'bg-brand-green text-white rounded-tr-none shadow-md' 
                     : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                 }`}>
                   {msg.text}
                 </div>
               </div>
             ))}
             <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
             <input 
               type="text" 
               value={currentMessage}
               onChange={e => setCurrentMessage(e.target.value)}
               placeholder="Type a message..."
               className="flex-1 bg-gray-50 border-transparent focus:bg-white focus:border-brand-green rounded-xl px-4 py-2.5 text-sm outline-none border transition"
             />
             <button 
               type="submit" 
               disabled={!currentMessage.trim()}
               className="bg-brand-green text-white p-2.5 rounded-xl hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
             >
               <Send size={18} />
             </button>
          </form>
        </div>
      )}
    </div>
  );
};