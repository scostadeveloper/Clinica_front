import BaseLayout from '../../components/BaseLayout';
import Table from '../../components/ui/Table';
import ModalPaciente from '../../components/forms/ModalPaciente';
import { useState } from 'react';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const pacientesFake = [
  { nome: 'Ana Paula', email: 'ana@paciente.com', telefone: '(11) 99999-1111', genero: 'Feminino', nascimento: '1990-05-10' },
  { nome: 'Bruno Silva', email: 'bruno@paciente.com', telefone: '(11) 98888-2222', genero: 'Masculino', nascimento: '1985-08-22' },
];

export default function CadastroPaciente() {
  const [pacientes, setPacientes] = useState(pacientesFake);
  const [busca, setBusca] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  function handleSave(novo: any) {
    setPacientes([...pacientes, novo]);
  }

  function handleDelete(email: string) {
    if (window.confirm('Deseja realmente excluir este paciente?')) {
      setPacientes(pacientes.filter(p => p.email !== email));
    }
  }

  const pacientesFiltrados = pacientes.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    p.email.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <BaseLayout>
      <div className="max-w-20xl mx-auto px-2 sm:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-20 mb-10 gap-4">
          <h2 className="text-2xl font-bold text-[#d6c3a1]">Pacientes</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
              className="rounded-lg px-4 py-2 border border-[#d6c3a1]/30 bg-[#22382f] text-[#f5f5f5] placeholder-[#d6c3a1] focus:ring-2 focus:ring-[#d6c3a1] focus:border-[#d6c3a1] transition w-full sm:w-64"
            />
            <button
              className="flex items-center gap-2 bg-[#d6c3a1] text-[#22382f] px-4 py-2 rounded-lg font-semibold hover:bg-[#fffbe6] transition"
              onClick={() => setModalOpen(true)}
            >
              <FaPlus /> Novo Paciente
            </button>
          </div>
        </div>
        <div className="mt-8">
          <Table
            columns={[
              { label: 'Nome', key: 'nome' },
              { label: 'E-mail', key: 'email' },
              { label: 'Telefone', key: 'telefone' },
              { label: 'Gênero', key: 'genero' },
              { label: 'Nascimento', key: 'nascimento' },
            ]}
            data={pacientesFiltrados}
            actions={row => (
              <div className="flex gap-2 items-center justify-center">
                <button
                  className="text-[#d6c3a1] hover:text-blue-400"
                  title="Ver histórico"
                  onClick={() => window.location.href = `/cadastro/paciente/${encodeURIComponent(row.email)}`}
                >
                  <FaEye />
                </button>
                <button className="text-[#d6c3a1] hover:text-yellow-400" title="Editar"><FaEdit /></button>
                <button className="text-[#d6c3a1] hover:text-red-500" title="Excluir" onClick={() => handleDelete(row.email)}><FaTrash /></button>
              </div>
            )}
          />
        </div>
      </div>
      <ModalPaciente open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} />
    </BaseLayout>
  );
} 