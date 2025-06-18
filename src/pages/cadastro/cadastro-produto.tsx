import BaseLayout from '../../components/BaseLayout';
import { useState } from 'react';
import { FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import ModalProduto from '../../components/forms/ModalProduto';
import Table from '../../components/ui/Table';

const produtosFake = [
  { nome: 'Dipirona', tipo: 'Medicamento', categoria: 'Analgésico', fabricante: 'Neo Química', apresentacao: 'Caixa', unidade: 'Comprimido', estoque: 100, preco: 12.5 },
  { nome: 'Soro Fisiológico', tipo: 'Material', categoria: 'Solução', fabricante: 'Baxter', apresentacao: 'Garrafa', unidade: 'ml', estoque: 50, preco: 8.9 },
];

export default function CadastroProduto() {
  const [produtos, setProdutos] = useState(produtosFake);
  const [busca, setBusca] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  function handleSave(novo: any) {
    setProdutos([...produtos, novo]);
  }

  function handleDelete(nome: string) {
    if (window.confirm('Deseja realmente excluir este produto?')) {
      setProdutos(produtos.filter(p => p.nome !== nome));
    }
  }

  const produtosFiltrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    (p.categoria && p.categoria.toLowerCase().includes(busca.toLowerCase()))
  );

  return (
    <BaseLayout>
      <div className="max-w-7xl mx-auto px-2 sm:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-20 mb-10 gap-4">
          <h2 className="text-2xl font-bold text-[#d6c3a1]">Produtos</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Buscar por nome ou categoria..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
              className="rounded-lg px-4 py-2 border border-[#d6c3a1]/30 bg-[#22382f] text-[#f5f5f5] placeholder-[#d6c3a1] focus:ring-2 focus:ring-[#d6c3a1] focus:border-[#d6c3a1] transition w-full sm:w-64"
            />
            <button
              className="flex items-center gap-2 bg-[#d6c3a1] text-[#22382f] px-4 py-2 rounded-lg font-semibold hover:bg-[#fffbe6] transition"
              onClick={() => setModalOpen(true)}
            >
              <FaPlus /> Novo Produto
            </button>
          </div>
        </div>
        <div className="bg-[#22382f] border border-[#d6c3a1]/20 rounded-tl-lg rounded-tr-lg p-4 mb-8">
          <form className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Taxas</label>
              <select className="input w-full bg-[#f5ecd7] text-[#22382f] border-[#d6c3a1] h-12">
                <option>Selecione</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Tipo Produto</label>
              <select className="input w-full bg-[#f5ecd7] text-[#22382f] border-[#d6c3a1] h-12">
                <option>Selecione</option>
                <option>Medicamento</option>
                <option>Material</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Código</label>
              <input className="input w-full bg-[#f5ecd7] text-[#22382f] border-[#d6c3a1] h-12" type="text" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Categoria</label>
              <select className="input w-full bg-[#f5ecd7] text-[#22382f] border-[#d6c3a1] h-12">
                <option>Selecione</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Fabricante</label>
              <select className="input w-full bg-[#f5ecd7] text-[#22382f] border-[#d6c3a1] h-12">
                <option>Selecione</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Localização</label>
              <select className="input w-full bg-[#f5ecd7] text-[#22382f] border-[#d6c3a1] h-12">
                <option>Selecione</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Código Individual</label>
              <input className="input w-full bg-[#f5ecd7] text-[#22382f] border-[#d6c3a1] h-12" type="text" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Abaixo do Mínimo</label>
              <select className="input w-full bg-[#f5ecd7] text-[#22382f] border-[#d6c3a1] h-12">
                <option>Selecione</option>
                <option>Sim</option>
                <option>Não</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Ordenar Por</label>
              <select className="input w-full bg-[#f5ecd7] text-[#22382f] border-[#d6c3a1] h-12">
                <option>Nome</option>
                <option>Categoria</option>
                <option>Estoque</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition h-12">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-4-4m0 0A7 7 0 104 4a7 7 0 0013 13z' /></svg>
                Buscar
              </button>
            </div>
            <div className="md:col-span-2 flex gap-2 mt-2 md:mt-0">
              <button type="button" className="bg-[#1cc0f1] text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-[#0ea5e9] transition h-12" title="Imprimir">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 9V2h12v7' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 14h12v7H6z' /></svg>
              </button>
              <button type="button" className="bg-[#6fcf97] text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-[#34d399] transition h-12" title="Exportar">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' /></svg>
              </button>
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Princípio Ativo</label>
              <select className="input w-full bg-[#f5ecd7] text-[#22382f] border-[#d6c3a1] h-12">
                <option>Selecione</option>
              </select>
            </div>
        </form>
        </div>
        <div className="mt-8">
          <Table
            columns={[
              { label: 'Nome', key: 'nome' },
              { label: 'Tipo', key: 'tipo' },
              { label: 'Categoria', key: 'categoria' },
              { label: 'Fabricante', key: 'fabricante' },
              { label: 'Apresentação', key: 'apresentacao' },
              { label: 'Unidade', key: 'unidade' },
              { label: 'Estoque', key: 'estoque' },
              { label: 'Preço', key: 'preco' },
            ]}
            data={produtosFiltrados}
            actions={p => (
              <div className="flex gap-2 items-center justify-center">
                <button className="text-[#d6c3a1] hover:text-blue-400" title="Visualizar"><FaEye /></button>
                <button className="text-[#d6c3a1] hover:text-yellow-400" title="Editar"><FaEdit /></button>
                <button className="text-[#d6c3a1] hover:text-red-500" title="Excluir" onClick={() => handleDelete(p.nome)}><FaTrash /></button>
              </div>
            )}
          />
        </div>
      </div>
      <ModalProduto open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} />
    </BaseLayout>
  );
} 