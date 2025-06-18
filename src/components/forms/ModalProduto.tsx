import { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

interface ModalProdutoProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export default function ModalProduto({ open, onClose, onSave, initialData }: ModalProdutoProps) {
  const [form, setForm] = useState(initialData || {
    nome: '', tipo: 'Geral', codigo: '', categoria: '', fabricante: '', principioAtivo: '', apresentacao: '', conteudo: '', unidade: '', localizacao: '', cd: '',
    estoqueMin: '', estoqueMax: '', unidadeEstoque: '', avisoValidade: '', precoCompra: '', precoVenda: '', obs: '', arquivo: null,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type, files } = e.target as HTMLInputElement;
    setForm({ ...form, [name]: type === 'file' ? files?.[0] : value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-y-auto">
      <div className="bg-[#1e332c] w-full max-w-4xl rounded-xl shadow-2xl p-6 relative border border-[#d6c3a1]/30 overflow-y-auto max-h-[95vh]">
        <button className="absolute top-2 right-2 text-[#d6c3a1] hover:text-red-500 text-xl" onClick={onClose}>×</button>
        <h2 className="text-2xl font-bold text-[#d6c3a1] mb-6">Cadastro de Produto</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Linha 1: Upload e dados principais */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
            <div className="md:col-span-1 flex flex-col gap-2">
              <label className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Arquivo</label>
              <label className="flex items-center gap-2 bg-[#22382f] text-[#d6c3a1] px-3 py-2 rounded-lg cursor-pointer border border-[#d6c3a1]/30">
                <FaUpload />
                <span>{form.arquivo ? (form.arquivo as File).name : 'Escolher arquivo'}</span>
                <input type="file" name="arquivo" className="hidden" onChange={handleChange} />
              </label>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="nome" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Nome *</label>
              <input id="nome" name="nome" value={form.nome} onChange={handleChange} className="input w-full" required />
            </div>
            <div>
              <label htmlFor="tipo" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Tipo *</label>
              <select id="tipo" name="tipo" value={form.tipo} onChange={handleChange} className="input w-full" required>
                <option value="Geral">Geral</option>
                <option value="Produto">Produto</option>
                <option value="Medicamento">Medicamento</option>
                <option value="Material">Material</option>
              </select>
            </div>
            <div>
              <label htmlFor="codigo" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Código</label>
              <input id="codigo" name="codigo" value={form.codigo} onChange={handleChange} className="input w-full" />
            </div>
            <div>
              <label htmlFor="categoria" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Categoria</label>
              <input id="categoria" name="categoria" value={form.categoria} onChange={handleChange} className="input w-full" />
            </div>
            <div>
              <label htmlFor="fabricante" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Fabricante</label>
              <input id="fabricante" name="fabricante" value={form.fabricante} onChange={handleChange} className="input w-full" />
            </div>
            <div>
              <label htmlFor="principioAtivo" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Princípio Ativo</label>
              <input id="principioAtivo" name="principioAtivo" value={form.principioAtivo} onChange={handleChange} className="input w-full" />
            </div>
          </div>

          {/* Linha 2: apresentação, conteúdo, unidade, localização, CD, observações */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <label htmlFor="apresentacao" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Apresentação *</label>
              <input id="apresentacao" name="apresentacao" value={form.apresentacao} onChange={handleChange} className="input w-full" required placeholder="Ex: caixa, garrafa..." />
            </div>
            <div>
              <label htmlFor="conteudo" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Contendo *</label>
              <input id="conteudo" name="conteudo" value={form.conteudo} onChange={handleChange} className="input w-full" required />
            </div>
            <div>
              <label htmlFor="unidade" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Unidade *</label>
              <input id="unidade" name="unidade" value={form.unidade} onChange={handleChange} className="input w-full" required />
            </div>
            <div>
              <label htmlFor="localizacao" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Localização Padrão</label>
              <input id="localizacao" name="localizacao" value={form.localizacao} onChange={handleChange} className="input w-full" />
            </div>
            <div>
              <label htmlFor="cd" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">CD</label>
              <input id="cd" name="cd" value={form.cd} onChange={handleChange} className="input w-full" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="obs" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Observações</label>
              <textarea id="obs" name="obs" value={form.obs} onChange={handleChange} className="input w-full min-h-[40px]" />
            </div>
          </div>

          {/* Linha 3: Estoque e preços */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <label htmlFor="estoqueMin" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Estoque Mínimo</label>
              <input id="estoqueMin" name="estoqueMin" value={form.estoqueMin} onChange={handleChange} className="input w-full" type="number" min="0" />
            </div>
            <div>
              <label htmlFor="unidadeEstoque" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Unidade</label>
              <input id="unidadeEstoque" name="unidadeEstoque" value={form.unidadeEstoque} onChange={handleChange} className="input w-full" />
            </div>
            <div>
              <label htmlFor="estoqueMax" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Estoque Máximo</label>
              <input id="estoqueMax" name="estoqueMax" value={form.estoqueMax} onChange={handleChange} className="input w-full" type="number" min="0" />
            </div>
            <div>
              <label htmlFor="avisoValidade" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Aviso de Validade</label>
              <input id="avisoValidade" name="avisoValidade" value={form.avisoValidade} onChange={handleChange} className="input w-full" placeholder="dias" />
            </div>
            <div>
              <label htmlFor="precoCompra" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Preço Médio - Compra</label>
              <div className="flex items-center gap-2">
                <span className="text-[#d6c3a1]">R$</span>
                <input id="precoCompra" name="precoCompra" value={form.precoCompra} onChange={handleChange} className="input w-full" type="number" min="0" step="0.01" />
              </div>
            </div>
            <div>
              <label htmlFor="precoVenda" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Preço Médio - Venda</label>
              <div className="flex items-center gap-2">
                <span className="text-[#d6c3a1]">R$</span>
                <input id="precoVenda" name="precoVenda" value={form.precoVenda} onChange={handleChange} className="input w-full" type="number" min="0" step="0.01" />
              </div>
            </div>
          </div>

          {/* Tabela de posição de estoque (layout) */}
          <div className="bg-[#22382f] border border-[#d6c3a1]/30 rounded-lg p-4 mt-4">
            <h3 className="text-lg font-bold text-[#d6c3a1] mb-2">Posição de Estoque</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-[#b6e6d8] text-[#22382f]">
                  <tr>
                    <th className="px-2 py-1 font-semibold">Lote</th>
                    <th className="px-2 py-1 font-semibold">Validade</th>
                    <th className="px-2 py-1 font-semibold">Cód. Individual</th>
                    <th className="px-2 py-1 font-semibold">Localização</th>
                    <th className="px-2 py-1 font-semibold">Responsável</th>
                    <th className="px-2 py-1 font-semibold">Quantidade</th>
                    <th className="px-2 py-1 font-semibold">Valor Médio</th>
                  </tr>
                </thead>
                <tbody className="bg-[#e6f7f2]">
                  <tr>
                    <td className="px-2 py-1">-</td>
                    <td className="px-2 py-1">-</td>
                    <td className="px-2 py-1">-</td>
                    <td className="px-2 py-1">-</td>
                    <td className="px-2 py-1">-</td>
                    <td className="px-2 py-1">-</td>
                    <td className="px-2 py-1">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition">Cancelar</button>
            <button type="submit" className="bg-[#d6c3a1] text-[#22382f] px-4 py-2 rounded-lg font-semibold hover:bg-[#fffbe6] transition">Salvar</button>
          </div>
        </form>
        <style jsx>{`
          .input,
          .input[type='date'],
          .input[type='email'],
          .input[type='text'],
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