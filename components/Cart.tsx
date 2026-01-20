
import React, { useState } from 'react';
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
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Pix' | 'Cartão' | 'Dinheiro'>('Pix');
  const [changeFor, setChangeFor] = useState('');

  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0 || !customerName || !address) return;

    const date = new Date().toLocaleString('pt-BR');
    const itemString = items.map(item => `🍔 *${item.quantity}x ${item.name.toUpperCase()}*`).join('%0A');
    
    let message = `👑 *SUPREMO BURGER - NOVO PEDIDO* 👑%0A%0A`;
    message += `⏰ *Data:* ${date}%0A`;
    message += `👤 *Cliente:* ${customerName}%0A`;
    message += `📍 *Endereço:* ${address}%0A`;
    message += `💳 *Pagamento:* ${paymentMethod}${paymentMethod === 'Dinheiro' && changeFor ? ` (Troco para R$ ${changeFor})` : ''}%0A%0A`;
    message += `📝 *ITENS DO PEDIDO:*%0A${itemString}%0A%0A`;
    message += `💰 *VALOR TOTAL: R$ ${total.toFixed(2)}*%0A%0A`;
    message += `🚀 _Aguardando sua confirmação!_`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const isFormValid = customerName.trim().length > 2 && address.trim().length > 5 && items.length > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-[#111827]/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white h-full border-l-4 border-[#111827] flex flex-col p-8 md:p-10 animate-slide-in shadow-[-20px_0_40px_rgba(0,0,0,0.1)]">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-impact text-[#D32F2F] tracking-tight">
            MEU <span className="text-[#C5A021]">PEDIDO</span>
          </h2>
          <button onClick={onClose} className="bg-[#111827] text-white px-5 py-3 rounded-xl font-normal text-[10px] hover:bg-[#D32F2F] transition-colors shadow-[3px_3px_0px_#C5A021]">FECHAR</button>
        </div>

        {/* Itens do Carrinho */}
        <div className="flex-1 overflow-y-auto space-y-6 no-scrollbar pb-6">
          {items.length === 0 ? (
            <div className="text-center py-20 opacity-20">
              <span className="text-7xl block mb-6">🛒</span>
              <p className="text-[10px] font-normal tracking-widest uppercase text-gray-400">Seu carrinho está vazio</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 border-2 border-gray-100 rounded-xl shadow-[4px_4px_0px_rgba(211,47,47,0.05)]">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover border border-gray-200" />
                    <div className="flex-1">
                      <h4 className="font-normal text-[10px] uppercase text-[#D32F2F] leading-tight">{item.name}</h4>
                      <p className="text-[#C5A021] font-normal text-xs">R$ {(item.price * item.quantity).toFixed(2)}</p>
                      
                      <div className="flex items-center gap-4 mt-2">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-7 h-7 rounded-md border border-gray-300 flex items-center justify-center hover:bg-[#D32F2F] hover:text-white font-normal text-sm">-</button>
                        <span className="font-normal text-xs text-gray-900">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-7 h-7 rounded-md border border-gray-300 flex items-center justify-center hover:bg-[#D32F2F] hover:text-white font-normal text-sm">+</button>
                      </div>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-[#D32F2F] transition-colors text-2xl font-normal">×</button>
                  </div>
                ))}
              </div>

              {/* Formulário de Entrega */}
              <div className="mt-8 space-y-6 border-t-2 border-gray-100 pt-6">
                <h3 className="text-xl font-impact text-[#D32F2F] uppercase tracking-tight">DADOS DE <span className="text-[#C5A021]">ENTREGA</span></h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] font-normal uppercase text-gray-400 mb-1.5 block">Nome Completo</label>
                    <input 
                      type="text"
                      placeholder="Como podemos te chamar?"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-4 text-xs font-normal outline-none focus:border-[#D32F2F]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-normal uppercase text-gray-400 mb-1.5 block">Endereço de Entrega</label>
                    <textarea 
                      placeholder="Rua, Número, Bairro e Complemento"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-4 text-xs font-normal outline-none focus:border-[#D32F2F]/30 transition-all h-20 resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-normal uppercase text-gray-400 mb-1.5 block">Forma de Pagamento</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Pix', 'Cartão', 'Dinheiro'] as const).map(method => (
                        <button
                          key={method}
                          onClick={() => setPaymentMethod(method)}
                          className={`py-2.5 rounded-xl border-2 font-normal text-[9px] transition-all ${
                            paymentMethod === method ? 'bg-[#111827] text-white border-[#111827] shadow-[3px_3px_0px_#C5A021]' : 'bg-white text-gray-400 border-gray-100'
                          }`}
                        >
                          {method.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {paymentMethod === 'Dinheiro' && (
                    <div className="animate-fade-in">
                      <label className="text-[9px] font-normal uppercase text-gray-400 mb-1.5 block">Troco para quanto?</label>
                      <input 
                        type="text"
                        placeholder="Ex: 100,00"
                        value={changeFor}
                        onChange={(e) => setChangeFor(e.target.value)}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-4 text-xs font-normal outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Rodapé e Botão Finalizar */}
        <div className="mt-auto pt-6 border-t-4 border-[#111827]">
          <div className="flex justify-between items-end mb-6">
            <span className="text-[10px] font-normal text-gray-400 uppercase tracking-widest">Valor Total</span>
            <span className="text-4xl font-impact tracking-tighter text-[#D32F2F]">R$ {total.toFixed(2)}</span>
          </div>
          <button 
            disabled={!isFormValid}
            onClick={handleCheckoutWhatsApp}
            className={`w-full py-6 text-[11px] font-normal rounded-2xl border-2 border-[#111827] transition-all flex items-center justify-center gap-2 ${
              isFormValid 
              ? 'bg-[#D32F2F] text-white shadow-[6px_6px_0px_#111827] hover:bg-[#111827] active:shadow-none active:translate-x-0.5 active:translate-y-0.5' 
              : 'bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed'
            }`}
          >
            {isFormValid ? 'FINALIZAR NO WHATSAPP 🚀' : 'PREENCHA OS DADOS'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in { animation: slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default Cart;
