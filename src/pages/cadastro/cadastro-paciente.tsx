import BaseLayout from '../../components/BaseLayout';
import Table from '../../components/ui/Table';
import ModalPaciente from '../../components/forms/ModalPaciente';
import { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { api } from '../../services/api';
import { cleanCPF } from '../../utils/cpfValidator';

export default function CadastroPaciente() {
  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [loading, setLoading] = useState(false);

  // Carregar pacientes da API
  useEffect(() => {
    loadPacientes();
  }, []);

  async function loadPacientes() {
    try {
      setLoading(true);
      const response = await api.get('/patients');
      if (response.data && response.data.success && response.data.data) {
        setPacientes(response.data.data);
      }
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
      // Em caso de erro, mantém array vazio
      setPacientes([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(dadosPaciente: any) {
    try {
      setLoading(true);
      
      // Função para converter sexo do frontend para o formato do backend
      const convertSexo = (sexo: string) => {
        const sexoMap: { [key: string]: string } = {
          'masculino': 'MASCULINO',
          'feminino': 'FEMININO',
          'outro': 'OUTRO',
          'nao_informar': 'NAO_INFORMAR'
        };
        return sexoMap[sexo] || sexo;
      };
      
      // Preparar dados para envio - removendo campos problemáticos temporariamente
      const dadosParaEnvio = {
        nome: dadosPaciente.nome,
        cpf: cleanCPF(dadosPaciente.cpf), // Remove máscara do CPF
        telefone: dadosPaciente.telefone,
        email: dadosPaciente.email || '',
        nascimento: dadosPaciente.nascimento,
        sexo: convertSexo(dadosPaciente.sexo || dadosPaciente.genero),
        rg: dadosPaciente.rg || undefined,
        endereco: dadosPaciente.endereco || undefined,
        numero: dadosPaciente.numero || undefined,
        complemento: dadosPaciente.complemento || undefined,
        bairro: dadosPaciente.bairro || undefined,
        cidade: dadosPaciente.cidade || undefined,
        estado: dadosPaciente.estado || undefined,
        pais: dadosPaciente.pais || undefined,
        cep: dadosPaciente.cep || undefined,
        // altura: dadosPaciente.altura && dadosPaciente.altura !== '' ? parseFloat(dadosPaciente.altura) : undefined,
        // peso: dadosPaciente.peso && dadosPaciente.peso !== '' ? parseFloat(dadosPaciente.peso) : undefined,
        // imc: dadosPaciente.imc && dadosPaciente.imc !== '' ? parseFloat(dadosPaciente.imc) : undefined,
        profissao: dadosPaciente.profissao || undefined,
        observacoes: dadosPaciente.observacoes || undefined
        // Unidade será definida pelo backend baseado no usuário logado
      };

      // Filtrar campos undefined e strings vazias para não enviar para a API
      const dadosLimpos = Object.fromEntries(
        Object.entries(dadosParaEnvio).filter(([_, v]) => v !== undefined && v !== '' && v !== null)
      );

      console.log('Dados que serão enviados:', dadosLimpos);
      console.log('🔍 [DEBUG] CPF original:', dadosPaciente.cpf);
      console.log('🔍 [DEBUG] CPF limpo:', cleanCPF(dadosPaciente.cpf));
      console.log('🔍 [DEBUG] Email:', dadosPaciente.email);
      console.log('🔍 [DEBUG] Sexo original:', dadosPaciente.sexo);
      console.log('🔍 [DEBUG] Sexo convertido:', convertSexo(dadosPaciente.sexo || dadosPaciente.genero));
      console.log('🔍 [DEBUG] Dados completos:', JSON.stringify(dadosLimpos, null, 2));

      // Teste de conectividade primeiro
      try {
        console.log('🧪 [TEST] Testando conectividade...');
        const testResponse = await api.post('/patients/test', { test: 'connectivity' });
        console.log('🧪 [TEST] Conectividade OK:', testResponse.data);
      } catch (testError: any) {
        console.error('🧪 [TEST] Erro de conectividade:', testError);
        alert('Erro de conectividade com o servidor. Verifique se o backend está rodando.');
        return;
      }

      let response;
      if (editingPatient) {
        // Atualização
        response = await api.put(`/patients/${(editingPatient as any).id}`, dadosLimpos);
        alert('Paciente atualizado com sucesso!');
      } else {
        // Criação
        response = await api.post('/patients', dadosLimpos);
        alert('Paciente cadastrado com sucesso!');
      }
      
      if (response.data && response.data.success) {
        // Atualizar lista
        await loadPacientes();
        setModalOpen(false);
        setEditingPatient(null);
      }
    } catch (error: any) {
      console.error('Erro ao salvar paciente:', error);
      console.error('Detalhes do erro:', error.response?.data);
      
      if (error.response?.data?.error) {
        if (
          error.response.data.error.includes('CPF já cadastrado') ||
          error.response.data.error.includes('Já existe um paciente cadastrado com este CPF')
        ) {
          alert('Já existe um paciente cadastrado com este CPF.\nVerifique a lista de pacientes ou peça para reativar o cadastro.');
          return;
        }
        alert(`Erro: ${error.response.data.error}`);
      } else if (error.response?.data?.details) {
        const details = error.response.data.details;
        const errorMessages = details.map((detail: any) => `${detail.field}: ${detail.message}`).join('\n');
        alert(`Erro de validação:\n${errorMessages}`);
      } else {
        const action = editingPatient ? 'atualizar' : 'cadastrar';
        alert(`Erro ao ${action} paciente. Verifique os dados e tente novamente.`);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(paciente: any) {
    try {
      setLoading(true);
      // Buscar dados completos do paciente
      const response = await api.get(`/patients/${paciente.id}`);
      
      if (response.data && response.data.success) {
        setEditingPatient(response.data.data);
        setModalOpen(true);
      }
    } catch (error: any) {
      console.error('Erro ao carregar dados do paciente:', error);
      alert('Erro ao carregar dados do paciente para edição.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (window.confirm('Deseja realmente excluir este paciente? Esta ação não pode ser desfeita.')) {
      try {
        setLoading(true);
        const response = await api.delete(`/patients/${id}`);
        
        if (response.data && response.data.success) {
          alert('Paciente excluído com sucesso!');
          await loadPacientes();
        }
      } catch (error: any) {
        console.error('Erro ao excluir paciente:', error);
        
        if (error.response?.data?.error) {
          alert(`Erro: ${error.response.data.error}`);
        } else {
          alert('Erro ao excluir paciente.');
        }
      } finally {
        setLoading(false);
      }
    }
  }

  function handleViewHistory(paciente: any) {
    // Por enquanto, vamos apenas mostrar um alert com as informações básicas
    // Futuramente pode ser uma página específica ou modal
    alert(`Histórico do paciente: ${paciente.nome}\nID: ${paciente.id}\nE-mail: ${paciente.email}\nTelefone: ${paciente.telefone}`);
  }

  function handleNewPatient() {
    setEditingPatient(null);
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
    setEditingPatient(null);
  }

  const pacientesFiltrados = pacientes.filter((p: any) =>
    p.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    p.email?.toLowerCase().includes(busca.toLowerCase())
  ).map((p: any) => ({
    ...p,
    nascimento: p.nascimento ? new Date(p.nascimento).toLocaleDateString('pt-BR') : '-'
  }));

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
              className="flex items-center gap-2 bg-[#d6c3a1] text-[#22382f] px-4 py-2 rounded-lg font-semibold hover:bg-[#fffbe6] transition disabled:opacity-50"
              onClick={handleNewPatient}
              disabled={loading}
            >
              <FaPlus /> {loading ? 'Carregando...' : 'Novo Paciente'}
            </button>
          </div>
        </div>
        <div className="mt-8">
          <Table
            columns={[
              { label: 'Nome', key: 'nome' },
              { label: 'E-mail', key: 'email' },
              { label: 'Telefone', key: 'telefone' },
              { label: 'Gênero', key: 'sexo' },
              { label: 'Nascimento', key: 'nascimento' },
              { label: 'Status', key: 'status' }, // Adicionada coluna Status
            ]}
            data={pacientesFiltrados}
            actions={(row: any) => (
              <div className="flex gap-2 items-center justify-center">
                <button
                  className="text-[#d6c3a1] hover:text-blue-400 transition"
                  title="Ver histórico"
                  onClick={() => handleViewHistory(row)}
                  disabled={loading}
                >
                  <FaEye />
                </button>
                <button 
                  className="text-[#d6c3a1] hover:text-yellow-400 transition" 
                  title="Editar"
                  onClick={() => handleEdit(row)}
                  disabled={loading}
                >
                  <FaEdit />
                </button>
                <button 
                  className="text-[#d6c3a1] hover:text-red-500 transition" 
                  title="Excluir" 
                  onClick={() => handleDelete(row.id)}
                  disabled={loading}
                >
                  <FaTrash />
                </button>
              </div>
            )}
          />
        </div>
      </div>
      <ModalPaciente 
        open={modalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSave}
        initialData={editingPatient}
        isEditing={!!editingPatient}
      />
    </BaseLayout>
  );
}