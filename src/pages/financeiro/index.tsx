import { useState } from 'react';
import BaseLayout from '../../components/BaseLayout';
import { FaMoneyBillWave, FaArrowUp, FaArrowDown, FaChartLine } from 'react-icons/fa';
import ModalTransacao from '../../components/ModalTransacao';

// Mock de dados financeiros
const RESUMO = {
  receitas: 25000,
  despesas: 15000,
  saldo: 10000,
  variacao: 15
};

const TRANSACOES = [
  { id: 1, data: '2025-05-26', descricao: 'Consulta - Maria Silva', valor: 250, tipo: 'receita', status: 'Pago' },
  { id: 2, data: '2025-05-27', descricao: 'Procedimento - Carlos Alberto', valor: 1200, tipo: 'receita', status: 'Pendente' },
  { id: 3, data: '2025-05-28', descricao: 'Aluguel', valor: 5000, tipo: 'despesa', status: 'Pago' },
  { id: 4, data: '2025-05-29', descricao: 'Material de Consumo', valor: 800, tipo: 'despesa', status: 'Pendente' },
  { id: 5, data: '2025-05-30', descricao: 'Consulta - João Souza', valor: 250, tipo: 'receita', status: 'Pago' },
];

export default function FinanceiroPage() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('mes');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transacoes, setTransacoes] = useState(TRANSACOES);

  const handleSaveTransacao = (novaTransacao: any) => {
    setTransacoes([...transacoes, novaTransacao]);
  };

  return (
    <>
      <BaseLayout>
        <div className="max-w-7xl mx-auto px-2 sm:px-0 mt-10">
          {/* Cabeçalho */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold" style={{ color: 'var(--cor-login-borda)' }}>Financeiro</h1>
            <div className="flex gap-4">
              <select 
                value={periodoSelecionado}
                onChange={(e) => setPeriodoSelecionado(e.target.value)}
                className="px-4 py-2 rounded-lg border" 
                style={{ 
                  color: 'var(--cor-login-borda)', 
                  background: 'var(--cor-background)',
                  borderColor: 'var(--cor-login-borda)'
                }}
              >
                <option value="semana">Última Semana</option>
                <option value="mes">Este Mês</option>
                <option value="trimestre">Último Trimestre</option>
                <option value="ano">Este Ano</option>
              </select>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2 rounded-lg font-semibold shadow transition" 
                style={{ 
                  background: 'var(--cor-botao-principal-fundo)', 
                  color: 'var(--cor-botao-principal-texto)' 
                }}
              >
                + Nova Transação
              </button>
            </div>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-xl shadow p-6" style={{ background: 'var(--cor-card-fundo)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold" style={{ color: 'var(--cor-card-texto)' }}>Receitas</h3>
                <FaArrowUp className="text-green-600 text-xl" />
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--cor-card-texto)' }}>
                R$ {RESUMO.receitas.toLocaleString('pt-BR')}
              </div>
            </div>

            <div className="rounded-xl shadow p-6" style={{ background: 'var(--cor-card-fundo)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold" style={{ color: 'var(--cor-card-texto)' }}>Despesas</h3>
                <FaArrowDown className="text-red-600 text-xl" />
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--cor-card-texto)' }}>
                R$ {RESUMO.despesas.toLocaleString('pt-BR')}
              </div>
            </div>

            <div className="rounded-xl shadow p-6" style={{ background: 'var(--cor-card-fundo)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold" style={{ color: 'var(--cor-card-texto)' }}>Saldo</h3>
                <FaMoneyBillWave style={{ color: 'var(--cor-login-borda)' }} className="text-xl" />
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--cor-card-texto)' }}>
                R$ {RESUMO.saldo.toLocaleString('pt-BR')}
              </div>
              <div className="text-sm text-green-600 mt-2">
                +{RESUMO.variacao}% em relação ao mês anterior
              </div>
            </div>
          </div>

          {/* Gráfico e Tabela */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gráfico */}
            <div className="rounded-xl shadow p-6" style={{ background: 'var(--cor-card-fundo)' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold" style={{ color: 'var(--cor-card-texto)' }}>Evolução Financeira</h3>
                <FaChartLine style={{ color: 'var(--cor-login-borda)' }} className="text-xl" />
              </div>
              <div className="h-64 flex items-center justify-center" style={{ color: 'var(--cor-login-borda)' }}>
                Área do gráfico (será implementado com biblioteca de gráficos)
              </div>
            </div>

            {/* Tabela de Transações */}
            <div className="rounded-xl shadow p-6" style={{ background: 'var(--cor-card-fundo)' }}>
              <h3 className="font-semibold mb-6" style={{ color: 'var(--cor-card-texto)' }}>Últimas Transações</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-2 px-4" style={{ color: 'var(--cor-card-texto)' }}>Data</th>
                      <th className="text-left py-2 px-4" style={{ color: 'var(--cor-card-texto)' }}>Descrição</th>
                      <th className="text-right py-2 px-4" style={{ color: 'var(--cor-card-texto)' }}>Valor</th>
                      <th className="text-center py-2 px-4" style={{ color: 'var(--cor-card-texto)' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transacoes.map(transacao => (
                      <tr key={transacao.id} className="border-t" style={{ borderColor: 'var(--cor-login-borda)' }}>
                        <td className="py-3 px-4" style={{ color: 'var(--cor-card-texto)' }}>
                          {new Date(transacao.data).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-3 px-4" style={{ color: 'var(--cor-card-texto)' }}>{transacao.descricao}</td>
                        <td className={`py-3 px-4 text-right font-semibold ${transacao.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                          R$ {transacao.valor.toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            transacao.status === 'Pago' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {transacao.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>

      {/* Modal de Nova Transação */}
      <ModalTransacao
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransacao}
      />

      <style>{`
        :root {
          --cor-background: #142720;
          --cor-card-fundo: #F8F6F1;
          --cor-tabela-cabecalho-fundo: #E5C97B;
          --cor-sidebar-borda: #D4AF37;
          --cor-card-texto: #22382f;
          --cor-text-login: #d6c3a1;
          --cor-login-borda: #d6c3a1;
          --cor-botao-principal-fundo: #d6c3a1;
          --cor-botao-principal-texto: #22382f;
        }
      `}</style>
    </>
  );
} 