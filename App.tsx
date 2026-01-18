
import React, { useState, useMemo, useEffect } from 'react';
import { CATEGORIES, SNACKS as INITIAL_SNACKS } from './constants';
import { Snack, CartItem } from './types';
import SnackCard from './components/SnackCard';
import Cart from './components/Cart';
import AIChefAssistant from './components/AIChefAssistant';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';

type ViewMode = 'menu' | 'ai' | 'admin';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('menu');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  
  // Persistência do Cardápio
  const [snacks, setSnacks] = useState<Snack[]>(() => {
    const saved = localStorage.getItem('guilherme_burgers_v1');
    return saved ? JSON.parse(saved) : INITIAL_SNACKS;
  });

  // Persistência do Número do WhatsApp
  const [phoneNumber, setPhoneNumber] = useState(() => {
    return localStorage.getItem('guilherme_burgers_phone') || '5511999999999';
  });

  const [activeCategory, setActiveCategory] = useState('Burgers');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Auto-save effects
  useEffect(() => {
    localStorage.setItem('guilherme_burgers_v1', JSON.stringify(snacks));
  }, [snacks]);

  useEffect(() => {
    localStorage.setItem('guilherme_burgers_phone', phoneNumber);
  }, [phoneNumber]);

  const filteredSnacks = useMemo(() => 
    snacks.filter(s => s.category === activeCategory),
    [activeCategory, snacks]
  );

  const addToCart = (snack: Snack) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === snack.id);
      if (existing) {
        return prev.map(item => 
          item.id === snack.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...snack, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateSnack = (updatedSnack: Snack) => {
    setSnacks(prev => prev.map(s => s.id === updatedSnack.id ? updatedSnack : s));
  };

  const handleAddSnack = (newSnack: Snack) => {
    setSnacks(prev => [...prev, newSnack]);
  };

  const handleDeleteSnack = (id: string) => {
    setSnacks(prev => prev.filter(s => s.id !== id));
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setViewMode('menu');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      <header className="py-8 px-4 text-center">
        <div className="inline-block relative">
          <div className="absolute -inset-4 bg-purple-600 blur-2xl opacity-10 animate-pulse"></div>
          <h1 className="text-5xl md:text-7xl font-brand tracking-tighter text-white uppercase leading-none relative">
            GUILHERME <span className="text-amber-500">BURGERS</span>
          </h1>
          <p className="text-amber-500 font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mt-3">
            Premium Taste <span className="text-red-600">&</span> Royal Service
          </p>
        </div>
      </header>

      <div className="sticky top-4 z-40 max-w-fit mx-auto mb-10">
        <nav className="flex bg-slate-900/80 backdrop-blur-xl p-1.5 rounded-full border border-amber-500/30 shadow-2xl">
          <button 
            onClick={() => setViewMode('menu')}
            className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${
              viewMode === 'menu' ? 'gradient-brand text-white shadow-lg' : 'text-slate-400 hover:text-amber-500'
            }`}
          >
            Cardápio
          </button>
          <button 
            onClick={() => setViewMode('ai')}
            className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${
              viewMode === 'ai' ? 'gradient-brand text-white shadow-lg' : 'text-slate-400 hover:text-amber-500'
            }`}
          >
            Chef IA
          </button>
          <button 
            onClick={() => setViewMode('admin')}
            className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${
              viewMode === 'admin' ? 'gradient-brand text-white shadow-lg' : 'text-slate-400 hover:text-amber-500'
            }`}
          >
            Admin
          </button>
        </nav>
      </div>

      <main className="max-w-4xl mx-auto px-4">
        {viewMode === 'menu' && (
          <div className="menu-page p-6 md:p-12 rounded-lg animate-slide-up relative">
            <header className="text-center mb-10">
              <h2 className="text-4xl font-brand text-amber-500 tracking-widest mb-2 uppercase">Menu Real</h2>
              <div className="w-24 h-1 gradient-brand mx-auto"></div>
            </header>

            <div className="flex justify-center gap-4 flex-wrap mb-12">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 border-b-2 transition-all font-bold uppercase text-xs tracking-widest ${
                    activeCategory === cat.id 
                    ? 'border-amber-500 text-amber-500' 
                    : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredSnacks.map(snack => (
                <SnackCard key={snack.id} snack={snack} onAddToCart={addToCart} />
              ))}
            </div>
            <div className="menu-divider"></div>
            <footer className="text-center opacity-50 text-xs italic text-slate-300">
              * Guilherme Burgers: Qualidade superior em cada mordida.
            </footer>
          </div>
        )}

        {viewMode === 'ai' && (
          <div className="max-w-2xl mx-auto py-10">
             <AIChefAssistant snacks={snacks} />
          </div>
        )}

        {viewMode === 'admin' && (
          <div className="max-w-4xl mx-auto py-10">
            {isAdminLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={handleLogout}
                  className="absolute -top-12 right-0 text-amber-500 text-xs font-bold uppercase hover:underline"
                >
                  Sair do Painel
                </button>
                <AdminPanel 
                  snacks={snacks} 
                  phoneNumber={phoneNumber}
                  onUpdatePhone={setPhoneNumber}
                  onUpdateSnack={handleUpdateSnack} 
                  onAddSnack={handleAddSnack}
                  onDeleteSnack={handleDeleteSnack}
                />
              </div>
            ) : (
              <AdminLogin onLoginSuccess={() => setIsAdminLoggedIn(true)} />
            )}
          </div>
        )}
      </main>

      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-50 gradient-brand p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group border-2 border-white/20"
      >
        <span className="text-2xl">🛒</span>
        {totalCartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-black w-6 h-6 flex items-center justify-center rounded-full shadow-lg">
            {totalCartCount}
          </span>
        )}
      </button>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        phoneNumber={phoneNumber}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
    </div>
  );
};

export default App;
