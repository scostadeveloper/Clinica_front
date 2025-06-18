import { useState } from 'react';
import { useRouter } from 'next/router';
import BaseLayout from '../../components/BaseLayout';

const PACIENTES = [
  { id: 1, nome: 'Maria da Silva', nascimento: '1985-04-12', cpf: '123.456.789-00' },
  { id: 2, nome: 'Mariana Silva', nascimento: '1990-08-22', cpf: '987.654.321-00' },
  { id: 3, nome: 'João Souza', nascimento: '1978-11-05', cpf: '111.222.333-44' },
  { id: 4, nome: 'Carlos Alberto', nascimento: '2000-01-30', cpf: '555.666.777-88' },
  { id: 5, nome: 'Maria Aparecida', nascimento: '1960-09-15', cpf: '999.888.777-66' },
];

const ABAS = [
  'Anamnese e Evoluções',
  'Laudos e Formulários',
  'Diagnósticos',
  'Encaminhamentos',
  'Prescrições',
  'Pedidos de Exame',
  'Produtos Utilizados',
];

export default function ConsultaPaciente() {
  const router = useRouter();
  const { id } = router.query;
  const paciente = PACIENTES.find(p => p.id === Number(id));
  const [aba, setAba] = useState(0);

  return (
    <>
      <BaseLayout>
        <div className="max-w-7xl mx-auto px-2 sm:px-0 mt-10">
          {/* Botão Voltar */}
          <button
            className="mb-4 px-5 py-2 rounded-lg font-semibold shadow transition border border-[#d6c3a1] text-[#d6c3a1] bg-transparent hover:bg-[#f5ecd7]"
            onClick={() => router.push('/consultas')}
          >
            ← Voltar
          </button>
          {/* Grid de informações do paciente */}
          <div className="flex flex-col md:flex-row md:items-center justify-between bg-card-fundo rounded-xl shadow p-6 mb-6" style={{ background: 'var(--cor-card-fundo)' }}>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-bold" style={{ color: 'var(--cor-card-texto)' }}>{paciente?.nome}</span>
              <span className="text-sm" style={{ color: 'var(--cor-card-texto)' }}>Nascimento: {paciente?.nascimento}</span>
              <span className="text-sm" style={{ color: 'var(--cor-card-texto)' }}>CPF: {paciente?.cpf}</span>
            </div>
            <button
              className="mt-4 md:mt-0 px-6 py-2 rounded-lg font-semibold shadow transition text-white"
              style={{ background: 'var(--cor-botao-principal-fundo)', color: 'var(--cor-botao-principal-texto)', fontWeight: 700 }}
            >
              📈 Curvas de Evolução
            </button>
          </div>

          {/* Abas no topo */}
          <div className="flex gap-2 border-b border-[#d6c3a1]/30 mb-8">
            {ABAS.map((nome, idx) => (
              <button
                key={nome}
                onClick={() => setAba(idx)}
                className={`px-5 py-2 font-semibold rounded-t-lg transition border-b-2 ${aba === idx ? 'border-[#d6c3a1] bg-[#f5ecd7] text-[#22382f]' : 'border-transparent bg-transparent text-[#d6c3a1] hover:bg-[#22382f]/30'}`}
                style={aba === idx ? { fontWeight: 700 } : {}}
              >
                {nome}
              </button>
            ))}
          </div>

          {/* Conteúdo das abas */}
          <div className="bg-card-fundo rounded-xl shadow p-6 min-h-[300px]" style={{ background: 'var(--cor-card-fundo)' }}>
            {aba === 0 && (
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--cor-card-texto)' }}>Anamneses e Evoluções</h3>
                <div className="flex gap-2 mb-6">
                  <button className="px-6 py-2 rounded-lg font-semibold shadow transition" style={{ background: 'var(--cor-botao-principal-fundo)', color: 'var(--cor-botao-principal-texto)' }}>+ Inserir Anamnese / Evolução ▼</button>
                  <button className="px-6 py-2 rounded-lg font-semibold shadow transition" style={{ background: 'var(--cor-login-borda)', color: 'var(--cor-botao-principal-texto)' }}>Pendentes de Consentimento</button>
                  <button className="px-6 py-2 rounded-lg font-semibold shadow transition" style={{ background: 'var(--cor-login-borda)', color: 'var(--cor-botao-principal-texto)' }}>Restaurar Formulário</button>
                </div>
                <div className="text-[#bfa77a]">[Conteúdo da Anamnese/Evolução aqui]</div>
              </div>
            )}
            {aba === 1 && (
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--cor-card-texto)' }}>Laudos e Formulários</h3>
                <button className="px-6 py-2 rounded-lg font-semibold shadow transition" style={{ background: 'var(--cor-botao-principal-fundo)', color: 'var(--cor-botao-principal-texto)' }}>+ Inserir Laudo / Formulário ▼</button>
                <div className="text-[#bfa77a] mt-6">[Conteúdo de Laudos e Formulários aqui]</div>
              </div>
            )}
            {aba === 2 && (
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--cor-card-texto)' }}>Diagnósticos</h3>
                <button className="px-6 py-2 rounded-lg font-semibold shadow transition" style={{ background: 'var(--cor-botao-principal-fundo)', color: 'var(--cor-botao-principal-texto)' }}>+ Inserir Diagnóstico</button>
                <div className="text-[#bfa77a] mt-6">[Conteúdo de Diagnósticos aqui]</div>
              </div>
            )}
            {aba === 3 && (
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--cor-card-texto)' }}>Encaminhamentos</h3>
                <div className="flex flex-col md:flex-row gap-2 mb-4">
                  <select className="rounded-lg px-4 py-2 border border-[#d6c3a1]/30 bg-[#f5ecd7] text-[#22382f]">
                    <option>Especialidade</option>
                  </select>
                  <select className="rounded-lg px-4 py-2 border border-[#d6c3a1]/30 bg-[#f5ecd7] text-[#22382f]">
                    <option>Modelo</option>
                  </select>
                  <select className="rounded-lg px-4 py-2 border border-[#d6c3a1]/30 bg-[#f5ecd7] text-[#22382f]">
                    <option>CID 10</option>
                  </select>
                  <button className="px-6 py-2 rounded-lg font-semibold shadow transition" style={{ background: 'var(--cor-botao-principal-fundo)', color: 'var(--cor-botao-principal-texto)' }}>+ Inserir Encaminhamento ▼</button>
                </div>
                <div className="text-[#bfa77a]">[Conteúdo de Encaminhamentos aqui]</div>
              </div>
            )}
            {aba === 4 && (
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--cor-card-texto)' }}>Prescrições</h3>
                <div className="flex gap-2 mb-4">
                  <button className="px-6 py-2 rounded-lg font-semibold shadow transition" style={{ background: 'var(--cor-botao-principal-fundo)', color: 'var(--cor-botao-principal-texto)' }}>+ Nova</button>
                  <button className="px-6 py-2 rounded-lg font-semibold shadow transition" style={{ background: 'var(--cor-botao-principal-fundo)', color: 'var(--cor-botao-principal-texto)' }}>Salvar e Imprimir</button>
                </div>
                <div className="text-[#bfa77a]">[Conteúdo de Prescrições aqui]</div>
              </div>
            )}
            {aba === 5 && (
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--cor-card-texto)' }}>Pedidos de Exame</h3>
                <div className="flex gap-2 mb-4">
                  <button className="px-6 py-2 rounded-lg font-semibold shadow transition" style={{ background: 'var(--cor-acao-verde)', color: '#fff' }}>+ Novo</button>
                  <button className="px-6 py-2 rounded-lg font-semibold shadow transition" style={{ background: 'var(--cor-botao-principal-fundo)', color: 'var(--cor-botao-principal-texto)' }}>Salvar e Imprimir</button>
                </div>
                <div className="text-[#bfa77a]">[Conteúdo de Pedidos de Exame aqui]</div>
              </div>
            )}
            {aba === 6 && (
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--cor-card-texto)' }}>Produtos Utilizados</h3>
                <div className="text-[#bfa77a]">[Conteúdo de Produtos Utilizados aqui]</div>
              </div>
            )}
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
          --cor-acao-verde: #6fcf97;
        }
      `}</style>
    </>
  );
} 