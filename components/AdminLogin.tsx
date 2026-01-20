
import React, { useState } from 'react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === 'Admin' && pass === '08092003') {
      onLoginSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto p-12 brutal-border bg-white w-full border-t-8 border-[#C5A021]">
      <div className="text-center mb-12">
        <span className="text-5xl block mb-6">👑</span>
        <h2 className="text-3xl font-impact text-[#D32F2F] uppercase tracking-tight">ACESSO <span className="text-[#C5A021]">SUPREMO</span></h2>
        <p className="text-[10px] text-gray-400 font-normal uppercase tracking-widest mt-2">Área de Gerenciamento</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input 
          type="text"
          value={user}
          onChange={e => setUser(e.target.value)}
          className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-5 text-gray-900 outline-none focus:border-[#C5A021]/30 transition-all font-normal"
          placeholder="Usuário"
        />
        <input 
          type="password"
          value={pass}
          onChange={e => setPass(e.target.value)}
          className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-5 text-gray-900 outline-none focus:border-[#C5A021]/30 transition-all font-normal"
          placeholder="Senha"
        />

        {error && (
          <p className="text-xs text-[#D32F2F] text-center font-normal animate-bounce">Credenciais Inválidas!</p>
        )}

        <button type="submit" className="bg-[#111827] text-white w-full py-5 rounded-2xl text-xs font-normal border-2 border-[#111827] hover:bg-[#D32F2F] hover:border-[#D32F2F] transition-all shadow-[6px_6px_0px_#C5A021]">ENTRAR NO SISTEMA</button>
      </form>
    </div>
  );
};

export default AdminLogin;
