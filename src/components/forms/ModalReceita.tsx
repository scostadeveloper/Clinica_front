import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface ModalReceitaProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export default function ModalReceita({ open, onClose, onSave, initialData }: ModalReceitaProps) {
  const [form, setForm] = useState(initialData || {
    nome: '', descricao: '', conteudo: '', obs: ''
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleQuillChange(value: string) {
    setForm({ ...form, conteudo: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-y-auto">
      <div className="bg-[#1e332c] w-full max-w-4xl rounded-xl shadow-2xl p-6 relative border border-[#d6c3a1]/30 overflow-y-auto max-h-[95vh]">
        <button className="absolute top-2 right-2 text-[#d6c3a1] hover:text-red-500 text-xl" onClick={onClose}>×</button>
        <h2 className="text-2xl font-bold text-[#d6c3a1] mb-6">Cadastro de Receita</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nome" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Nome *</label>
              <input id="nome" name="nome" value={form.nome} onChange={handleChange} className="input w-full" required />
            </div>
            <div>
              <label htmlFor="descricao" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Descrição</label>
              <input id="descricao" name="descricao" value={form.descricao} onChange={handleChange} className="input w-full" />
            </div>
          </div>
          <div>
            <label htmlFor="conteudo" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Conteúdo da Receita *</label>
            <div className="bg-[#f5ecd7] rounded-lg border border-[#d6c3a1]" style={{ maxHeight: 350, overflowY: 'auto' }}>
              <ReactQuill
                value={form.conteudo}
                onChange={handleQuillChange}
                theme="snow"
                className="text-[#22382f]"
                style={{ minHeight: 260, maxHeight: 340, overflowY: 'auto' }}
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'align': [] }],
                    ['link'],
                    ['clean']
                  ]
                }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="obs" className="block text-xs font-semibold mb-1 text-[#d6c3a1]">Observações</label>
            <textarea id="obs" name="obs" value={form.obs} onChange={handleChange} className="input w-full min-h-[40px]" />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition">Cancelar</button>
            <button type="submit" className="bg-[#d6c3a1] text-[#22382f] px-4 py-2 rounded-lg font-semibold hover:bg-[#fffbe6] transition">Salvar</button>
          </div>
        </form>
        <style jsx>{`
          .input,
          .input[type='text'],
          textarea.input {
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