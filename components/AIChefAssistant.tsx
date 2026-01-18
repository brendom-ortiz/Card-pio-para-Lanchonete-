
import React, { useState } from 'react';
import { getChefRecommendation } from '../services/gemini';
import { Snack } from '../types';

interface AIChefAssistantProps {
  snacks: Snack[];
}

const AIChefAssistant: React.FC<AIChefAssistantProps> = ({ snacks }) => {
  const [prompt, setPrompt] = useState('');
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    const result = await getChefRecommendation(prompt, snacks);
    setRecommendation(result);
    setLoading(false);
    setPrompt('');
  };

  return (
    <div className="menu-page p-8 rounded-xl border border-amber-500/30 animate-slide-up shadow-2xl">
      <div className="text-center mb-8">
        <span className="text-5xl block mb-4">👑</span>
        <h2 className="text-3xl font-brand text-amber-500 tracking-widest uppercase">Consultor da Realeza</h2>
        <p className="text-slate-300 text-sm italic">"Permita-me sugerir uma iguaria para vossa fome."</p>
      </div>

      <form onSubmit={handleAsk} className="relative mb-8">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ex: Procuro um burger com muito queijo e bacon..."
          className="w-full bg-slate-900/50 text-white border-b-2 border-amber-500/30 py-4 px-2 focus:outline-none focus:border-amber-500 transition-all placeholder:text-slate-700 italic"
        />
        <button 
          type="submit"
          disabled={loading}
          className="absolute right-0 bottom-4 text-amber-500 font-bold hover:text-white transition-colors uppercase text-sm tracking-tighter"
        >
          {loading ? 'Consultando...' : 'Consultar ✨'}
        </button>
      </form>

      {recommendation && (
        <div className="bg-amber-500/5 p-6 rounded-lg border-l-4 border-amber-500 animate-fade-in italic text-slate-100 text-lg leading-relaxed font-menu">
          "{recommendation}"
        </div>
      )}
    </div>
  );
};

export default AIChefAssistant;
