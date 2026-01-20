
import React from 'react';
import { Snack } from '../types';

interface SnackCardProps {
  snack: Snack;
  onAddToCart: (snack: Snack) => void;
}

const SnackCard: React.FC<SnackCardProps> = ({ snack, onAddToCart }) => {
  return (
    <div className="brutal-border brutal-border-gold flex flex-col h-full bg-white overflow-hidden group">
      <div className="relative h-64 overflow-hidden border-b-2 border-gray-100">
        <img 
          src={snack.image} 
          alt={snack.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-white border-2 border-[#111827] text-[#D32F2F] px-4 py-1 rounded-xl font-normal text-xl shadow-[3px_3px_0px_#111827]">
            R$ {snack.price.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1 bg-white">
        <h3 className="text-3xl font-impact text-[#D32F2F] mb-2 uppercase tracking-tight leading-none">
          {snack.name}
        </h3>
        
        <p className="text-gray-500 text-xs font-normal leading-relaxed mb-8 flex-1">
          {snack.description}
        </p>

        <button 
          onClick={() => onAddToCart(snack)}
          className="w-full bg-[#D32F2F] hover:bg-[#111827] text-white font-normal py-5 rounded-xl border-2 border-[#111827] shadow-[4px_4px_0px_#111827] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all uppercase text-[10px] tracking-widest"
        >
          ADICIONAR AO PEDIDO 🔥
        </button>
      </div>
    </div>
  );
};

export default SnackCard;
