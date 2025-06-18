import BaseLayout from '../../components/BaseLayout';
import { useState } from 'react';

export default function CadastroProcedimento() {
  const [form, setForm] = useState({ nome: '', descricao: '', valor: '' });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Lógica de cadastro
    alert('Procedimento cadastrado!');
  }

  return (
    <BaseLayout>
      <div className="max-w-xl mx-auto bg-[#1e332c] rounded-xl shadow-lg p-8 border border-[#d6c3a1]/30">
        <h2 className="text-2xl font-bold text-[#d6c3a1] mb-6">Cadastro de Procedimento</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome do procedimento" className="w-full rounded-lg px-4 py-2 bg-[#22382f] border border-[#d6c3a1]/30 text-[#f5f5f5] placeholder-[#d6c3a1]" required />
          <textarea name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição" className="w-full rounded-lg px-4 py-2 bg-[#22382f] border border-[#d6c3a1]/30 text-[#f5f5f5] placeholder-[#d6c3a1] min-h-[80px]" required />
          <input name="valor" value={form.valor} onChange={handleChange} placeholder="Valor (R$)" type="number" min="0" step="0.01" className="w-full rounded-lg px-4 py-2 bg-[#22382f] border border-[#d6c3a1]/30 text-[#f5f5f5] placeholder-[#d6c3a1]" required />
          <button type="submit" className="w-full bg-[#d6c3a1] text-[#22382f] rounded-lg px-4 py-2 font-semibold hover:bg-[#fffbe6] transition">Salvar</button>
        </form>
      </div>
    </BaseLayout>
  );
} 