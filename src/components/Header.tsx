import { useState, useEffect } from 'react';
import { FaUserCircle, FaSignOutAlt, FaBell } from 'react-icons/fa';

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [user, setUser] = useState<{ nome: string, email: string, cargo?: string } | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('usuarioLogado');
    if (userStr) setUser(JSON.parse(userStr));
  }, []);

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-[#22382f] flex items-center justify-end px-8 shadow z-20 border-b border-[#d6c3a1]/20">
      <div className="flex items-center gap-4">
        <button
          className="text-[#d6c3a1] hover:text-yellow-300 text-2xl focus:outline-none relative"
          onClick={() => setShowNotif(!showNotif)}
          title="Notificações"
        >
          <FaBell />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#22382f] animate-pulse" />
        </button>
        {/* Dropdown de notificações */}
        {showNotif && (
          <div className="absolute top-14 right-24 bg-[#1e332c] border border-[#d6c3a1]/30 rounded-lg shadow-lg p-4 min-w-[220px] z-50">
            <span className="text-[#d6c3a1] font-semibold block mb-2">Notificações</span>
            <ul className="text-[#d6c3a1]/80 text-sm space-y-1">
              <li>Bem-vindo ao sistema!</li>
              <li>Você tem 2 agendamentos hoje.</li>
              <li>Seu perfil está completo.</li>
            </ul>
          </div>
        )}
        <span className="text-[#d6c3a1] font-semibold text-base hidden sm:block">{user?.nome || ''}</span>
        <button
          className="text-[#d6c3a1] hover:text-white text-2xl focus:outline-none"
          onClick={() => setShowModal(true)}
          title="Perfil"
        >
          <FaUserCircle />
        </button>
        <button
          className="text-[#d6c3a1] hover:text-red-400 text-xl ml-2 focus:outline-none"
          title="Sair"
          onClick={() => {
            localStorage.removeItem('usuarioLogado');
            window.location.href = '/login';
          }}
        >
          <FaSignOutAlt />
        </button>
      </div>
      {/* Modal de perfil */}
      {showModal && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-[#1e332c] rounded-xl p-8 shadow-lg border border-[#d6c3a1]/30 min-w-[320px] relative">
            <button
              className="absolute top-2 right-2 text-[#d6c3a1] hover:text-white text-lg"
              onClick={() => setShowModal(false)}
              title="Fechar"
            >
              ×
            </button>
            <div className="flex flex-col items-center mb-4">
              <FaUserCircle className="text-5xl text-[#d6c3a1] mb-2" />
              <span className="text-lg font-bold text-[#d6c3a1]">{user.nome}</span>
              <span className="text-sm text-[#d6c3a1]/80">{user.email}</span>
              <span className="text-sm text-[#d6c3a1]/60 mt-1">{user.cargo || ''}</span>
            </div>
            <div className="flex flex-col gap-2">
              <button className="bg-[#d6c3a1] text-[#22382f] rounded-lg px-4 py-2 font-semibold hover:bg-[#fffbe6] transition">Editar Perfil</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 