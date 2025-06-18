import { useState } from 'react';
import InputMask from 'react-input-mask';

interface ModalUsuarioProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const funcoesIniciais = [
  'Administrador',
  'Profissional',
  'Recepção',
  'Financeiro',
  'Estagiário',
];

export default function ModalUsuario({ open, onClose, onSave }: ModalUsuarioProps) {
  const [aba, setAba] = useState<'dados' | 'endereco' | 'telefones' | 'funcoes'>('dados');
  const [form, setForm] = useState({
    nome: '', email: '', senha: '', confirmarSenha: '', tipo: '', cpf: '', rg: '', rgOrgao: '', rgExpedicao: '', nascimento: '', sexo: '', estadoCivil: '', pai: '', mae: '', nacionalidade: '', naturalidade: '', foto: '', status: 'ativo',
    endereco: '', numero: '', bairro: '', cidade: '', estado: '', cep: '', complemento: '',
    telefone1: '', telefone2: '', whatsapp: '',
    funcoes: [''], novaFuncao: '',
  });
  const [funcoes, setFuncoes] = useState(funcoesIniciais);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAddFuncao() {
    if (form.novaFuncao && !funcoes.includes(form.novaFuncao)) {
      setFuncoes([...funcoes, form.novaFuncao]);
      setForm({ ...form, novaFuncao: '' });
    }
  }

  function handleFuncoesChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setForm({ ...form, funcoes: Array.from(e.target.selectedOptions, option => option.value) });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.senha !== form.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    onSave(form);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-[#1e332c] rounded-xl shadow-2xl w-full max-w-3xl p-6 relative border border-[#d6c3a1]/30">
        <button className="absolute top-2 right-2 text-[#d6c3a1] hover:text-red-500 text-xl" onClick={onClose}>×</button>
        <h2 className="text-xl font-bold mb-4 text-[#d6c3a1]">Cadastro de Usuário</h2>
        <div className="flex gap-2 mb-4">
          <button onClick={() => setAba('dados')} className={`px-4 py-2 rounded-t-lg font-semibold ${aba === 'dados' ? 'bg-[#d6c3a1] text-[#22382f]' : 'bg-[#22382f] text-[#d6c3a1]'}`}>Dados Pessoais</button>
          <button onClick={() => setAba('endereco')} className={`px-4 py-2 rounded-t-lg font-semibold ${aba === 'endereco' ? 'bg-[#d6c3a1] text-[#22382f]' : 'bg-[#22382f] text-[#d6c3a1]'}`}>Endereço</button>
          <button onClick={() => setAba('telefones')} className={`px-4 py-2 rounded-t-lg font-semibold ${aba === 'telefones' ? 'bg-[#d6c3a1] text-[#22382f]' : 'bg-[#22382f] text-[#d6c3a1]'}`}>Telefones</button>
          <button onClick={() => setAba('funcoes')} className={`px-4 py-2 rounded-t-lg font-semibold ${aba === 'funcoes' ? 'bg-[#d6c3a1] text-[#22382f]' : 'bg-[#22382f] text-[#d6c3a1]'}`}>Funções</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {aba === 'dados' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Nome completo</label>
                <input id="nome" name="nome" value={form.nome} onChange={handleChange} className="input" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-[#d6c3a1]">E-mail</label>
                <input id="email" name="email" value={form.email} onChange={handleChange} type="email" className="input" required />
              </div>
              <div>
                <label htmlFor="senha" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Senha</label>
                <input id="senha" name="senha" value={form.senha} onChange={handleChange} type="password" className="input" required />
              </div>
              <div>
                <label htmlFor="confirmarSenha" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Confirmar senha</label>
                <input id="confirmarSenha" name="confirmarSenha" value={form.confirmarSenha} onChange={handleChange} type="password" className="input" required />
              </div>
              <div>
                <label htmlFor="cpf" className="block text-sm font-medium mb-1 text-[#d6c3a1]">CPF</label>
                <InputMask mask="999.999.999-99" value={form.cpf} onChange={handleChange} name="cpf" maskChar=" ">
                  {(inputProps: any) => <input id="cpf" {...inputProps} className="input" required />}
                </InputMask>
              </div>
              <div>
                <label htmlFor="rg" className="block text-sm font-medium mb-1 text-[#d6c3a1]">RG</label>
                <InputMask mask="99.999.999-9" value={form.rg} onChange={handleChange} name="rg" maskChar=" ">
                  {(inputProps: any) => <input id="rg" {...inputProps} className="input" />}
                </InputMask>
              </div>
              <div>
                <label htmlFor="rgOrgao" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Órgão Exp.</label>
                <input id="rgOrgao" name="rgOrgao" value={form.rgOrgao} onChange={handleChange} className="input" />
              </div>
              <div>
                <label htmlFor="rgExpedicao" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Data de expedição</label>
                <input id="rgExpedicao" name="rgExpedicao" value={form.rgExpedicao} onChange={handleChange} type="date" className="input" />
              </div>
              <div>
                <label htmlFor="nascimento" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Data de nascimento</label>
                <input id="nascimento" name="nascimento" value={form.nascimento} onChange={handleChange} type="date" className="input" required />
              </div>
              <div>
                <label htmlFor="sexo" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Sexo</label>
                <select id="sexo" name="sexo" value={form.sexo} onChange={handleChange} className="input" required>
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div>
                <label htmlFor="estadoCivil" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Estado Civil</label>
                <select id="estadoCivil" name="estadoCivil" value={form.estadoCivil} onChange={handleChange} className="input">
                  <option value="">Selecione</option>
                  <option value="solteiro">Solteiro(a)</option>
                  <option value="casado">Casado(a)</option>
                  <option value="divorciado">Divorciado(a)</option>
                  <option value="viuvo">Viúvo(a)</option>
                </select>
              </div>
              <div>
                <label htmlFor="pai" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Nome do pai</label>
                <input id="pai" name="pai" value={form.pai} onChange={handleChange} className="input" />
              </div>
              <div>
                <label htmlFor="mae" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Nome da mãe</label>
                <input id="mae" name="mae" value={form.mae} onChange={handleChange} className="input" />
              </div>
              <div>
                <label htmlFor="nacionalidade" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Nacionalidade</label>
                <input id="nacionalidade" name="nacionalidade" value={form.nacionalidade} onChange={handleChange} className="input" />
              </div>
              <div>
                <label htmlFor="naturalidade" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Naturalidade</label>
                <input id="naturalidade" name="naturalidade" value={form.naturalidade} onChange={handleChange} className="input" />
              </div>
              <div>
                <label htmlFor="foto" className="block text-sm font-medium mb-1 text-[#d6c3a1]">URL da foto</label>
                <input id="foto" name="foto" value={form.foto} onChange={handleChange} className="input" />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Status</label>
                <select id="status" name="status" value={form.status} onChange={handleChange} className="input">
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </div>
            </div>
          )}
          {aba === 'endereco' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="endereco" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Endereço</label>
                <input id="endereco" name="endereco" value={form.endereco} onChange={handleChange} className="input" required />
              </div>
              <div>
                <label htmlFor="numero" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Número</label>
                <input id="numero" name="numero" value={form.numero} onChange={handleChange} className="input" required />
              </div>
              <div>
                <label htmlFor="bairro" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Bairro</label>
                <input id="bairro" name="bairro" value={form.bairro} onChange={handleChange} className="input" required />
              </div>
              <div>
                <label htmlFor="cidade" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Cidade</label>
                <input id="cidade" name="cidade" value={form.cidade} onChange={handleChange} className="input" required />
              </div>
              <div>
                <label htmlFor="estado" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Estado</label>
                <input id="estado" name="estado" value={form.estado} onChange={handleChange} className="input" required />
              </div>
              <div>
                <label htmlFor="cep" className="block text-sm font-medium mb-1 text-[#d6c3a1]">CEP</label>
                <InputMask mask="99999-999" value={form.cep} onChange={handleChange} name="cep" maskChar=" ">
                  {(inputProps: any) => <input id="cep" {...inputProps} className="input" required />}
                </InputMask>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="complemento" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Complemento</label>
                <input id="complemento" name="complemento" value={form.complemento} onChange={handleChange} className="input" />
              </div>
            </div>
          )}
          {aba === 'telefones' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="telefone1" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Telefone principal</label>
                <InputMask mask="(99) 99999-9999" value={form.telefone1} onChange={handleChange} name="telefone1" maskChar=" ">
                  {(inputProps: any) => <input id="telefone1" {...inputProps} className="input w-full" required />}
                </InputMask>
              </div>
              <div>
                <label htmlFor="telefone2" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Telefone secundário</label>
                <InputMask mask="(99) 99999-9999" value={form.telefone2} onChange={handleChange} name="telefone2" maskChar=" ">
                  {(inputProps: any) => <input id="telefone2" {...inputProps} className="input w-full" />}
                </InputMask>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="whatsapp" className="block text-sm font-medium mb-1 text-[#d6c3a1]">WhatsApp</label>
                <InputMask mask="(99) 99999-9999" value={form.whatsapp} onChange={handleChange} name="whatsapp" maskChar=" ">
                  {(inputProps: any) => <input id="whatsapp" {...inputProps} className="input w-full" />}
                </InputMask>
              </div>
            </div>
          )}
          {aba === 'funcoes' && (
            <div className="space-y-4">
              <label className="text-[#d6c3a1] font-semibold">Funções do usuário</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.funcoes.filter(f => f).map((f) => (
                  <span key={f} className="bg-[#d6c3a1] text-[#22382f] px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {f}
                    <button type="button" className="ml-1 text-[#22382f] hover:text-red-600 font-bold" onClick={() => setForm({ ...form, funcoes: form.funcoes.filter(fn => fn !== f) })}>×</button>
                  </span>
                ))}
              </div>
              <label htmlFor="funcoes" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Selecione as funções</label>
              <select multiple id="funcoes" name="funcoes" value={form.funcoes} onChange={handleFuncoesChange} className="input h-24 bg-[#f5ecd7] text-[#22382f] border-[#d6c3a1]/30 focus:ring-2 focus:ring-[#d6c3a1] focus:border-[#d6c3a1] rounded-lg">
                {funcoes.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <div className="flex gap-2 items-center mt-2">
                <label htmlFor="novaFuncao" className="block text-sm font-medium mb-1 text-[#d6c3a1]">Nova função</label>
                <input id="novaFuncao" name="novaFuncao" value={form.novaFuncao} onChange={handleChange} className="input flex-1" />
                <button type="button" onClick={handleAddFuncao} className="bg-[#d6c3a1] text-[#22382f] px-4 py-2 rounded-lg font-semibold hover:bg-[#fffbe6] transition text-sm">Adicionar</button>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition">Cancelar</button>
            <button type="submit" className="bg-[#d6c3a1] text-[#22382f] px-4 py-2 rounded-lg font-semibold hover:bg-[#fffbe6] transition">Salvar</button>
          </div>
        </form>
        <style jsx>{`
          .input,
          .input[type='date'],
          .input[type='email'],
          .input[type='password'],
          .input[type='text'],
          select.input {
            background-color: #f5ecd7;
            color: #22382f;
            border: 1px solid #d6c3a155;
            border-radius: 0.5rem;
            padding: 0.5rem 0.75rem;
            transition: border 0.2s, box-shadow 0.2s;
          }
          .input::placeholder {
            color: #222;
            opacity: 1;
          }
          select.input {
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
          }
        `}</style>
      </div>
    </div>
  );
} 