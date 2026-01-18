
import React from 'react';
import { Snack } from '../types';

interface SnackCardProps {
  snack: Snack;
  onAddToCart: (snack: Snack) => void;
}

const SnackCard: React.FC<SnackCardProps> = ({ snack, onAddToCart }) => {
  return (
    <div className="group relative flex flex-col md:flex-row gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 items-center md:items-start">
      {/* Miniatura da Foto estilo Selo com borda Gold */}
      <div className="relative w-24 h-24 flex-shrink-0">
        <img 
          src={snack.image} 
          alt={snack.name} 
          className="w-full h-full object-cover rounded-full border-2 border-amber-500/50 shadow-lg group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-slate-900/40 to-transparent"></div>
      </div>

      <div className="flex-1 flex flex-col w-full">
        <div className="flex items-end justify-between w-full mb-1">
          <h3 className="text-xl font-brand tracking-wider text-white uppercase group-hover:text-amber-500 transition-colors">
            {snack.name}
          </h3>
          <div className="dotted-line hidden md:block"></div>
          <span className="price-tag text-2xl">
            R$ {snack.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-slate-300 text-sm italic font-light leading-relaxed mb-3">
          {snack.description}
        </p>

        <button 
          onClick={() => onAddToCart(snack)}
          className="self-start text-xs font-bold uppercase tracking-widest text-red-600 hover:text-white border border-red-600/30 hover:bg-red-600 px-4 py-1.5 rounded-full transition-all active:scale-95 shadow-md shadow-red-900/20"
        >
          + Solicitar
        </button>
      </div>
    </div>
  );
};

export default SnackCard;
