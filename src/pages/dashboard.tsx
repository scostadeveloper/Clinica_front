import BaseLayout from '../components/BaseLayout';
import { FaUser, FaCalendarAlt, FaExclamationTriangle, FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const cards = [
  { title: 'ACESSOS DE SEU LOGIN', value: 1, icon: <FaUser className="text-green-500 text-2xl" />, subtitle: 'Últ. acesso mal sucedido', color: 'border-green-200' },
  { title: 'PRODUTOS PRÓXIMO A VENCER', value: 0, icon: <FaCalendarAlt className="text-yellow-500 text-2xl" />, subtitle: 'Ver os produtos', color: 'border-yellow-200' },
  { title: 'CONTAS VENCIDAS', value: 1186, icon: <FaMoneyBillWave className="text-blue-500 text-2xl" />, subtitle: 'Contas a pagar', color: 'border-blue-200' },
  { title: 'ITENS ABAIXO DO MÍNIMO', value: 6, icon: <FaExclamationTriangle className="text-orange-400 text-2xl" />, subtitle: 'Controle de estoque', color: 'border-orange-200' },
  { title: 'NOVOS PACIENTES', value: 1, icon: <FaUser className="text-pink-400 text-2xl" />, subtitle: '0 HOMENS | 0 MULHERES', color: 'border-pink-200' },
];

const aniversariantes = [
  { nome: 'Pamella Louredo C Coutinho', idade: 26 },
  { nome: 'Rogério Affonso Izzo Pinto', idade: 57 },
  { nome: 'Samaria Da Silva Cavalcanti', idade: 61 },
  { nome: 'Alessandra Da Silva Polida', idade: 44 },
];

const agendamentos = [
  { data: '24/11/2023 13:00', paciente: 'Katherine Cardoso Kahn', profissional: 'ANA CAROLINA MENDONÇA', crm: '37737' },
  { data: '05/07/2023 15:00', paciente: 'Aline de Souza Zamorano', profissional: 'ANA CAROLINA MENDONÇA', crm: '37737' },
  { data: '12/05/2023 14:00', paciente: 'Lucas Dutra Dos Santos', profissional: 'ANA CAROLINA MENDONÇA', crm: '37737' },
];

export default function Dashboard() {
  const [cardValues, setCardValues] = useState(cards.map(() => 0));

  useEffect(() => {
    const intervals = cards.map((card, idx) => {
      let current = 0;
      const increment = Math.max(1, Math.floor(card.value / 30));
      return setInterval(() => {
        setCardValues(prev => {
          const next = [...prev];
          if (next[idx] < card.value) {
            next[idx] = Math.min(card.value, next[idx] + increment);
          }
          return next;
        });
      }, 20 + idx * 30);
    });
    const timeout = setTimeout(() => {
      setCardValues(cards.map(card => card.value));
      intervals.forEach(clearInterval);
    }, 1000);
    return () => {
      intervals.forEach(clearInterval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <BaseLayout>
      <div className="max-w-7xl mx-auto px-2 sm:px-0 mt-10">
        <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--cor-tabela-cabecalho-fundo)' }}>Bem-vindo ao ERP da Clínica Rainer Moreira</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-card-fundo border border-sidebar-borda rounded-xl p-4 flex flex-col gap-2 shadow-sm"
              style={{ background: 'var(--cor-card-fundo)', borderColor: 'var(--cor-sidebar-borda)' }}
            >
              <div className="flex items-center gap-2">
                {i === 0 && <span className="text-green-500 text-2xl">{card.icon}</span>}
                {i === 1 && <span className="text-yellow-500 text-2xl">{card.icon}</span>}
                {i === 2 && <span className="text-blue-500 text-2xl">{card.icon}</span>}
                {i === 3 && <span className="text-orange-400 text-2xl">{card.icon}</span>}
                {i === 4 && <span className="text-pink-400 text-2xl">{card.icon}</span>}
                <span className="text-xs font-semibold" style={{ color: 'var(--cor-card-texto)' }}>{card.title}</span>
              </div>
              <div className="text-3xl font-bold" style={{ color: 'var(--cor-card-texto)' }}>{card.value}</div>
              <div className="text-xs" style={{ color: 'var(--cor-input-placeholder)' }}>{card.subtitle}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card-fundo rounded-xl p-4 border border-tabela-borda-suave col-span-2"
            style={{ background: 'var(--cor-card-fundo)', borderColor: 'var(--cor-tabela-borda-suave)' }}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--cor-card-texto)' }}>A Pagar e A Receber</h3>
            <div className="h-48 flex items-center justify-center text-gray-400">[Gráfico Placeholder]</div>
            <div className="flex gap-4 mt-2 text-xs">
              <span className="font-semibold text-red-500">■ Em Aberto</span>
              <span className="font-semibold text-blue-500">■ Pago</span>
              <span className="font-semibold text-green-500">■ A Receber</span>
              <span className="font-semibold text-gray-500">■ Recebido</span>
            </div>
          </div>
          <div className="bg-card-fundo rounded-xl p-4 border border-tabela-borda-suave"
            style={{ background: 'var(--cor-card-fundo)', borderColor: 'var(--cor-tabela-borda-suave)' }}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--cor-card-texto)' }}>Aniversariantes de hoje</h3>
            <ul className="text-sm" style={{ color: 'var(--cor-card-texto)' }}>
              {aniversariantes.map((a, i) => (
                <li key={i}>{a.nome} <span className="text-gray-600">- {a.idade} anos</span></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-card-fundo rounded-xl p-4 border border-tabela-borda-suave mb-8"
          style={{ background: 'var(--cor-card-fundo)', borderColor: 'var(--cor-tabela-borda-suave)' }}>
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--cor-card-texto)' }}>Últimos Agendamentos Online</h3>
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr style={{ background: 'var(--cor-tabela-cabecalho-fundo)' }}>
                <th className="px-2 py-1 font-semibold" style={{ color: 'var(--cor-tabela-cabecalho-texto)' }}>Agendado em</th>
                <th className="px-2 py-1 font-semibold" style={{ color: 'var(--cor-tabela-cabecalho-texto)' }}>Paciente</th>
                <th className="px-2 py-1 font-semibold" style={{ color: 'var(--cor-tabela-cabecalho-texto)' }}>Profissional</th>
                <th className="px-2 py-1 font-semibold" style={{ color: 'var(--cor-tabela-cabecalho-texto)' }}>CRM</th>
              </tr>
            </thead>
            <tbody>
              {agendamentos.map((a, i) => (
                <tr key={i} style={{ background: 'var(--cor-tabela-linha-fundo)' }}>
                  <td className="px-2 py-1" style={{ color: 'var(--cor-tabela-linha-texto)' }}>{a.data}</td>
                  <td className="px-2 py-1" style={{ color: 'var(--cor-tabela-linha-texto)' }}>{a.paciente}</td>
                  <td className="px-2 py-1" style={{ color: 'var(--cor-tabela-linha-texto)' }}>{a.profissional}</td>
                  <td className="px-2 py-1" style={{ color: 'var(--cor-tabela-linha-texto)' }}>{a.crm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <style jsx global>{`
@keyframes card-spin {
  0% { transform: rotateY(90deg) scale(0.8); opacity: 0; }
  100% { transform: rotateY(0deg) scale(1); opacity: 1; }
}
.animate-card-spin {
  animation: card-spin 0.7s cubic-bezier(0.4,0,0.2,1);
}
@keyframes graph-zoom {
  0% { transform: scale(0.7); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-graph-zoom {
  animation: graph-zoom 0.7s cubic-bezier(0.4,0,0.2,1);
}
:root {
  --cor-card-fundo: #F8F6F1; /* bege claro, por exemplo */
  --cor-tabela-cabecalho-fundo: #E5C97B; /* dourado */
  --cor-tabela-linha-fundo: #F8F6F1; /* bege claro */
  --cor-sidebar-borda: #D4AF37; /* dourado */
  /* ...outras variáveis */
}
`}</style>
    </BaseLayout>
  );
} 