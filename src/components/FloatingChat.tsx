import { useState } from 'react';
import { FaHeadset, FaTimes, FaCircle } from 'react-icons/fa';

const usuariosOnline = [
  { nome: 'João da Silva', email: 'joao@clinica.com', online: true },
  { nome: 'Maria Souza', email: 'maria@clinica.com', online: true },
  { nome: 'Carlos Lima', email: 'carlos@clinica.com', online: false },
];

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [destino, setDestino] = useState<any>(null);
  const [mensagem, setMensagem] = useState('');
  const [historico, setHistorico] = useState<{ de: string; para: string; texto: string }[]>([]);

  function handleEnviar(e: React.FormEvent) {
    e.preventDefault();
    if (mensagem.trim() && destino) {
      setHistorico([...historico, { de: 'Você', para: destino.nome, texto: mensagem }]);
      setMensagem('');
    }
  }

  return (
    <>
      <button
        className="fixed bottom-8 right-8 z-40 bg-[#d6c3a1] text-[#22382f] rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-[#fffbe6] transition-all text-3xl border-4 border-[#22382f]/20"
        onClick={() => setOpen(true)}
        title="Chat interno"
      >
        <FaHeadset />
      </button>
      {open && (
        <div className="fixed bottom-28 right-8 z-50 bg-[#1e332c] border border-[#d6c3a1]/30 rounded-xl shadow-2xl w-96 max-w-[95vw] p-4 flex flex-col" style={{ minHeight: 420, height: 420 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#d6c3a1] font-bold">Chat Interno</span>
            <button className="text-[#d6c3a1] hover:text-white text-lg" onClick={() => setOpen(false)}><FaTimes /></button>
          </div>
          {/* Lista de usuários online */}
          <div className="mb-2">
            <span className="text-[#d6c3a1] text-sm font-semibold">Usuários online:</span>
            <ul className="flex flex-wrap gap-2 mt-1">
              {usuariosOnline.filter(u => u.online).map(u => (
                <li key={u.email}>
                  <button
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition ${destino?.email === u.email ? 'bg-[#d6c3a1] text-[#22382f]' : 'bg-[#22382f] text-[#d6c3a1] hover:bg-[#d6c3a1]/30'}`}
                    onClick={() => setDestino(u)}
                  >
                    <FaCircle className={u.online ? 'text-green-400' : 'text-gray-400'} />
                    {u.nome.split(' ')[0]}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Mensagens e campo só aparecem após selecionar usuário */}
          {destino ? (
            <>
              <div className="flex-1 overflow-y-auto bg-[#22382f] rounded p-2 mb-2 text-[#d6c3a1] text-sm" style={{ minHeight: 180, maxHeight: 220 }}>
                {historico.filter(h => h.para === destino.nome).length === 0 && (
                  <div className="text-[#d6c3a1]/60 italic">Nenhuma mensagem ainda.</div>
                )}
                {historico.filter(h => h.para === destino.nome).map((h, i) => (
                  <div key={i} className={h.de === 'Você' ? 'text-right' : ''}>
                    <span className="font-bold">{h.de}:</span> {h.texto}
                  </div>
                ))}
              </div>
              <form className="flex gap-2" onSubmit={handleEnviar}>
                <input
                  type="text"
                  placeholder={`Mensagem para ${destino.nome.split(' ')[0]}...`}
                  value={mensagem}
                  onChange={e => setMensagem(e.target.value)}
                  className="flex-1 rounded-lg px-3 py-2 bg-[#22382f] border border-[#d6c3a1]/30 text-[#f5f5f5] placeholder-[#d6c3a1] focus:ring-2 focus:ring-[#d6c3a1] focus:border-transparent"
                />
                <button type="submit" className="bg-[#d6c3a1] text-[#22382f] rounded-lg px-4 py-2 font-semibold hover:bg-[#fffbe6] transition">Enviar</button>
              </form>
            </>
          ) : (
            <div className="text-[#d6c3a1]/60 italic text-center py-6">Selecione um usuário online para iniciar uma conversa.</div>
          )}
        </div>
      )}
    </>
  );
} 