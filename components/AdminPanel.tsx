
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
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  snacks, 
  phoneNumber, 
  onUpdatePhone, 
  onUpdateSnack, 
  onAddSnack, 
  onDeleteSnack 
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Snack | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = (snack: Snack) => {
    setEditingId(snack.id);
    setEditForm({ ...snack });
  };

  const handleSave = () => {
    if (editForm) {
      onUpdateSnack(editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja remover "${name}" do cardápio real?`)) {
      onDeleteSnack(id);
      if (editingId === id) {
        setEditingId(null);
        setEditForm(null);
      }
    }
  };

  const handleAddNew = (category: Snack['category']) => {
    const newSnack: Snack = {
      id: `snack-${Date.now()}`,
      name: 'Novo Item Real',
      description: 'Uma nova joia do Guilherme...',
      price: 0,
      category: category,
      image: 'https://picsum.photos/seed/guilherme/400/300'
    };
    onAddSnack(newSnack);
    handleEditClick(newSnack);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editForm) {
      setEditForm({
        ...editForm,
        [name]: name === 'price' ? parseFloat(value) || 0 : value
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editForm) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({
          ...editForm,
          image: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-8 animate-slide-up">
      {/* Seção de Configuração do Número */}
      <div className="bg-slate-900/40 rounded-3xl p-6 border border-purple-500/30 backdrop-blur-sm shadow-2xl">
        <h2 className="text-2xl font-brand text-purple-500 tracking-widest uppercase mb-4">Configurações de Contato</h2>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] text-amber-500 uppercase font-bold tracking-widest ml-1">WhatsApp para Recebimento (com DDD)</label>
          <div className="flex gap-2">
            <input 
              type="text"
              value={phoneNumber}
              onChange={(e) => onUpdatePhone(e.target.value)}
              placeholder="Ex: 5511999999999"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 ring-purple-500 outline-none"
            />
            <div className="bg-purple-900/20 border border-purple-500/30 px-4 py-3 rounded-xl flex items-center justify-center">
              <span className="text-sm">💾 Auto-salvo</span>
            </div>
          </div>
          <p className="text-[9px] text-slate-500 italic mt-1">Este número receberá todas as comandas enviadas pelos clientes.</p>
        </div>
      </div>

      {/* Seção de Gestão do Cardápio */}
      <div className="bg-slate-900/40 rounded-3xl p-6 border border-amber-500/20 backdrop-blur-sm shadow-2xl">
        <div className="flex justify-between items-center mb-10 border-b border-amber-500/20 pb-4">
          <h2 className="text-3xl font-brand text-amber-500 tracking-widest uppercase">Gestão do Acervo Real</h2>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-tighter">
            Total: {snacks.length} itens
          </div>
        </div>
        
        <div className="space-y-12">
          {CATEGORIES.map((category) => {
            const categorySnacks = snacks.filter(s => s.category === category.id);
            
            return (
              <section key={category.id}>
                <div className="flex items-center justify-between mb-6 group">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="text-xl font-brand text-white tracking-widest uppercase group-hover:text-amber-500 transition-colors">
                      {category.label}
                    </h3>
                  </div>
                  <button 
                    onClick={() => handleAddNew(category.id as Snack['category'])}
                    className="text-[10px] font-bold uppercase tracking-widest text-amber-500 border border-amber-500/30 px-3 py-1 rounded-full hover:bg-amber-500 hover:text-slate-900 transition-all"
                  >
                    + Adicionar {category.label}
                  </button>
                </div>

                <div className="grid gap-4">
                  {categorySnacks.length === 0 ? (
                    <div className="py-6 px-4 border border-dashed border-slate-800 rounded-2xl text-center text-slate-600 italic text-sm">
                      Nenhum item em {category.label}
                    </div>
                  ) : (
                    categorySnacks.map((snack) => (
                      <div key={snack.id} className="bg-slate-950/50 border border-amber-500/10 p-5 rounded-2xl flex flex-col gap-4 shadow-inner">
                        {editingId === snack.id ? (
                          <div className="w-full flex flex-col md:flex-row gap-6">
                            <div className="flex flex-col items-center gap-4">
                              <div className="relative group cursor-pointer" onClick={triggerFileInput}>
                                <img 
                                  src={editForm?.image} 
                                  className="w-32 h-32 rounded-2xl object-cover border-2 border-amber-500 shadow-xl brightness-75 group-hover:brightness-100 transition-all" 
                                  alt="Preview" 
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                  <span className="text-white text-[10px] font-bold uppercase bg-black/50 px-2 py-1 rounded">Trocar Foto</span>
                                </div>
                              </div>
                              <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                              />
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex flex-col gap-1">
                                <label className="text-[10px] text-amber-500 uppercase font-bold tracking-widest">Título do Prato</label>
                                <input name="name" value={editForm?.name} onChange={handleChange} className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-white outline-none" />
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-[10px] text-amber-500 uppercase font-bold tracking-widest">Preço (R$)</label>
                                <input name="price" type="number" step="0.01" value={editForm?.price} onChange={handleChange} className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-white outline-none" />
                              </div>
                              <div className="md:col-span-2 flex flex-col gap-1">
                                <label className="text-[10px] text-amber-500 uppercase font-bold tracking-widest">Descrição</label>
                                <textarea name="description" value={editForm?.description} onChange={handleChange} className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-white h-20 resize-none outline-none" />
                              </div>
                              <div className="md:col-span-2 flex gap-2 justify-end mt-2">
                                <button onClick={() => setEditingId(null)} className="px-6 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs uppercase">Cancelar</button>
                                <button onClick={handleSave} className="px-6 py-2 rounded-xl gradient-brand text-white font-bold shadow-lg text-xs uppercase">Salvar</button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col md:flex-row items-center gap-4">
                            <img src={snack.image} className="w-16 h-16 rounded-xl object-cover border border-amber-500/20 shadow-lg" alt="" />
                            <div className="flex-1 text-center md:text-left">
                              <h4 className="text-lg font-bold text-white uppercase tracking-tight">{snack.name}</h4>
                              <p className="text-amber-500 font-brand text-xl">R$ {snack.price.toFixed(2)}</p>
                            </div>
                            <div className="flex gap-2 w-full md:w-auto">
                              <button onClick={() => handleEditClick(snack)} className="flex-1 md:flex-none bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-xl border border-slate-800 text-xs uppercase tracking-widest">Editar</button>
                              <button onClick={() => handleDelete(snack.id, snack.name)} className="bg-red-950/20 hover:bg-red-600 text-red-500 hover:text-white px-4 py-2 rounded-xl transition-all font-bold border border-red-900/30">🗑️</button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mt-10"></div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
