import { useState } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaCamera, FaMapMarkerAlt } from 'react-icons/fa';

interface ModalPacienteProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export default function ModalPaciente({ open, onClose, onSave, initialData }: ModalPacienteProps) {
  const [form, setForm] = useState(initialData || {
    nome: '', nascimento: '', email: '', telefone: '', genero: '', cpf: '', prontuario: '', estrangeiro: false, corIdentificacao: '',
    sexo: '', nomeSocial: '', altura: '', peso: '', imc: '', prioridade: '',
    cep: '', endereco: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', pais: '', profissao: '', naturalidade: '', nacionalidade: '', origem: '', religiao: '', corPele: '', escolaridade: '', estadoCivil: '', rg: '', indicacao: '', cns: '', tabela: '', telefone2: '', celular: '', observacoes: '',
    foto: '',
    // convênios, agendamentos, parentes, etc
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target as HTMLInputElement;
    setForm({ ...form, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-y-auto">
      <div className="bg-[#1e332c] w-full max-w-6xl rounded-xl shadow-2xl p-6 relative border border-[#d6c3a1]/30 overflow-y-auto max-h-[95vh]">
        <button className="absolute top-2 right-2 text-[#d6c3a1] hover:text-red-500 text-xl" onClick={onClose}>×</button>
        <h2 className="text-2xl font-bold mb-4 text-[#d6c3a1]">Cadastro de Paciente</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dados Pessoais */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Foto */}
            <div className="flex flex-col items-center w-full md:w-1/4">
              <div className="w-40 h-40 border-2 border-dashed border-[#d6c3a1] rounded-lg flex flex-col items-center justify-center mb-2 bg-[#22382f] relative">
                {form.foto ? (
                  <img src={form.foto} alt="Foto do paciente" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <>
                    <FaUser className="text-5xl text-[#d6c3a1] mb-2" />
                    <span className="text-[#d6c3a1] text-sm">Sem foto</span>
                  </>
                )}
                <label className="absolute bottom-2 right-2 bg-[#d6c3a1] rounded-full p-2 shadow cursor-pointer border border-[#22382f]">
                  <FaCamera className="text-[#22382f]" />
                  <input type="file" accept="image/*" className="hidden" onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = ev => setForm((f: typeof form) => ({ ...f, foto: (ev.target as FileReader)?.result as string }));
                      reader.readAsDataURL(file);
                    }
                  }} />
                </label>
              </div>
              <button type="button" className="text-xs text-red-600 mt-1">Remover foto</button>
            </div>
            {/* Campos principais */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <div>
                <label htmlFor="nome" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Nome *</label>
                <div className="relative">
                  <input id="nome" name="nome" value={form.nome} onChange={handleChange} className="input w-full pl-8" required />
                  <FaUser className="absolute left-2 top-1/2 -translate-y-1/2 text-[#d6c3a1]" />
                </div>
              </div>
              <div>
                <label htmlFor="nascimento" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Nascimento *</label>
                <input id="nascimento" name="nascimento" value={form.nascimento} onChange={handleChange} type="date" className="input w-full" required />
              </div>
              <div>
                <label htmlFor="cpf" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">CPF *</label>
                <input id="cpf" name="cpf" value={form.cpf} onChange={handleChange} className="input w-full" required />
              </div>
              <div>
                <label htmlFor="sexo" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Sexo</label>
                <select id="sexo" name="sexo" value={form.sexo} onChange={handleChange} className="input w-full">
                  <option value="">Selecione</option>
                  <option value="feminino">Feminino</option>
                  <option value="masculino">Masculino</option>
                  <option value="outro">Outro</option>
                  <option value="nao_informar">Prefiro não informar</option>
                </select>
              </div>
              <div>
                <label htmlFor="nomeSocial" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Nome Social</label>
                <input id="nomeSocial" name="nomeSocial" value={form.nomeSocial} onChange={handleChange} className="input w-full" />
              </div>
              <div>
                <label htmlFor="prontuario" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Prontuário *</label>
                <input id="prontuario" name="prontuario" value={form.prontuario} onChange={handleChange} className="input w-full" required />
              </div>
              <div>
                <label htmlFor="telefone" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Telefone *</label>
                <div className="relative">
                  <input id="telefone" name="telefone" value={form.telefone} onChange={handleChange} className="input w-full pl-8" required />
                  <FaPhone className="absolute left-2 top-1/2 -translate-y-1/2 text-[#d6c3a1]" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">E-mail *</label>
                <div className="relative">
                  <input id="email" name="email" value={form.email} onChange={handleChange} className="input w-full pl-8" required />
                  <FaEnvelope className="absolute left-2 top-1/2 -translate-y-1/2 text-[#d6c3a1]" />
                </div>
              </div>
              <div>
                <label htmlFor="altura" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Altura</label>
                <input id="altura" name="altura" value={form.altura} onChange={handleChange} className="input w-full" />
              </div>
              <div>
                <label htmlFor="peso" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Peso</label>
                <input id="peso" name="peso" value={form.peso} onChange={handleChange} className="input w-full" />
              </div>
              <div>
                <label htmlFor="imc" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">IMC</label>
                <input id="imc" name="imc" value={form.imc} onChange={handleChange} className="input w-full" />
              </div>
            </div>
          </div>

          {/* Endereço e Contato */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="cep" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">CEP</label>
              <div className="relative">
                <input id="cep" name="cep" value={form.cep} onChange={handleChange} className="input w-full pl-8" />
                <FaMapMarkerAlt className="absolute left-2 top-1/2 -translate-y-1/2 text-[#d6c3a1]" />
              </div>
            </div>
            <div>
              <label htmlFor="endereco" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Endereço</label>
              <input id="endereco" name="endereco" value={form.endereco} onChange={handleChange} className="input w-full" />
            </div>
            <div>
              <label htmlFor="numero" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Número</label>
              <input id="numero" name="numero" value={form.numero} onChange={handleChange} className="input w-full" />
            </div>
            <div>
              <label htmlFor="complemento" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Compl.</label>
              <input id="complemento" name="complemento" value={form.complemento} onChange={handleChange} className="input w-full" />
            </div>
            <div>
              <label htmlFor="bairro" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Bairro</label>
              <input id="bairro" name="bairro" value={form.bairro} onChange={handleChange} className="input w-full" />
            </div>
            <div>
              <label htmlFor="cidade" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Cidade</label>
              <input id="cidade" name="cidade" value={form.cidade} onChange={handleChange} className="input w-full" />
            </div>
            <div>
              <label htmlFor="estado" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Estado</label>
              <input id="estado" name="estado" value={form.estado} onChange={handleChange} className="input w-full" />
            </div>
            <div>
              <label htmlFor="pais" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">País</label>
              <input id="pais" name="pais" value={form.pais} onChange={handleChange} className="input w-full" />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="observacoes" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Observações</label>
              <textarea id="observacoes" name="observacoes" value={form.observacoes} onChange={handleChange} className="input w-full min-h-[40px]" />
            </div>
          </div>

          {/* Convênios, agendamentos, parentes - layout base */}
          <div className="bg-[#22382f] border border-[#d6c3a1]/30 rounded-lg p-4 mt-4">
            <h3 className="text-lg font-bold text-[#d6c3a1] mb-2">Convênios do Paciente</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2">
              <input className="input" placeholder="Convênio" />
              <input className="input" placeholder="Plano" />
              <input className="input" placeholder="Matrícula / Carteirinha" />
              <input className="input" placeholder="Token Carteirinha" />
              <input className="input" placeholder="Validade" type="date" />
            </div>
            {/* ...mais linhas de convênios, botão de adicionar, etc... */}
          </div>

          <div className="bg-[#22382f] border border-[#d6c3a1]/30 rounded-lg p-4 mt-4">
            <h3 className="text-lg font-bold text-[#d6c3a1] mb-2">Programação de Agendamentos</h3>
            <div className="text-[#d6c3a1] text-sm">Clique no "+" para adicionar.</div>
            {/* Tabela de agendamentos futura */}
          </div>

          <div className="bg-[#22382f] border border-[#d6c3a1]/30 rounded-lg p-4 mt-4">
            <h3 className="text-lg font-bold text-[#d6c3a1] mb-2">Pessoas Relacionadas e Parentes</h3>
            <div className="text-[#d6c3a1] text-sm">Clique no "+" para adicionar.</div>
            {/* Tabela de parentes futura */}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition">Cancelar</button>
            <button type="submit" className="bg-[#d6c3a1] text-[#22382f] px-4 py-2 rounded-lg font-semibold hover:bg-[#fffbe6] transition">Salvar</button>
          </div>
        </form>
        <style jsx>{`
          .input,
          .input[type='date'],
          .input[type='email'],
          .input[type='text'],
          select.input, textarea.input {
            background-color: #f5ecd7;
            color: #22382f;
            border: 1px solid #d6c3a1;
            border-radius: 0.5rem;
            padding: 0.5rem 0.75rem;
            transition: border 0.2s, box-shadow 0.2s;
          }
          .input:focus {
            border-color: #d6c3a1;
            outline: none;
            box-shadow: 0 0 0 2px #d6c3a122;
          }
        `}</style>
      </div>
    </div>
  );
} 