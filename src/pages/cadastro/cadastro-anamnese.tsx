import BaseLayout from '../../components/BaseLayout';
import { useState } from 'react';
import { FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Table from '../../components/ui/Table';
import ModalAnamneseBuilder from '../../components/forms/ModalAnamneseBuilder';

const anamnesesFake = [
  { nome: 'Anamnese Geral', criadoEm: '2024-06-01', campos: 8 },
  { nome: 'Anamnese Estética', criadoEm: '2024-06-10', campos: 12 },
];

export default function CadastroAnamnese() {
  const [anamneses, setAnamneses] = useState(anamnesesFake);
  const [modalOpen, setModalOpen] = useState(false);

  function handleSave(nova: any) {
    setAnamneses([...anamneses, nova]);
  }

  function handleDelete(nome: string) {
    if (window.confirm('Deseja realmente excluir este formulário?')) {
      setAnamneses(anamneses.filter(a => a.nome !== nome));
    }
  }

  return (
    <BaseLayout>
      <div className="max-w-7xl mx-auto px-2 sm:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-20 mb-10 gap-4">
          <h2 className="text-2xl font-bold text-[#d6c3a1]">Formulários de Anamnese</h2>
          <button
            className="flex items-center gap-2 bg-[#d6c3a1] text-[#22382f] px-4 py-2 rounded-lg font-semibold hover:bg-[#fffbe6] transition"
            onClick={() => setModalOpen(true)}
          >
            <FaPlus /> Novo Formulário
          </button>
        </div>
        <div className="mt-8">
          <Table
            columns={[
              { label: 'Nome', key: 'nome' },
              { label: 'Criado em', key: 'criadoEm' },
              { label: 'Qtd. Campos', key: 'campos' },
            ]}
            data={anamneses}
            actions={a => (
              <div className="flex gap-2 items-center justify-center">
                <button className="text-[#d6c3a1] hover:text-blue-400" title="Visualizar"><FaEye /></button>
                <button className="text-[#d6c3a1] hover:text-yellow-400" title="Editar"><FaEdit /></button>
                <button className="text-[#d6c3a1] hover:text-red-500" title="Excluir" onClick={() => handleDelete(a.nome)}><FaTrash /></button>
              </div>
            )}
          />
        </div>
      </div>
      <ModalAnamneseBuilder open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} />
    </BaseLayout>
  );
} 