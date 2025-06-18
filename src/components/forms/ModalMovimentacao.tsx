import { useState } from 'react';

interface ModalMovimentacaoProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export default function ModalMovimentacao({ open, onClose, onSave, initialData }: ModalMovimentacaoProps) {
  const [form, setForm] = useState(initialData || {
    tipo: 'entrada', produto: '', lote: '', quantidade: '', data: '', obs: ''
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-y-auto">
      <div className="bg-[#1e332c] w-full max-w-xl rounded-xl shadow-2xl p-6 relative border border-[#d6c3a1]/30 overflow-y-auto max-h-[95vh]">
        <button className="absolute top-2 right-2 text-[#d6c3a1] hover:text-red-500 text-xl" onClick={onClose}>×</button>
        <h2 className="text-2xl font-bold text-[#d6c3a1] mb-6">Movimentação de Estoque</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Tipo de Movimentação *</label>
              <select name="tipo" value={form.tipo} onChange={handleChange} className="input w-full" required>
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
                <option value="ajuste">Ajuste</option>
                <option value="transferencia">Transferência</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Produto *</label>
              <input name="produto" value={form.produto} onChange={handleChange} className="input w-full" required />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Lote</label>
              <input name="lote" value={form.lote} onChange={handleChange} className="input w-full" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Quantidade *</label>
              <input name="quantidade" value={form.quantidade} onChange={handleChange} className="input w-full" type="number" min="1" required />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Data *</label>
              <input name="data" value={form.data} onChange={handleChange} className="input w-full" type="date" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Observação</label>
              <textarea name="obs" value={form.obs} onChange={handleChange} className="input w-full min-h-[40px]" />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition">Cancelar</button>
            <button type="submit" className="bg-[#d6c3a1] text-[#22382f] px-4 py-2 rounded-lg font-semibold hover:bg-[#fffbe6] transition">Salvar</button>
          </div>
        </form>
        <style jsx>{`
          .input,
          .input[type='text'],
          .input[type='date'],
          .input[type='number'],
          select.input, textarea.input {
            background-color: #f5ecd7;
            color: #22382f;
            border: 1px solid #d6c3a1;
            border-radius: 0.5rem;
            padding: 0.5rem 0.75rem;
            transition: border 0.2s, box-shadow 0.2s;
          }
          .input:focus {
            border-color: #d6c3a1;
            outline: none;
            box-shadow: 0 0 0 2px #d6c3a122;
          }
        `}</style>
      </div>
    </div>
  );
} 