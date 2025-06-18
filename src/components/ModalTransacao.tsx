import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalTransacaoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transacao: any) => void;
}

export default function ModalTransacao({ isOpen, onClose, onSave }: ModalTransacaoProps) {
  const [formData, setFormData] = useState({
    tipo: 'receita',
    data: new Date().toISOString().split('T')[0],
    descricao: '',
    valor: '',
    status: 'Pendente',
    categoria: '',
    formaPagamento: 'Dinheiro'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      valor: parseFloat(formData.valor),
      id: Date.now() // Mock ID
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="rounded-xl shadow-lg w-full max-w-2xl overflow-hidden border" style={{ background: 'var(--cor-background)', borderColor: 'var(--cor-login-borda)' }}>
        {/* Cabeçalho */}
        <div className="flex justify-between items-center px-6 py-4" style={{ background: 'var(--cor-background)' }}>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--cor-login-borda)' }}>Nova Transação</h2>
          <button onClick={onClose} className="hover:opacity-80 transition" style={{ color: 'var(--cor-login-borda)' }}>
            <FaTimes size={20} />
          </button>
        </div>
        {/* Corpo do Modal */}
        <form onSubmit={handleSubmit} className="p-6" style={{ background: 'var(--cor-background)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipo de Transação */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--cor-login-borda)' }}>
                Tipo de Transação *
              </label>
              <select
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                className="w-full px-4 py-2 rounded-lg focus:outline-none"
                style={{ 
                  background: 'var(--cor-card-fundo)',
                  color: 'var(--cor-card-texto)',
                  border: 'none'
                }}
              >
                <option value="receita">Receita</option>
                <option value="despesa">Despesa</option>
              </select>
            </div>
            {/* Valor */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--cor-login-borda)' }}>
                Valor *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                className="w-full px-4 py-2 rounded-lg focus:outline-none"
                style={{ 
                  background: 'var(--cor-card-fundo)',
                  color: 'var(--cor-card-texto)',
                  border: 'none'
                }}
                placeholder="0,00"
                required
              />
            </div>
            {/* Data */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--cor-login-borda)' }}>
                Data *
              </label>
              <input
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                className="w-full px-4 py-2 rounded-lg focus:outline-none"
                style={{ 
                  background: 'var(--cor-card-fundo)',
                  color: 'var(--cor-card-texto)',
                  border: 'none'
                }}
                required
              />
            </div>
            {/* Status */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--cor-login-borda)' }}>
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 rounded-lg focus:outline-none"
                style={{ 
                  background: 'var(--cor-card-fundo)',
                  color: 'var(--cor-card-texto)',
                  border: 'none'
                }}
                required
              >
                <option value="Pendente">Pendente</option>
                <option value="Pago">Pago</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
            {/* Categoria */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--cor-login-borda)' }}>
                Categoria *
              </label>
              <select
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className="w-full px-4 py-2 rounded-lg focus:outline-none"
                style={{ 
                  background: 'var(--cor-card-fundo)',
                  color: 'var(--cor-card-texto)',
                  border: 'none'
                }}
                required
              >
                <option value="">Selecione uma categoria</option>
                <option value="consulta">Consulta</option>
                <option value="procedimento">Procedimento</option>
                <option value="produto">Produto</option>
                <option value="aluguel">Aluguel</option>
                <option value="salario">Salário</option>
                <option value="outros">Outros</option>
              </select>
            </div>
            {/* Forma de Pagamento */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--cor-login-borda)' }}>
                Forma de Pagamento *
              </label>
              <select
                value={formData.formaPagamento}
                onChange={(e) => setFormData({ ...formData, formaPagamento: e.target.value })}
                className="w-full px-4 py-2 rounded-lg focus:outline-none"
                style={{ 
                  background: 'var(--cor-card-fundo)',
                  color: 'var(--cor-card-texto)',
                  border: 'none'
                }}
                required
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
                <option value="Cartão de Débito">Cartão de Débito</option>
                <option value="PIX">PIX</option>
                <option value="Transferência">Transferência</option>
              </select>
            </div>
          </div>
          {/* Descrição */}
          <div className="mt-6">
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--cor-login-borda)' }}>
              Descrição
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="w-full px-4 py-2 rounded-lg focus:outline-none resize-none"
              style={{ 
                background: 'var(--cor-card-fundo)',
                color: 'var(--cor-card-texto)',
                border: 'none'
              }}
              rows={2}
              placeholder="Ex: Consulta - Maria Silva"
            />
          </div>
          {/* Botões */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg font-semibold transition"
              style={{ 
                background: '#E74C3C',
                color: '#fff'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg font-semibold transition"
              style={{ 
                background: 'var(--cor-login-borda)',
                color: 'var(--cor-card-texto)'
              }}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 