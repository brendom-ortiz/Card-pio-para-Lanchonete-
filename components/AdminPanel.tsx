
import React, { useState, useRef } from 'react';
import { Snack } from '../types';
import { CATEGORIES } from '../constants';

interface AdminPanelProps {
  snacks: Snack[];
  phoneNumber: string;
  onUpdatePhone: (num: string) => void;
  onUpdateSnack: (updatedSnack: Snack) => void;
  onAddSnack: (newSnack: Snack) => void;
  onDeleteSnack: (id: string) => void;
  onLogout: () => void;
  onImportAll: (newSnacks: Snack[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  snacks, 
  phoneNumber, 
  onUpdatePhone, 
  onUpdateSnack, 
  onAddSnack, 
  onDeleteSnack,
  onLogout,
  onImportAll
}) => {
  const [editingSnackId, setEditingSnackId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Snack | null>(null);
  const [showPublishCode, setShowPublishCode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (formData) {
      onUpdateSnack(formData);
      setEditingSnackId(null);
      setFormData(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && formData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const generateShareLink = () => {
    const data = { snacks, phoneNumber };
    const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
    const url = `${window.location.origin}${window.location.pathname}?d=${encoded}`;
    
    navigator.clipboard.writeText(url).then(() => {
      alert("Link do cardápio copiado! Quem abrir este link verá exatamente o que você configurou agora.");
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify({ snacks, phoneNumber }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'cardapio_backup.json');
    linkElement.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.snacks) onImportAll(json.snacks);
        if (json.phoneNumber) onUpdatePhone(json.phoneNumber);
        alert('Dados importados com sucesso!');
      } catch (err) { alert('Erro no arquivo.'); }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-12 pb-24 text-gray-900 w-full max-w-5xl mx-auto flex flex-col items-center font-normal">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full px-6">
        <h2 className="text-4xl font-impact text-[#D32F2F] italic uppercase">GERÊNCIA <span className="text-[#C5A021]">SUPREMA</span></h2>
        <button onClick={onLogout} className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-3 rounded-xl text-xs font-normal transition-all border border-gray-300">Encerrar Sessão</button>
      </div>

      <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* COMPARTILHAMENTO RÁPIDO */}
        <div className="bg-white p-8 rounded-[2.5rem] border-4 border-[#10B981] shadow-xl text-center flex flex-col justify-center items-center">
          <span className="text-4xl mb-4">🔗</span>
          <h3 className="text-xl font-impact text-gray-900 mb-2 uppercase">Link de Compartilhamento</h3>
          <p className="text-[10px] font-normal text-gray-400 mb-6 px-4">
            Gere um link especial que abre o cardápio exatamente como ele está agora em qualquer navegador.
          </p>
          <button 
            onClick={generateShareLink}
            className="bg-[#10B981] text-white px-10 py-5 rounded-2xl text-xs w-full font-normal border-2 border-transparent hover:bg-[#059669] transition-all shadow-[6px_6px_0px_#111827]"
          >
            GERAR E COPIAR LINK ✨
          </button>
        </div>

        {/* PERSISTÊNCIA NO CÓDIGO */}
        <div className="bg-white p-8 rounded-[2.5rem] border-4 border-[#C5A021] shadow-xl text-center">
          <span className="text-4xl mb-4">💾</span>
          <h3 className="text-xl font-impact text-gray-900 mb-2 uppercase">Salvar no Código (Permanente)</h3>
          <p className="text-[10px] font-normal text-gray-400 mb-6 px-4">
            Para que o link principal do site salve suas mudanças para sempre, você precisa me enviar o código abaixo.
          </p>
          <button 
            onClick={() => setShowPublishCode(!showPublishCode)}
            className="bg-[#111827] text-white px-10 py-5 rounded-2xl text-xs w-full font-normal border-2 border-transparent hover:border-[#C5A021] transition-all"
          >
            {showPublishCode ? 'OCULTAR CÓDIGO' : 'VER CÓDIGO DE PUBLICAÇÃO'}
          </button>
        </div>
      </div>

      {showPublishCode && (
        <div className="w-full px-6 animate-fade-in">
          <div className="bg-white border-4 border-[#111827] rounded-[2rem] p-8">
            <label className="text-[10px] font-normal uppercase text-[#C5A021] mb-2 block font-impact">COPIE O TEXTO ABAIXO E ME ENVIE NO CHAT:</label>
            <textarea 
              readOnly 
              className="w-full h-48 bg-gray-50 border-2 border-gray-100 rounded-2xl p-6 text-[10px] font-mono overflow-auto font-normal"
              value={JSON.stringify({ snacks, phoneNumber }, null, 2)}
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
            />
            <p className="text-[9px] mt-4 text-[#D32F2F] font-normal uppercase italic">Ao me enviar este código, eu atualizarei a base de dados do sistema para que fique salva para todos os usuários!</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-6">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center">
          <h3 className="text-xs font-normal mb-6 uppercase tracking-widest text-gray-300">Backup em Arquivo</h3>
          <div className="flex gap-4">
            <button onClick={handleExport} className="bg-[#111827] text-white px-6 py-4 rounded-2xl text-[10px] flex-1 font-normal">Exportar JSON</button>
            <button onClick={() => importInputRef.current?.click()} className="bg-[#111827] text-white px-6 py-4 rounded-2xl text-[10px] flex-1 font-normal">Importar JSON</button>
            <input type="file" ref={importInputRef} onChange={handleImport} className="hidden" accept=".json" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="text-xs font-normal mb-6 uppercase tracking-widest text-gray-300">WhatsApp de Vendas</h3>
          <input 
            type="text" 
            value={phoneNumber}
            onChange={(e) => onUpdatePhone(e.target.value)}
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-sm focus:border-[#D32F2F]/30 transition-all outline-none font-normal text-center"
            placeholder="Ex: 5511999999999"
          />
        </div>
      </div>

      {/* LISTA DE EDIÇÃO */}
      <div className="w-full px-6 space-y-16">
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="w-full">
            <div className="flex justify-between items-center mb-8 border-b-2 border-gray-100 pb-4">
              <h4 className="text-2xl font-impact text-[#D32F2F]">{cat.icon} {cat.label}</h4>
              <button 
                onClick={() => onAddSnack({
                  id: `snack-${Date.now()}`,
                  name: 'NOVO LANCHE',
                  description: 'Ingredientes premium...',
                  price: 0,
                  category: cat.id as Snack['category'],
                  image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=400'
                })}
                className="bg-[#111827] text-white px-6 py-3 rounded-xl text-[10px] font-normal"
              >
                + ITEM
              </button>
            </div>

            <div className="grid gap-4 w-full">
              {snacks.filter(s => s.category === cat.id).map(snack => (
                <div key={snack.id} className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
                  {editingSnackId === snack.id ? (
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative group w-full md:w-48 h-48 rounded-2xl overflow-hidden shadow-md">
                          <img src={formData?.image} className="w-full h-full object-cover" />
                          <button onClick={() => fileInputRef.current?.click()} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-normal">TROCAR FOTO</button>
                          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                        </div>
                        <div className="flex-1 space-y-4">
                          <input value={formData?.name} onChange={e => setFormData({...formData!, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm font-normal" />
                          <input type="number" value={formData?.price} onChange={e => setFormData({...formData!, price: parseFloat(e.target.value)})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm font-normal" />
                          <textarea value={formData?.description} onChange={e => setFormData({...formData!, description: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm h-20 font-normal" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-4">
                        <button onClick={() => setEditingSnackId(null)} className="text-[10px] font-normal opacity-30">FECHAR</button>
                        <button onClick={handleSave} className="bg-[#111827] text-white px-10 py-4 rounded-xl text-xs font-normal">SALVAR</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-6">
                      <img src={snack.image} className="w-16 h-16 object-cover rounded-xl shadow-sm" />
                      <div className="flex-1">
                        <p className="font-normal text-lg text-gray-900">{snack.name}</p>
                        <p className="text-[#D32F2F] font-normal text-sm">R$ {snack.price.toFixed(2)}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingSnackId(snack.id); setFormData({...snack}); }} className="p-4 bg-gray-50 rounded-xl text-[#C5A021] hover:bg-[#C5A021] hover:text-white transition-all">✏️</button>
                        <button onClick={() => onDeleteSnack(snack.id)} className="p-4 bg-red-50 rounded-xl text-[#D32F2F] hover:bg-[#D32F2F] hover:text-white transition-all">🗑️</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
