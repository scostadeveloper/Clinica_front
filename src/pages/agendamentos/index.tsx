import { useState } from 'react';
import BaseLayout from '../../components/BaseLayout';

// Mock de agendamentos (apenas de 26 a 30 de maio de 2025)
const AGENDAMENTOS = [
  { id: 1, data: '2025-05-26', hora: '09:00', paciente: 'Maria da Silva', profissional: 'Dr. João', status: 'Confirmado' },
  { id: 2, data: '2025-05-27', hora: '14:00', paciente: 'Carlos Alberto', profissional: 'Dra. Ana', status: 'Pendente' },
  { id: 3, data: '2025-05-28', hora: '11:00', paciente: 'João Souza', profissional: 'Dr. João', status: 'Confirmado' },
  { id: 4, data: '2025-05-29', hora: '16:00', paciente: 'Maria Aparecida', profissional: 'Dra. Ana', status: 'Cancelado' },
  { id: 5, data: '2025-05-30', hora: '10:00', paciente: 'Mariana Silva', profissional: 'Dr. João', status: 'Confirmado' },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function AgendamentosPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(4); // Maio (0-based)
  const [currentYear, setCurrentYear] = useState(2025);

  // Dias do mês
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfWeek = getFirstDayOfWeek(currentYear, currentMonth);

  // Dias com agendamento (apenas se for maio/2025)
  const diasComAgendamento =
    currentMonth === 4 && currentYear === 2025
      ? AGENDAMENTOS.map(a => a.data).filter((v, i, arr) => arr.indexOf(v) === i)
      : [];

  // Lista filtrada
  const agendamentosFiltrados = selectedDate
    ? AGENDAMENTOS.filter(a => a.data === selectedDate)
    : (currentMonth === 4 && currentYear === 2025 ? AGENDAMENTOS : []);

  // Helpers para navegação do mês
  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
    setSelectedDate(null);
  }
  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
    setSelectedDate(null);
  }

  // Nomes dos dias da semana
  const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  return (
    <>
      <BaseLayout>
        <div className="max-w-7xl mx-auto px-2 sm:px-0 mt-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Card de calendário */}
            <div className="bg-card-fundo rounded-xl shadow p-6 w-full md:w-1/3" style={{ background: 'var(--cor-card-fundo)' }}>
              <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth} className="text-[#d6c3a1] font-bold text-xl">&#8592;</button>
                <span className="font-bold text-lg" style={{ color: 'var(--cor-card-texto)' }}>
                  {new Date(currentYear, currentMonth).toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
                </span>
                <button onClick={nextMonth} className="text-[#d6c3a1] font-bold text-xl">&#8594;</button>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {diasSemana.map(dia => (
                  <div key={dia} className="text-center font-semibold text-[#d6c3a1]">{dia}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array(firstDayOfWeek).fill(null).map((_, i) => (
                  <div key={i}></div>
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const dia = i + 1;
                  const dataStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
                  const marcado = diasComAgendamento.includes(dataStr);
                  const selecionado = selectedDate === dataStr;
                  return (
                    <button
                      key={dia}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold transition border ${selecionado ? 'bg-[#d6c3a1] text-[#22382f] border-[#d6c3a1]' : marcado ? 'bg-[#f5ecd7] text-[#22382f] border-[#d6c3a1]' : 'bg-transparent text-[#22382f] border-transparent hover:bg-[#f5ecd7]'}`}
                      onClick={() => setSelectedDate(selecionado ? null : dataStr)}
                    >
                      {dia}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Lista de agendamentos */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--cor-card-texto)' }}>Agendamentos</h2>
                <button className="px-6 py-2 rounded-lg font-semibold shadow transition" style={{ background: 'var(--cor-botao-principal-fundo)', color: 'var(--cor-botao-principal-texto)' }}>+ Novo Agendamento</button>
              </div>
              <div className="bg-card-fundo rounded-xl shadow p-4" style={{ background: 'var(--cor-card-fundo)' }}>
                {agendamentosFiltrados.length === 0 && (
                  <div className="text-center text-[#bfa77a] py-8">Nenhum agendamento para este dia.</div>
                )}
                {agendamentosFiltrados.map(a => (
                  <div key={a.id} className="flex items-center justify-between border-b border-[#d6c3a1]/20 py-3 last:border-0">
                    <div>
                      <div className="font-bold text-[#22382f]">{a.hora} - {a.paciente}</div>
                      <div className="text-sm text-[#bfa77a]">Profissional: {a.profissional} | Status: {a.status}</div>
                    </div>
                    <button className="text-[#d6c3a1] hover:text-red-500 font-bold transition">Cancelar</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
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