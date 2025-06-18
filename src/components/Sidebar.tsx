import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaUserPlus, FaUserFriends, FaBoxOpen, FaClipboardList, FaFileMedical, FaHome, FaChevronDown, FaChevronUp, FaUserMd, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';

const cadastros = [
  { href: '/cadastro/cadastro-usuario', label: 'Usuários', icon: <FaUserPlus /> },
  { href: '/cadastro/cadastro-paciente', label: 'Pacientes', icon: <FaUserFriends /> },
  { href: '/cadastro/cadastro-produto', label: 'Produtos', icon: <FaBoxOpen /> },
  { href: '/cadastro/cadastro-procedimento', label: 'Procedimentos', icon: <FaClipboardList /> },
  { href: '/cadastro/cadastro-receita', label: 'Modelos de Receita', icon: <FaFileMedical /> },
  { href: '/cadastro/cadastro-anamnese', label: 'Formulários de Anamnese', icon: <FaClipboardList /> },
];

const estoque = [
  { href: '/estoque', label: 'Estoque', icon: <FaBoxOpen /> },
];
export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [unidade, setUnidade] = useState('');
  useEffect(() => {
    setUnidade(localStorage.getItem('unidadeSelecionada') || '');
  }, []);
  return (
    <aside className="h-screen w-64 bg-[#1e332c] border-r border-[#d6c3a1]/20 flex flex-col py-6 px-4 fixed top-0 left-0 z-30 shadow-lg">
      <div className="flex flex-col items-center mb-8">
        <img src="/img/logo_clinica.webp" alt="Logo" className="w-14 h-14 rounded-full mb-2 border-2 border-[#d6c3a1]/40" />
        <span className="text-[#d6c3a1] font-bold text-lg text-center">Clínica Rainer Moreira</span>
        {unidade && (
          <span className="text-[#d6c3a1] font-semibold text-sm mt-1">Unidade: {unidade === 'BARRA' ? 'CLINICA RAINER MOREIRA BARRA' : 'CLINICA RAINER MOREIRA TIJUCA'}</span>
        )}
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" legacyBehavior>
              <a className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#d6c3a1] hover:bg-[#22382f] hover:text-white transition-colors font-medium">
                <span className="text-xl"><FaHome /></span>
                Dashboard
              </a>
            </Link>
          </li>
          <li>
            <Link href="/consultas" legacyBehavior>
              <a className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#d6c3a1] hover:bg-[#22382f] hover:text-white transition-colors font-medium">
                <span className="text-xl"><FaUserMd /></span>
                Consulta
              </a>
            </Link>
          </li>
          <li>
            <Link href="/estoque" legacyBehavior>
              <a className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#d6c3a1] hover:bg-[#22382f] hover:text-white transition-colors font-medium">
                <span className="text-xl"><FaBoxOpen /></span>
                Estoque
              </a>
            </Link>
          </li>
          <li>
            <Link href="/agendamentos" legacyBehavior>
              <a className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#d6c3a1] hover:bg-[#22382f] hover:text-white transition-colors font-medium">
                <span className="text-xl"><FaCalendarAlt /></span>
                Agendamentos
              </a>
            </Link>
          </li>
          <li>
            <Link href="/financeiro" legacyBehavior>
              <a className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#d6c3a1] hover:bg-[#22382f] hover:text-white transition-colors font-medium">
                <span className="text-xl"><FaMoneyBillWave /></span>
                Financeiro
              </a>
            </Link>
          </li>
          <li>
            <button
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#d6c3a1] hover:bg-[#22382f] hover:text-white transition-colors font-medium w-full focus:outline-none"
              onClick={() => setOpen(!open)}
            >
              <span className="text-xl"><FaChevronDown className={open ? 'rotate-180 transition-transform' : 'transition-transform'} /></span>
              Cadastros
            </button>
            {open && (
              <ul className="ml-6 mt-2 space-y-1">
                {cadastros.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} legacyBehavior>
                      <a className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#d6c3a1] hover:bg-[#22382f] hover:text-white transition-colors text-sm">
                        <span className="text-lg">{item.icon}</span>
                        {item.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
} 