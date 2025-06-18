# Frontend - ESTHETIC-PRO

Este é o frontend do sistema ESTHETIC-PRO, uma solução web para gestão de clínicas de estética, desenvolvido com Next.js, React, TypeScript e Tailwind CSS. O projeto prioriza padronização visual, responsividade, acessibilidade e facilidade de integração com diferentes backends.

## Requisitos

- Node.js 18+
- npm ou yarn

## Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. (Opcional) Configure variáveis de ambiente, se necessário:
   ```bash
   cp .env.example .env.local
   ```
   Edite o arquivo `.env.local` conforme sua necessidade.

## Desenvolvimento

Para rodar o projeto em modo de desenvolvimento:
```bash
npm run dev
```

## Build de Produção

Para gerar a build de produção:
```bash
npm run build
```

Para rodar em produção:
```bash
npm start
```

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes reutilizáveis (modais, sidebar, tabelas, etc.)
  ├── pages/          # Páginas principais dos módulos
  ├── hooks/          # Hooks personalizados
  ├── services/       # Serviços de API (mock ou real)
  ├── contexts/       # Contextos globais do React
  ├── styles/         # Estilos globais e variáveis CSS
  ├── utils/          # Funções utilitárias
  └── types/          # Definições de tipos e interfaces
```

## Funcionalidades Atuais

- Autenticação de usuários com seleção de unidade
- Dashboard com cards e gráficos
- Gestão de pacientes (CRUD, histórico, abas)
- Agendamento de consultas (calendário, filtro, integração com consultas)
- Consultas e prontuário (anamnese dinâmica, evolução, anexos)
- Gestão de estoque (produtos, movimentações, alertas)
- Módulo financeiro (transações, resumo, gráfico, tabela)
- Relatórios e exportação (em desenvolvimento)
- Padrão visual com Tailwind CSS e variáveis CSS centralizadas
- Mock de dados para testes e prototipação

## Tecnologias Utilizadas

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Icons
- React Hook Form
- Yup
- Axios

## Integração Backend

O frontend está preparado para integração com APIs RESTful, podendo consumir:
- Next.js API Routes (Node.js/TypeScript)
- Java Spring Boot

Atualmente, utiliza mocks para simulação de dados. A troca para API real é facilitada pela estrutura de serviços.

## Padrão Visual

- Paleta de cores: verde escuro, dourado, bege claro
- Layout responsivo e acessível
- Componentes padronizados (modais, tabelas, cards, etc.)
- Uso extensivo de variáveis CSS para cores e temas

## Contribuição

1. Crie uma branch a partir da `main`
2. Faça suas alterações
3. Abra um Pull Request

## Licença

Este projeto é privado e de uso exclusivo da equipe ESTHETIC-PRO. 