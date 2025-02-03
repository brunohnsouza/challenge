# Gerenciamento de Tarefas (Front-end)

Este é o frontend de um sistema de **Gerenciamento de Tarefas**, desenvolvido em **React + Vite**, utilizando **shadcn/ui** para a interface e **Axios** para comunicação com a API.

[demo.webm](https://github.com/user-attachments/assets/bb742fc3-671e-4175-84da-343236832bc8)

## Índice

- [Ferramentas](#ferramentas)
- [Instalação](#instalação)
- [Funcionalidades](#funcionalidades)
- [Licença](#licença)

## Ferramentas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Axios](https://axios-http.com/)

## Instalação

Para rodar este projeto localmente, siga os passos abaixo:

### 1. Clone o repositório

Certifique-se de estar na branch correta (`minha-solucao`), pois é onde está a implementação da solução:

```
git clone -b minha-solucao https://github.com/brunohnsouza/challenge.git
cd challenge/frontend
```

### 2. Instale as dependências

```
npm install
```

### 3. Configure as variávies de ambiente

Crie um arquivo `.env` na raiz do diretório `frontend` e adicione a URL da API:

```
VITE_API_URL=http://localhost:3333
```

### 4. Execute o projeto

Inicie o servidor de desenvolvimento:

```
npm run dev
```

Acesse http://localhost:5173 para visualizar a aplicação.

## Funcionalidades

✅ Criar novas tarefas  
✅ Editar título e descrição de tarefas  
✅ Mover tarefas entre os estados: **Pendentes**, **Em andamento** e **Feito**  
✅ Excluir tarefas 

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
