import BaseLayout from '../../components/BaseLayout';
import Table from '../../components/ui/Table';
import ModalUsuario from '../../components/forms/ModalUsuario';
import { useState } from 'react';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const usuariosFake = [
  { nome: 'João da Silva', email: 'joao@clinica.com', funcoes: 'Administrador', status: 'Ativo' },
  { nome: 'Maria Souza', email: 'maria@clinica.com', funcoes: 'Profissional', status: 'Ativo' },
  { nome: 'Carlos Lima', email: 'carlos@clinica.com', funcoes: 'Recepção', status: 'Inativo' },
];

export default function CadastroUsuario() {
  const [usuarios, setUsuarios] = useState(usuariosFake);
  const [busca, setBusca] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  function handleSave(novo: any) {
    setUsuarios([...usuarios, { ...novo, funcoes: (novo.funcoes || []).join(', '), status: novo.status === 'ativo' ? 'Ativo' : 'Inativo' }]);
  }

  function handleDelete(email: string) {
    if (window.confirm('Deseja realmente excluir este usuário?')) {
      setUsuarios(usuarios.filter(u => u.email !== email));
    }
  }

  const usuariosFiltrados = usuarios.filter(u =>
    u.nome.toLowerCase().includes(busca.toLowerCase()) ||
    u.email.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <BaseLayout>
      <div className="max-w-20xl mx-auto px-2 sm:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-20 mb-10 gap-4">
          <h2 className="text-2xl font-bold text-[#d6c3a1]">Usuários</h2>
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
              <FaPlus /> Novo Usuário
            </button>
          </div>
        </div>
        <div className="mt-8">
          <Table
            columns={[
              { label: 'Nome', key: 'nome' },
              { label: 'E-mail', key: 'email' },
              { label: 'Função', key: 'funcoes' },
              { label: 'Status', key: 'status' },
            ]}
            data={usuariosFiltrados}
            actions={row => (
              <div className="flex gap-2 items-center justify-center">
                <button className="text-[#d6c3a1] hover:text-blue-400" title="Visualizar"><FaEye /></button>
                <button className="text-[#d6c3a1] hover:text-yellow-400" title="Editar"><FaEdit /></button>
                <button className="text-[#d6c3a1] hover:text-red-500" title="Excluir" onClick={() => handleDelete(row.email)}><FaTrash /></button>
              </div>
            )}
          />
        </div>
      </div>
      <ModalUsuario open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} />
    </BaseLayout>
  );
} 