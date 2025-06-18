import { useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import PageLayout from '../components/layouts/PageLayout';
import Modal from '../components/ui/Modal';
import { Button } from '../components/ui';

export default function ExemploPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BaseLayout>
      <PageLayout
        title="Página de Exemplo"
        description="Esta é uma página de exemplo que demonstra o uso dos layouts padronizados"
        actions={
          <Button onClick={() => setIsModalOpen(true)}>
            Abrir Modal
          </Button>
        }
      >
        <div className="text-white">
          <p>Conteúdo da página aqui...</p>
        </div>
      </PageLayout>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Modal de Exemplo"
        size="md"
      >
        <div className="text-white">
          <p>Conteúdo do modal aqui...</p>
        </div>
      </Modal>
    </BaseLayout>
  );
} 