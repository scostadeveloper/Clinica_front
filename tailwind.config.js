/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        sidebar: {
          fundo: '#1e332c',
          borda: '#d6c3a1',
          texto: '#d6c3a1',
          ativo: '#22382f',
          hover: '#fffbe6',
        },
        header: {
          fundo: '#22382f',
          texto: '#d6c3a1',
          badge: '#e53e3e',
        },
        botao: {
          principal: '#d6c3a1',
          texto: '#22382f',
          hover: '#fffbe6',
          grad1: '#d6c3a1',
          grad2: '#e7d6b0',
          grad3: '#bfa77a',
        },
        input: {
          fundo: '#f5ecd7',
          texto: '#22382f',
          borda: '#d6c3a1',
          placeholder: '#d6c3a1',
        },
        tabela: {
          cabecalho: '#22382f',
          cabecalhoTexto: '#d6c3a1',
          linha: '#1e332c',
          linhaTexto: '#f5f5f5',
          borda: '#d6c3a1',
          bordaSuave: '#d6c3a133',
        },
        card: {
          fundo: '#fff',
          fundoAlt: '#f5ecd7',
          texto: '#22382f',
        },
        modal: {
          fundo: '#1e332c',
          label: '#d6c3a1',
          input: '#f5ecd7',
          borda: '#d6c3a1',
        },
        erro: {
          padrao: '#e53e3e',
          alt: '#ff0000',
        },
        acao: {
          azul: '#1cc0f1',
          azulHover: '#0ea5e9',
          verde: '#6fcf97',
          verdeHover: '#34d399',
          vermelho: '#e53e3e',
        },
      },
    },
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
} 