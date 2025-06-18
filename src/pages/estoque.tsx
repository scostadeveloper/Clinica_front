import BaseLayout from '../components/BaseLayout';
import { useState } from 'react';
import { FaPlus, FaBoxOpen, FaExclamationTriangle, FaCalendarAlt, FaMoneyBillWave, FaEye } from 'react-icons/fa';
import Table from '../components/ui/Table';
import ModalMovimentacao from '../components/forms/ModalMovimentacao';

const CARD_FILTROS = [
  { label: 'Total de Itens', value: 320, icon: <FaBoxOpen className="text-blue-500 text-2xl" />, filtro: 'todos' },
  { label: 'Abaixo do Mínimo', value: 8, icon: <FaExclamationTriangle className="text-orange-400 text-2xl" />, filtro: 'minimo' },
  { label: 'Próximos a Vencer', value: 5, icon: <FaCalendarAlt className="text-yellow-500 text-2xl" />, filtro: 'vencer' },
  { label: 'Valor Total', value: 'R$ 12.500,00', icon: <FaMoneyBillWave className="text-green-500 text-2xl" />, filtro: 'valor' },
];

const estoqueMock = [
  { produto: 'Dipirona', lote: 'A123', validade: '2024-07-10', quantidade: 50, localizacao: 'Prateleira 1', situacao: 'OK' },
  { produto: 'Soro Fisiológico', lote: 'B456', validade: '2024-06-01', quantidade: 10, localizacao: 'Prateleira 2', situacao: 'Abaixo do Mínimo' },
  { produto: 'Paracetamol', lote: 'C789', validade: '2024-05-15', quantidade: 5, localizacao: 'Prateleira 3', situacao: 'Próximo a Vencer' },
];

export default function Estoque() {
  const [busca, setBusca] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [cardFiltro, setCardFiltro] = useState('todos');
  const [movimentacoes, setMovimentacoes] = useState<any[]>([]);
  const [movimentacaoEdit, setMovimentacaoEdit] = useState<any>(null);

  const estoqueFiltrado = estoqueMock.filter(e => {
    if (cardFiltro === 'minimo') return e.situacao === 'Abaixo do Mínimo';
    if (cardFiltro === 'vencer') return e.situacao === 'Próximo a Vencer';
    return (
      e.produto.toLowerCase().includes(busca.toLowerCase()) ||
      e.lote.toLowerCase().includes(busca.toLowerCase())
    );
  });

  function handleNovaMovimentacao(data: any) {
    setMovimentacoes([...movimentacoes, data]);
  }

  return (
    <BaseLayout>
      <div className="max-w-7xl mx-auto px-2 sm:px-0">
        <h2 className="text-2xl font-bold text-[#d6c3a1] mt-20 mb-8">Estoque</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {CARD_FILTROS.map((card, i) => (
            <button
              key={i}
              onClick={() => setCardFiltro(card.filtro)}
              className={`bg-white border border-[#d6c3a1]/20 rounded-xl p-4 flex flex-col gap-2 shadow-sm transition-all focus:outline-none ${cardFiltro === card.filtro ? 'ring-2 ring-[#d6c3a1] scale-105' : ''}`}
              type="button"
            >
              <div className="flex items-center gap-2">
                {card.icon}
                <span className="text-xs font-semibold text-[#22382f]">{card.label}</span>
              </div>
              <div className="text-2xl font-bold text-[#22382f]">{card.value}</div>
            </button>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <input
            type="text"
            placeholder="Buscar por produto ou lote..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="rounded-lg px-4 py-2 border border-[#d6c3a1]/30 bg-[#22382f] text-[#f5f5f5] placeholder-[#d6c3a1] focus:ring-2 focus:ring-[#d6c3a1] focus:border-[#d6c3a1] transition w-full sm:w-64"
          />
          <button
            className="flex items-center gap-2 bg-[#d6c3a1] text-[#22382f] px-4 py-2 rounded-lg font-semibold hover:bg-[#fffbe6] transition w-full sm:w-auto"
            onClick={() => { setMovimentacaoEdit(null); setModalOpen(true); }}
          >
            <FaPlus /> Nova Movimentação
          </button>
        </div>
        <div className="mt-8">
          <Table
            columns={[
              { label: 'Produto', key: 'produto' },
              { label: 'Lote', key: 'lote' },
              { label: 'Validade', key: 'validade' },
              { label: 'Quantidade', key: 'quantidade' },
              { label: 'Localização', key: 'localizacao' },
              { label: 'Situação', key: 'situacao' },
            ]}
            data={estoqueFiltrado}
            actions={row => (
              <div className="flex gap-2 items-center justify-center">
                <button className="text-[#d6c3a1] hover:text-blue-400" title="Histórico"><FaEye /></button>
                <button className="text-[#d6c3a1] hover:text-yellow-400" title="Movimentar" onClick={() => { setMovimentacaoEdit(row); setModalOpen(true); }}><FaPlus /></button>
              </div>
            )}
          />
        </div>
        <ModalMovimentacao open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleNovaMovimentacao} initialData={movimentacaoEdit} />
      </div>
    </BaseLayout>
  );
} 