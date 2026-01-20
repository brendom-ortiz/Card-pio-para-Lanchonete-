
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
    <div className="bg-white border-4 border-[#111827] rounded-[2.5rem] p-10 shadow-[12px_12px_0px_rgba(17,24,39,1)]">
      <div className="text-center mb-10">
        <div className="w-24 h-24 mx-auto mb-6 bg-[#111827] border-2 border-[#C5A021] rounded-[2rem] flex items-center justify-center text-5xl shadow-xl animate-bounce">
           🍔
        </div>
        <h2 className="text-5xl font-impact text-[#D32F2F] uppercase tracking-tighter">CHEF <span className="text-[#C5A021]">SUPREMO</span></h2>
        <p className="text-gray-400 font-normal text-[10px] mt-2 tracking-[0.5em] uppercase">Inteligência Gourmet</p>
      </div>

      <form onSubmit={handleAsk} className="space-y-6">
        <div className="relative">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="O que você deseja saborear hoje?"
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-6 px-8 text-[#D32F2F] placeholder:text-gray-300 outline-none focus:border-[#C5A021]/30 transition-all font-normal text-lg"
          />
        </div>
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-[#111827] text-white py-6 text-[10px] rounded-2xl border-2 border-[#111827] font-normal uppercase tracking-widest hover:bg-[#D32F2F] shadow-[6px_6px_0px_#C5A021] disabled:opacity-50 transition-all"
        >
          {loading ? 'BUSCANDO SABOR...' : 'RECEBER RECOMENDAÇÃO SUPREMA'}
        </button>
      </form>

      {recommendation && (
        <div className="mt-12 bg-white border-2 border-gray-100 p-8 rounded-[2rem] shadow-[8px_8px_0px_#C5A021]">
          <p className="text-gray-800 text-xl leading-relaxed font-normal italic">
            "{recommendation}"
          </p>
        </div>
      )}
    </div>
  );
};

export default AIChefAssistant;
