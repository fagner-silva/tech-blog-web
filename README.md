# Tech Blog Web

Este é um blog técnico desenvolvido com React e Vite, permitindo a criação, edição e visualização de posts técnicos.

## 🌐 Links Importantes

- **Frontend**: [https://tech-blog-web-9pju.onrender.com/](https://tech-blog-web-9pju.onrender.com/)
- **API Docs (Swagger)**: [https://techblogapi-m8yz.onrender.com/api-docs/#/](https://techblogapi-m8yz.onrender.com/api-docs/#/)

## 👤 Credenciais de Teste

```
Email: professor@gmail.com
Senha: 123456
```

## 🚀 Tecnologias

- React 18
- Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- Context API para autenticação

## 📋 Pré-requisitos

- Node.js (versão 20 ou superior)
- npm (ou yarn)

## 🛠️ Instalação Local

1. Clone o repositório:
```bash
git clone https://github.com/fagner-silva/tech-blog-web.git
```

2. Entre no diretório:
```bash
cd tech-blog-web
```

3. Instale as dependências:
```bash
npm install
```

4. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

## 🏗️ Comandos Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a versão de produção
- `npm run preview` - Visualiza a versão de produção localmente

## 📁 Estrutura do Projeto

```
tech-blog-web/
├── public/
├── src/
│   ├── api/         # Configurações e chamadas de API
│   ├── auth/        # Contexto e componentes de autenticação
│   ├── components/  # Componentes reutilizáveis
│   ├── pages/       # Páginas da aplicação
│   └── App.tsx      # Componente principal
├── package.json
└── vite.config.js
```

## 🔒 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_API_URL=https://techblogapi-m8yz.onrender.com/api/
```

## 📱 Funcionalidades

- ✅ Autenticação de usuários
- ✅ Listagem de posts
- ✅ Criação de novos posts
- ✅ Edição de posts existentes
- ✅ Visualização detalhada de posts
- ✅ Interface responsiva


## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
