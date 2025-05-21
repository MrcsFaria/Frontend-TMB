# Projeto Frontend - Sistema de Pedidos React + Vite + TypeScript + TailwindCSS
## Descrição
Este projeto é um sistema frontend para gerenciamento de pedidos, desenvolvido em React com Vite, usando TypeScript e estilização via TailwindCSS.

## A aplicação permite:

Listar pedidos obtidos via API REST (GET /api/orders)

Filtrar pedidos por cliente, produto, status e data de criação

Visualizar detalhes de um pedido

Editar pedidos existentes (PUT /api/orders/:id)

Excluir pedidos (DELETE /api/orders/:id)

Criar novos pedidos (POST /api/orders)

A interface é responsiva, com modais para edição e confirmação de exclusão. O status dos pedidos é destacado com cores (pendente, concluído, etc).

## Tecnologias Utilizadas
React (v18+) com TypeScript

Vite (ferramenta de build rápida para React)

TailwindCSS para estilização utilitária

Fetch API para comunicação com backend REST (rodando localmente na porta 5024)

## Pré-requisitos
Node.js (recomendo v16+)

NPM ou Yarn

Backend da API rodando localmente em http://localhost:5024 com endpoints REST /api/orders

## Como rodar localmente
Clone o repositório:
```bash
git clone https://github.com/MrcsFaria/Frontend-TMB
cd Frontend-TMB
```

Instale as dependências:
```bash
npm install
# ou
yarn
```
Configure o backend para rodar localmente na porta 5024, certificando-se de que os endpoints REST para pedidos estejam funcionando:

GET /api/orders → lista pedidos

POST /api/orders → cria pedido

PUT /api/orders/:id → atualiza pedido

DELETE /api/orders/:id → exclui pedido

Inicie o projeto frontend:

```bash
npm run dev
# ou
yarn dev
```
Abra seu navegador e acesse:

```bash
http://localhost:5173
```


## Funcionalidades detalhadas
Listagem e filtros
Ao carregar, busca todos os pedidos da API.

Permite filtrar cliente, produto, status e data via filtros passados como props.

Mostra pedidos em uma tabela com colunas: ID, Cliente, Produto, Valor, Status, Data Criação e Ações.

## Ações nos pedidos
Ver detalhes: abre modal somente leitura com os dados do pedido.

Editar: abre modal editável para alterar campos (cliente, produto, valor, status). Atualiza via API.

Excluir: abre modal de confirmação. Se confirmado, exclui via API e remove da lista.

## Criação de pedidos
Formulário com campos: cliente, produto, valor, status (default 'Pendente').

Envia via POST para API.

Após sucesso, limpa formulário e recarrega a página.

## Observações
A aplicação depende de backend REST rodando em localhost:5024. Garanta que essa API esteja funcional.

Data exibida no formato brasileiro (pt-BR).

A aplicação usa modais com backdrop blur para UX moderna.

Status visualizado com cores para facilitar leitura rápida.


## Personalização
Ajuste as URLs da API caso o backend rode em outro host ou porta.

Adapte os campos do pedido conforme a estrutura real da API.

Pode expandir os filtros para um componente dedicado.
