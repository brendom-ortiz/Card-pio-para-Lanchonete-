
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
  const [sharedLoaded, setSharedLoaded] = useState(false);
  
  const STORAGE_KEY = 'supremo_burger_v2_data';
  const PHONE_KEY = 'supremo_burger_v2_phone';
  
  // Lógica para carregar dados: 
  // 1. Tenta pegar da URL (compartilhamento)
  // 2. Tenta pegar do LocalStorage (edição local)
  // 3. Usa o padrão do código (constants.tsx)
  const [snacks, setSnacks] = useState<Snack[]>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const sharedData = params.get('d');
      if (sharedData) {
        const decoded = JSON.parse(decodeURIComponent(atob(sharedData)));
        if (Array.isArray(decoded.snacks)) return decoded.snacks;
      }
      
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_SNACKS;
    } catch (e) {
      return INITIAL_SNACKS;
    }
  });

  const [phoneNumber, setPhoneNumber] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const sharedData = params.get('d');
      if (sharedData) {
        const decoded = JSON.parse(decodeURIComponent(atob(sharedData)));
        if (decoded.phoneNumber) return decoded.phoneNumber;
      }
      return localStorage.getItem(PHONE_KEY) || '5511999999999';
    } catch (e) {
      return '5511999999999';
    }
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('d')) {
      setSharedLoaded(true);
      setTimeout(() => setSharedLoaded(false), 5000);
      // Limpa a URL para não ficar gigante, mas mantém os dados no estado
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snacks));
  }, [snacks]);

  useEffect(() => {
    localStorage.setItem(PHONE_KEY, phoneNumber);
  }, [phoneNumber]);

  // Fix: Move state declarations before useMemo to ensure variables are defined before use
  const [activeCategory, setActiveCategory] = useState('Combos');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-[#F9F7F2]">
      
      {sharedLoaded && (
        <div className="fixed top-24 z-[60] bg-[#10B981] text-white px-6 py-3 rounded-full shadow-2xl animate-bounce text-xs font-normal border-2 border-white">
          ✨ Cardápio sincronizado via link com sucesso!
        </div>
      )}

      {/* BARRA DE NAVEGAÇÃO FIXA NO TOPO */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-[#111827]/10 flex justify-center py-4 px-4 fixed-nav-shadow">
        <nav className="flex w-full max-w-2xl gap-2">
          {[
            { id: 'menu', label: 'CARDÁPIO', icon: '📋' },
            { id: 'ai', label: 'CHEF AI', icon: '🤖' },
            { id: 'admin', label: 'SISTEMA', icon: '⚙️' }
          ].map((mode) => (
            <button 
              key={mode.id}
              onClick={() => setViewMode(mode.id as ViewMode)}
              className={`flex-1 px-4 py-4 rounded-2xl font-normal text-[11px] transition-all duration-300 flex items-center justify-center gap-3 border-2 border-transparent ${
                viewMode === mode.id 
                ? 'active-tab shadow-[5px_5px_0px_#C5A021] bg-[#111827] text-white' 
                : 'text-gray-400 hover:text-[#D32F2F] hover:bg-[#D32F2F]/5'
              }`}
            >
              <span className="text-lg">{mode.icon}</span>
              {mode.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="pt-24 w-full flex flex-col items-center">
        {/* HEADER LOGO */}
        <header className="pt-12 pb-16 px-4 w-full flex flex-col items-center animate-logo-entry">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#C5A021]/10 rounded-full blur-3xl scale-150 group-hover:bg-[#D32F2F]/10 transition-all duration-700"></div>
            
            <div className="relative flex flex-col items-center animate-floating">
              <div className="mb-6 transform transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                <span className="text-7xl md:text-8xl filter drop-shadow-[0_10px_10px_rgba(211,47,47,0.15)]">🍔</span>
              </div>

              <h1 className="text-center select-none">
                <span className="block text-7xl md:text-[9rem] font-impact leading-[0.8] text-[#D32F2F] tracking-tighter transform group-hover:-translate-y-2 transition-transform duration-300">
                  SUPREMO
                </span>
                <span className="block text-5xl md:text-[5.5rem] font-impact leading-[0.8] shine-gold-text tracking-[0.15em] -mt-1 md:-mt-2 transform group-hover:translate-y-2 transition-transform duration-300">
                  BURGER
                </span>
              </h1>
            </div>
          </div>

          <div className="mt-10 bg-[#D32F2F] border-2 border-[#C5A021] px-10 py-2 rounded-full transform -rotate-2 hover:rotate-0 transition-all cursor-default shadow-[4px_4px_0px_#C5A021]">
            <p className="text-white font-normal text-xs uppercase tracking-[0.5em]">O Rei do Sabor</p>
          </div>
        </header>

        <main className="w-full max-w-6xl px-6 pb-48 flex flex-col items-center">
          {viewMode === 'menu' && (
            <div className="w-full flex flex-col items-center space-y-12">
              {/* Categorias */}
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 w-full justify-start md:justify-center">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-8 py-4 rounded-2xl text-[11px] font-normal transition-all whitespace-nowrap border-2 ${
                      activeCategory === cat.id 
                      ? 'border-[#111827] bg-[#111827] text-white shadow-[4px_4px_0px_#C5A021]' 
                      : 'border-[#111827]/5 text-gray-400 hover:border-[#D32F2F]/30 hover:bg-white bg-white/50'
                    }`}
                  >
                    <span className="mr-2 text-base">{cat.icon}</span>
                    {cat.label.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                {filteredSnacks.map(snack => (
                  <SnackCard key={snack.id} snack={snack} onAddToCart={addToCart} />
                ))}
              </div>
            </div>
          )}

          {viewMode === 'ai' && (
            <div className="w-full max-w-2xl mx-auto">
              <AIChefAssistant snacks={snacks} />
            </div>
          )}

          {viewMode === 'admin' && (
            <div className="w-full flex justify-center">
              {isAdminLoggedIn ? (
                <AdminPanel 
                  snacks={snacks} 
                  phoneNumber={phoneNumber}
                  onUpdatePhone={setPhoneNumber}
                  onUpdateSnack={(s) => setSnacks(prev => prev.map(old => old.id === s.id ? s : old))}
                  onAddSnack={(s) => setSnacks(prev => [...prev, s])}
                  onDeleteSnack={(id) => setSnacks(prev => prev.filter(s => s.id !== id))}
                  onImportAll={(newSnacks) => setSnacks(newSnacks)}
                  onLogout={() => setIsAdminLoggedIn(false)}
                />
              ) : (
                <AdminLogin onLoginSuccess={() => setIsAdminLoggedIn(true)} />
              )}
            </div>
          )}
        </main>
      </div>

      {/* Botão Flutuante do Carrinho */}
      <div className="fixed bottom-10 right-10 z-50">
        <button 
          onClick={() => setIsCartOpen(true)}
          className="bg-[#D32F2F] text-white w-20 h-20 rounded-2xl border-4 border-[#111827] shadow-[6px_6px_0px_#111827] hover:scale-105 active:scale-95 transition-all flex items-center justify-center relative group"
        >
          <span className="text-3xl group-hover:rotate-12 transition-transform">🛒</span>
          {totalItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#C5A021] text-black text-xs font-normal h-10 w-10 rounded-full flex items-center justify-center border-4 border-[#111827] shadow-lg animate-bounce">
              {totalItemsCount}
            </span>
          )}
        </button>
      </div>

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
