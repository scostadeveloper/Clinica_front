import { useState } from 'react';

const CAMPOS = [
  { tipo: 'texto', label: 'Texto' },
  { tipo: 'memo', label: 'Memo' },
  { tipo: 'check', label: 'Check' },
  { tipo: 'radio', label: 'Radio' },
  { tipo: 'selecao', label: 'Seleção' },
  { tipo: 'data', label: 'Data' },
  { tipo: 'titulo', label: 'Título' },
  { tipo: 'imagem', label: 'Imagem' },
  { tipo: 'tabela', label: 'Tabela' },
  { tipo: 'grafico', label: 'Gráfico' },
  { tipo: 'barras', label: 'Barras' },
  { tipo: 'cid10', label: 'CID-10' },
  { tipo: 'espec', label: 'Espec.' },
];

export default function ModalAnamneseBuilder({ open, onClose, onSave }: any) {
  const [campos, setCampos] = useState<any[]>([]);
  const [nome, setNome] = useState('');

  function handleAddCampo(tipo: string) {
    if (['check', 'radio', 'selecao'].includes(tipo)) {
      setCampos([...campos, { tipo, label: CAMPOS.find(c => c.tipo === tipo)?.label || tipo, opcoes: [''] }]);
    } else if (tipo === 'tabela') {
      setCampos([...campos, { tipo, label: CAMPOS.find(c => c.tipo === tipo)?.label || tipo, colunas: ['Coluna 1'] }]);
    } else {
      setCampos([...campos, { tipo, label: CAMPOS.find(c => c.tipo === tipo)?.label || tipo }]);
    }
  }

  function handleRemoveCampo(idx: number) {
    setCampos(campos.filter((_, i) => i !== idx));
  }

  function handleSalvar() {
    onSave({ nome: nome || 'Novo Formulário', criadoEm: new Date().toISOString().slice(0, 10), campos: campos.length });
    onClose();
    setCampos([]);
    setNome('');
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-y-auto">
      <div className="bg-[#1e332c] w-full max-w-5xl rounded-xl shadow-2xl p-6 relative border border-[#d6c3a1]/30 flex gap-6 max-h-[95vh] overflow-y-auto">
        <button className="absolute top-2 right-2 text-[#d6c3a1] hover:text-red-500 text-xl" onClick={onClose}>×</button>
        {/* Sidebar de campos */}
        <div className="w-60 bg-[#f5ecd7] rounded-lg p-4 flex flex-col gap-2 border border-[#d6c3a1]/30 h-[70vh] overflow-y-auto">
          <div className="font-bold text-[#22382f] mb-2">+ ADICIONAR CAMPO</div>
          {CAMPOS.map(c => (
            <button key={c.tipo} className="bg-[#1cc0f1] text-white rounded-lg py-2 font-semibold hover:bg-[#0ea5e9] transition" onClick={() => handleAddCampo(c.tipo)}>{c.label}</button>
          ))}
        </div>
        {/* Área de montagem */}
        <div className="flex-1 bg-[#f5f5f5] rounded-lg p-6 border border-[#d6c3a1]/20 min-h-[400px] flex flex-col h-[70vh] overflow-y-auto">
          <input
            className="mb-4 px-4 py-2 rounded-lg border border-[#d6c3a1]/30 bg-[#f5ecd7] text-[#22382f] font-bold text-xl"
            placeholder="Nome do formulário"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <div className="flex-1 flex flex-col gap-3">
            {campos.length === 0 && <div className="text-[#bfa77a] text-center mt-10">Adicione campos ao formulário…</div>}
            {campos.map((c, i) => (
              <div key={i} className="flex flex-col gap-2 bg-white rounded-lg px-4 py-3 border border-[#d6c3a1]/20">
                <div className="flex items-center gap-4">
                  {/* Label editável */}
                  <input
                    className="font-semibold text-[#22382f] border-b border-[#d6c3a1]/30 bg-transparent outline-none w-40 mr-2"
                    value={c.label}
                    onChange={e => {
                      const novos = [...campos];
                      novos[i].label = e.target.value;
                      setCampos(novos);
                    }}
                  />
                  {/* Campo visual conforme tipo */}
                  {c.tipo === 'texto' && (
                    <input type="text" className="flex-1 px-3 py-2 rounded border border-[#d6c3a1]/30 bg-[#f5ecd7] text-[#22382f]" placeholder="Texto curto" disabled />
                  )}
                  {c.tipo === 'memo' && (
                    <textarea className="flex-1 px-3 py-2 rounded border border-[#d6c3a1]/30 bg-[#f5ecd7] text-[#22382f]" placeholder="Texto longo" disabled />
                  )}
                  {['check', 'radio', 'selecao'].includes(c.tipo) && (
                    <div className="flex-1 flex flex-col gap-2">
                      {c.opcoes && c.opcoes.map((op: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                          {c.tipo === 'check' && <input type="checkbox" disabled />}
                          {c.tipo === 'radio' && <input type="radio" disabled />}
                          {c.tipo === 'selecao' && <span className="text-[#bfa77a]">•</span>}
                          <input
                            className="border-b border-[#d6c3a1]/30 bg-transparent outline-none text-[#22382f] w-40"
                            value={op}
                            placeholder="Opção"
                            onChange={e => {
                              const novos = [...campos];
                              novos[i].opcoes[idx] = e.target.value;
                              setCampos(novos);
                            }}
                          />
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => {
                              const novos = [...campos];
                              novos[i].opcoes.splice(idx, 1);
                              setCampos(novos);
                            }}
                            disabled={c.opcoes.length === 1}
                            title="Remover opção"
                          >Remover</button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="text-xs text-[#1cc0f1] hover:underline self-start mt-1"
                        onClick={() => {
                          const novos = [...campos];
                          novos[i].opcoes.push('');
                          setCampos(novos);
                        }}
                      >+ Adicionar opção</button>
                    </div>
                  )}
                  {c.tipo === 'tabela' && (
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex gap-2 items-center mb-1">
                        {c.colunas && c.colunas.map((col: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-1">
                            <input
                              className="border-b border-[#d6c3a1]/30 bg-transparent outline-none text-[#22382f] w-28"
                              value={col}
                              placeholder={`Coluna ${idx + 1}`}
                              onChange={e => {
                                const novos = [...campos];
                                novos[i].colunas[idx] = e.target.value;
                                setCampos(novos);
                              }}
                            />
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => {
                                const novos = [...campos];
                                novos[i].colunas.splice(idx, 1);
                                setCampos(novos);
                              }}
                              disabled={c.colunas.length === 1}
                              title="Remover coluna"
                            >x</button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="text-xs text-[#1cc0f1] hover:underline ml-2"
                          onClick={() => {
                            const novos = [...campos];
                            novos[i].colunas.push('');
                            setCampos(novos);
                          }}
                        >+ Coluna</button>
                      </div>
                      <div className="flex gap-2 mt-2">
                        {c.colunas && c.colunas.map((col: string, idx: number) => (
                          <div key={idx} className="px-3 py-2 rounded border border-[#d6c3a1]/30 bg-[#f5ecd7] text-[#22382f] text-center w-28 font-semibold">
                            {col || `Coluna ${idx + 1}`}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {c.tipo === 'data' && (
                    <input type="date" className="px-3 py-2 rounded border border-[#d6c3a1]/30 bg-[#f5ecd7] text-[#22382f]" disabled />
                  )}
                  {c.tipo === 'titulo' && (
                    <span className="text-lg font-bold text-[#bfa77a]">Título</span>
                  )}
                  {c.tipo === 'imagem' && (
                    <span className="italic text-[#bfa77a]">[Imagem]</span>
                  )}
                  {c.tipo === 'tabela' && (
                    <span className="italic text-[#bfa77a]">[Tabela]</span>
                  )}
                  {c.tipo === 'grafico' && (
                    <span className="italic text-[#bfa77a]">[Gráfico]</span>
                  )}
                  {c.tipo === 'barras' && (
                    <span className="italic text-[#bfa77a]">[Barras]</span>
                  )}
                  {c.tipo === 'cid10' && (
                    <span className="italic text-[#bfa77a]">[CID-10]</span>
                  )}
                  {c.tipo === 'espec' && (
                    <span className="italic text-[#bfa77a]">[Espec.]</span>
                  )}
                  <button className="ml-auto text-red-500 hover:text-red-700" onClick={() => handleRemoveCampo(i)}>Remover</button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition">Cancelar</button>
            <button type="button" onClick={handleSalvar} className="bg-[#d6c3a1] text-[#22382f] px-4 py-2 rounded-lg font-semibold hover:bg-[#fffbe6] transition">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
} 