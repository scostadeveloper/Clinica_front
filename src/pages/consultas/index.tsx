import BaseLayout from '../../components/BaseLayout';
import Table from '../../components/ui/Table';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaStethoscope } from 'react-icons/fa';

// Dados mockados de pacientes
const PACIENTES = [
  { id: 1, nome: 'Maria da Silva', nascimento: '1985-04-12', cpf: '123.456.789-00' },
  { id: 2, nome: 'Mariana Silva', nascimento: '1990-08-22', cpf: '987.654.321-00' },
  { id: 3, nome: 'João Souza', nascimento: '1978-11-05', cpf: '111.222.333-44' },
  { id: 4, nome: 'Carlos Alberto', nascimento: '2000-01-30', cpf: '555.666.777-88' },
  { id: 5, nome: 'Maria Aparecida', nascimento: '1960-09-15', cpf: '999.888.777-66' },
];

export default function ConsultasPage() {
  const [busca, setBusca] = useState('');
  const router = useRouter();

  // Filtra pacientes por nome
  const pacientesFiltrados = PACIENTES.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // Verifica se há nomes similares
  const existeSimilar = busca.length > 2 && PACIENTES.some(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) && p.nome.toLowerCase() !== busca.toLowerCase()
  );

  return (
    <>
      <BaseLayout>
        <div className="max-w-7xl mx-auto px-2 sm:px-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-20 mb-10 gap-4">
            <h2 className="text-2xl font-bold text-[#d6c3a1]">Pacientes para Consulta</h2>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Buscar por nome..."
                value={busca}
                onChange={e => setBusca(e.target.value)}
                className="rounded-lg px-4 py-2 border border-[#d6c3a1]/30 bg-[#22382f] text-[#f5f5f5] placeholder-[#d6c3a1] focus:ring-2 focus:ring-[#d6c3a1] focus:border-[#d6c3a1] transition w-full sm:w-64"
              />
            </div>
          </div>
          {existeSimilar && (
            <div className="mb-4 text-yellow-700 bg-yellow-100 border border-yellow-300 rounded px-3 py-2 text-sm max-w-md">
              Atenção: Existe paciente com nome similar!
            </div>
          )}
          <div className="mt-8">
            <Table
              columns={[
                { label: 'Nome', key: 'nome' },
                { label: 'Nascimento', key: 'nascimento' },
                { label: 'CPF', key: 'cpf' },
              ]}
              data={pacientesFiltrados}
              actions={row => (
                <button
                  className="flex items-center gap-2 bg-[#d6c3a1] text-[#22382f] px-4 py-2 rounded-lg font-semibold hover:bg-[#fffbe6] transition"
                  onClick={() => router.push(`/consultas/${row.id}`)}
                  title="Iniciar Consulta"
                >
                  <FaStethoscope /> Iniciar Consulta
                </button>
              )}
            />
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
        }
      `}</style>
    </>
  );
} 