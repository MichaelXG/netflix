# 🎬 Netflix Clone

Um projeto completo de clone da interface da Netflix, desenvolvido com **React**, **TailwindCSS**, **React Router** e consumo da **API do The Movie Database (TMDB)**.

---

## 🚀 Funcionalidades

- ✅ Autenticação por nome e avatar (localStorage)
- ✅ Exibição de filmes e séries populares
- ✅ Página de detalhes com trailer, elenco, sinopse e produção
- ✅ Navegação por gêneros
- ✅ Página "Minha Lista" com favoritos persistentes por usuário
- ✅ Menu de usuário com logout
- ✅ Tema escuro/claro (dark mode)
- ✅ Responsivo para mobile e desktop
- ✅ Scroll horizontal com carregamento automático (carrossel)
- ✅ Destaques com trailer (Billboard)
- ✅ Top 10 de filmes e séries por avaliação

---

## 🛠️ Tecnologias

- **React 18+**
- **React Router DOM**
- **TailwindCSS**
- **Axios**
- **TMDB API**
- **LocalStorage** (para persistência de usuário e favoritos)

---

## 🖼️ Layout

O layout é inspirado na experiência da interface da Netflix, incluindo:

- Navegação lateral responsiva
- Carrosséis horizontais para filmes/séries
- Destaques com trailer incorporado
- Avatares e perfil
- Menu dropdown ao clicar no avatar

---

## 📦 Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/netflix-clone.git
   cd netflix-clone

   ```

2. Instale as dependências:

npm install

3. Configure a variável de ambiente .env:

VITE_TMDB_API_KEY=<<SUA_CHAVE_DA_API_TMDB>>

4. Inicie o projeto:

npm run dev

## 🔐 Login Simples
    O login é simulado apenas com nome e avatar, armazenados no localStorage:

    Nome obrigatório

    Avatar opcional (URL de imagem)

    Após login, o usuário é redirecionado para a home

## 📂 Estrutura de Pastas

src/
    ├── api/ # Funções que acessam a API TMDB
    ├── components/ # Componentes reutilizáveis (MovieCard, Header, etc.)
    ├── hooks/ # Hooks customizados (useFavorites, etc.)
    ├── pages/ # Páginas principais
    ├── utils/ # Utilitários (favoritos, token, etc.)
    ├── AppWrapper.jsx # Componente principal com rotas

## 📸 Screenshots

- Inclua aqui imagens do app: Home, Detalhes, Login, Favoritos, etc.

## 📌 To-do (melhorias futuras)

- Filtro por país / idioma

- Comentários por usuário

- Integração com Firebase Auth

- Suporte a múltiplos perfis

## 🧑‍💻 Desenvolvido por Michael XG
