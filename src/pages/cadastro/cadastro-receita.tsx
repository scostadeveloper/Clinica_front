import BaseLayout from '../../components/BaseLayout';
import { useState } from 'react';
import { FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import ModalReceita from '../../components/forms/ModalReceita';
import Table from '../../components/ui/Table';

const receitasFake = [
  { nome: 'Receita Simples', descricao: 'Uso oral', conteudo: 'Tomar 1 comprimido ao dia', obs: '' },
  { nome: 'Receita Controlada', descricao: 'Uso restrito', conteudo: 'Tomar 2 comprimidos à noite', obs: 'Atenção ao controle' },
];

export default function CadastroReceita() {
  const [receitas, setReceitas] = useState(receitasFake);
  const [busca, setBusca] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  function handleSave(nova: any) {
    setReceitas([...receitas, nova]);
  }

  function handleDelete(nome: string) {
    if (window.confirm('Deseja realmente excluir esta receita?')) {
      setReceitas(receitas.filter(r => r.nome !== nome));
    }
  }

  const receitasFiltradas = receitas.filter(r =>
    r.nome.toLowerCase().includes(busca.toLowerCase()) ||
    (r.descricao && r.descricao.toLowerCase().includes(busca.toLowerCase()))
  );

  return (
    <BaseLayout>
      <div className="max-w-20xl mx-auto px-2 sm:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-20 mb-10 gap-4">
          <h2 className="text-2xl font-bold text-[#d6c3a1]">Modelos de Receita</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Buscar por nome ou descrição..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
              className="rounded-lg px-4 py-2 border border-[#d6c3a1]/30 bg-[#22382f] text-[#f5f5f5] placeholder-[#d6c3a1] focus:ring-2 focus:ring-[#d6c3a1] focus:border-[#d6c3a1] transition w-full sm:w-64"
            />
            <button
              className="flex items-center gap-2 bg-[#d6c3a1] text-[#22382f] px-4 py-2 rounded-lg font-semibold hover:bg-[#fffbe6] transition"
              onClick={() => setModalOpen(true)}
            >
              <FaPlus /> Nova Receita
            </button>
          </div>
        </div>
        <div className="mt-8">
          <Table
            columns={[
              { label: 'Nome', key: 'nome' },
              { label: 'Descrição', key: 'descricao' },
              { label: 'Conteúdo', key: 'conteudo' },
              { label: 'Observações', key: 'obs' },
            ]}
            data={receitasFiltradas}
            actions={r => (
              <div className="flex gap-2 items-center justify-center">
                <button className="text-[#d6c3a1] hover:text-blue-400" title="Visualizar"><FaEye /></button>
                <button className="text-[#d6c3a1] hover:text-yellow-400" title="Editar"><FaEdit /></button>
                <button className="text-[#d6c3a1] hover:text-red-500" title="Excluir" onClick={() => handleDelete(r.nome)}><FaTrash /></button>
              </div>
            )}
          />
        </div>
      </div>
      <ModalReceita open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} />
    </BaseLayout>
  );
} 