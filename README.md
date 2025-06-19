# Esthetic Pro Frontend

Sistema de gestão para clínicas de estética. Interface web responsiva desenvolvida em Next.js.

## Setup

Instalar dependências:
```bash
npm install
```

Configurar ambiente:
```bash
cp .env.example .env.local
```

Rodar em desenvolvimento:
```bash
npm run dev
```

## Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion

## Configuração

O sistema conecta com a API backend na porta 3001. Edite o `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_ENABLE_LOGS=false
```

## Módulos

**Autenticação**
Login por email/senha com seleção de unidade (Barra ou Tijuca).

**Dashboard** 
Visão geral com métricas e acesso rápido aos módulos.

**Pacientes**
Cadastro, histórico médico, documentos e busca.

**Agendamentos**
Calendário com gestão de horários e confirmações.

**Consultas**
Prontuário eletrônico, anamnese e prescrições.

**Estoque**
Produtos, movimentações e alertas de estoque baixo.

**Financeiro**
Transações, relatórios e controle de pagamentos.

## Estrutura

```
src/
├── components/   # Componentes UI
├── contexts/     # Estados globais  
├── pages/        # Rotas Next.js
├── services/     # Chamadas API
├── styles/       # CSS global
├── types/        # Types TypeScript
└── utils/        # Helpers
```

## Design

Cores: verde escuro (#0d4f3c), dourado (#d4af37), bege claro (#f5f5dc)

Interface limpa com componentes padronizados e responsivos.

## Comandos

```bash
npm run dev      # Desenvolvimento
npm run build    # Build produção  
npm run start    # Servidor produção
npm run lint     # Linter
```

## Deploy

Build e start para produção. Configurar variáveis de ambiente conforme necessário.

## Desenvolvimento

Seguir estrutura de pastas existente. Usar TypeScript strict e componentes funcionais. 