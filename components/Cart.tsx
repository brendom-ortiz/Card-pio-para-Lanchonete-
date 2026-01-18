
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  phoneNumber: string;
  onClose: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ items, isOpen, phoneNumber, onClose, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    const date = new Date().toLocaleString('pt-BR');
    
    const itemString = items.map(item => 
      `✅ *${item.quantity}x ${item.name.toUpperCase()}*%0A   R$ ${(item.price * item.quantity).toFixed(2)}`
    ).join('%0A%0A');

    const separator = "--------------------------------";
    
    const message = 
      `🍟 *COMANDA DE PEDIDO - GUILHERME BURGERS* 🍟%0A` +
      `${separator}%0A` +
      `📅 *DATA:* ${date}%0A` +
      `${separator}%0A%0A` +
      `*ITENS DO PEDIDO:*%0A%0A` +
      `${itemString}%0A%0A` +
      `${separator}%0A` +
      `💰 *TOTAL: R$ ${total.toFixed(2)}*%0A` +
      `${separator}%0A%0A` +
      `_Cliente aguardando confirmação da cozinha do Guilherme._`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-slate-950 border-l border-amber-500/30 h-full shadow-2xl flex flex-col p-6 animate-slide-in-right">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-brand text-amber-500 tracking-widest uppercase">Vossa Comanda</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-2xl">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar no-scrollbar">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-6xl block mb-4">🛒</span>
              <p className="text-slate-500 italic">O carrinho está vazio por enquanto.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-amber-500/10" />
                <div className="flex-1">
                  <h4 className="text-white font-bold uppercase text-sm">{item.name}</h4>
                  <p className="text-amber-500 text-sm font-bold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center hover:bg-slate-700"
                    >
                      -
                    </button>
                    <span className="text-white text-sm font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center hover:bg-slate-700"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-red-500/30 hover:text-red-600 transition-colors">🗑️</button>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="flex justify-between text-xl font-bold text-white mb-6 uppercase tracking-wider">
            <span>Investimento</span>
            <span className="text-amber-500">R$ {total.toFixed(2)}</span>
          </div>
          <button 
            disabled={items.length === 0}
            onClick={handleCheckoutWhatsApp}
            className="w-full gradient-brand hover:brightness-110 disabled:grayscale text-white py-4 rounded-2xl font-bold text-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3 border border-white/10"
          >
            <span>Finalizar Comanda</span>
            <span className="text-xl">👑</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Cart;
