import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaBuilding } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [unidadeSelecionada, setUnidadeSelecionada] = useState('BARRA');
  const [erro, setErro] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulário enviado:', { email, password, unidadeSelecionada });
    setLoading(true);
    setErro('');

    try {
      localStorage.setItem('unidadeSelecionada', unidadeSelecionada);
      await signIn(email, password, unidadeSelecionada);
    } catch (error) {
      setErro('E-mail ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#142720] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1e332c] p-8 rounded-xl shadow-lg w-full max-w-md border border-[#d6c3a1]/20"
      >
        <div className="text-center mb-8">
          <img
            src="/img/logo_clinica.webp"
            alt="Logo"
            className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-[#d6c3a1]/40"
          />
          <h1 className="text-2xl font-bold text-[#d6c3a1]">Clínica Rainer Moreira</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#d6c3a1] mb-2">E-mail</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#22382f] text-white rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-[#d6c3a1]"
                placeholder="Seu e-mail"
                required
              />
              <FaUser className="absolute left-3 top-3 text-[#d6c3a1]" />
            </div>
          </div>

          <div>
            <label className="block text-[#d6c3a1] mb-2">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#22382f] text-white rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-[#d6c3a1]"
                placeholder="Sua senha"
                required
              />
              <FaLock className="absolute left-3 top-3 text-[#d6c3a1]" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#d6c3a1] hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[#d6c3a1] mb-2">Unidade</label>
            <div className="relative">
              <select
                value={unidadeSelecionada}
                onChange={(e) => setUnidadeSelecionada(e.target.value)}
                className="w-full bg-[#22382f] text-white rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-[#d6c3a1]"
              >
                <option value="BARRA">BARRA</option>
                <option value="TIJUCA">TIJUCA</option>
              </select>
              <FaBuilding className="absolute left-3 top-3 text-[#d6c3a1]" />
            </div>
          </div>

          {erro && (
            <div className="text-red-400 text-sm text-center">{erro}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d6c3a1] text-[#142720] rounded-lg px-4 py-2 font-semibold hover:bg-[#fffbe6] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" />
                Entrando...
              </span>
            ) : (
              'Entrar'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}