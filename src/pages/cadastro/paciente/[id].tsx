import BaseLayout from '../../../components/BaseLayout';
import Table from '../../../components/ui/Table';
import { useRouter } from 'next/router';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

// Mock de dados do paciente e histórico
const pacienteMock = {
  nome: 'Ana Paula',
  email: 'ana@paciente.com',
  telefone: '(11) 99999-1111',
  genero: 'Feminino',
  nascimento: '1990-05-10',
  historico: [
    {
      data: '2024-06-01',
      profissional: 'Dr. João',
      tipo: 'Consulta',
      observacoes: 'Paciente relatou dor de cabeça.',
    },
    {
      data: '2024-06-10',
      profissional: 'Enf. Maria',
      tipo: 'Curativo',
      observacoes: 'Curativo realizado no braço direito.',
    },
  ],
};

export default function DetalhePaciente() {
  const router = useRouter();
  const { id } = router.query;
  // No futuro, buscar paciente pelo id
  const paciente = pacienteMock;

  return (
    <BaseLayout>
      <div className="max-w-4xl mx-auto bg-[#1e332c] rounded-xl shadow-lg p-8 border border-[#d6c3a1]/30 mt-10">
        <h2 className="text-2xl font-bold text-[#d6c3a1] mb-6">Detalhes do Paciente</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <span className="block text-[#d6c3a1] font-medium">Nome</span>
            <span className="block text-white">{paciente.nome}</span>
          </div>
          <div>
            <span className="block text-[#d6c3a1] font-medium">E-mail</span>
            <span className="block text-white">{paciente.email}</span>
          </div>
          <div>
            <span className="block text-[#d6c3a1] font-medium">Telefone</span>
            <span className="block text-white">{paciente.telefone}</span>
          </div>
          <div>
            <span className="block text-[#d6c3a1] font-medium">Gênero</span>
            <span className="block text-white">{paciente.genero}</span>
          </div>
          <div>
            <span className="block text-[#d6c3a1] font-medium">Nascimento</span>
            <span className="block text-white">{paciente.nascimento}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-[#d6c3a1] mb-4">Histórico de Atendimentos</h3>
        <div className="overflow-x-auto rounded-lg border border-[#d6c3a1]/30">
          <table className="min-w-full text-sm text-left bg-[#1e332c] rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[#22382f] text-[#d6c3a1]">
                <th className="px-4 py-2 font-semibold rounded-tl-lg">Data</th>
                <th className="px-4 py-2 font-semibold rounded-tl-lg">Profissional</th>
                <th className="px-4 py-2 font-semibold rounded-tl-lg">Tipo</th>
                <th className="px-4 py-2 font-semibold rounded-tl-lg">Observações</th>
                <th className="px-4 py-2 font-semibold rounded-tr-lg">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paciente.historico.map((item, i) => (
                <tr key={i} className="bg-[#1e332c] text-white border-b border-[#d6c3a1]/10 last:border-b-0">
                  <td className="px-4 py-2">{item.data}</td>
                  <td className="px-4 py-2">{item.profissional}</td>
                  <td className="px-4 py-2">{item.tipo}</td>
                  <td className="px-4 py-2">{item.observacoes}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2 items-center justify-center">
                      <button className="text-[#d6c3a1] hover:text-blue-400"><FaEye /></button>
                      <button className="text-[#d6c3a1] hover:text-yellow-400"><FaEdit /></button>
                      <button className="text-[#d6c3a1] hover:text-red-500"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BaseLayout>
  );
} 