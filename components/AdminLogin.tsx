
import React, { useState } from 'react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Credenciais: Usuário 'Admin' e Senha '08092003'
    if (username === 'Admin' && password === '08092003') {
      onLoginSuccess();
    } else {
      setError('Acesso negado. Verifique as credenciais.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-900/60 p-8 rounded-3xl border border-amber-500/30 shadow-2xl animate-slide-up backdrop-blur-md">
      <div className="text-center mb-8">
        <div className="gradient-brand w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl shadow-lg border border-white/20">
          🔑
        </div>
        <h2 className="text-3xl font-brand text-amber-500 tracking-widest uppercase">Cofre de Dados</h2>
        <p className="text-slate-400 text-sm mt-2">Acesso restrito para mestres churrasqueiros.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-amber-500 uppercase mb-2 ml-1">Usuário</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:ring-2 ring-amber-500 outline-none transition-all placeholder:text-slate-800"
            placeholder="Nome de usuário"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-amber-500 uppercase mb-2 ml-1">Senha</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:ring-2 ring-amber-500 outline-none transition-all placeholder:text-slate-800"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="text-red-500 text-center text-sm font-semibold bg-red-950/20 py-2 rounded-lg border border-red-900/30">
            {error}
          </p>
        )}

        <button 
          type="submit"
          className="w-full gradient-brand hover:brightness-110 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 shadow-red-900/20"
        >
          Desbloquear Sistema
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
