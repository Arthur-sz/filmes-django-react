# CineBox — Catálogo de Filmes com React e Django

Aplicação web para cadastrar, buscar, ordenar e excluir filmes de uma coleção pessoal. O projeto usa React no frontend e uma API REST em Django no backend.

## Estrutura do projeto

```text
filmes-django-react/
├── backend/   # API Django REST Framework
└── frontend/  # Interface React criada com Vite
```

## 1. Como rodar o backend

```bash
cd backend
python -m venv venv

# Windows (PowerShell)
venv\Scripts\Activate.ps1

# Linux/macOS
source venv/bin/activate

pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver
```

O servidor sobe em `http://127.0.0.1:8000/`.

## 2. Como rodar o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Abra `http://localhost:5173/`. Durante o desenvolvimento, o Vite encaminha as chamadas de `/api` para o Django em `http://127.0.0.1:8000`.

## Funcionalidades do frontend

- listagem dos filmes usando `fetch`, `useEffect` e `map`;
- cadastro com validação e atualização imediata do estado React;
- exclusão com modal de confirmação;
- pesquisa por título usando o filtro da API;
- ordenação por título ou ano;
- totalizadores de cadastrados, assistidos e pendentes;
- estados de carregamento, erro e coleção vazia;
- layout responsivo para computador, tablet e celular.

## Componentes React

O `App` coordena a aplicação e os componentes em `frontend/src/components` cuidam de responsabilidades separadas: cabeçalho, destaque, pesquisa, lista, card, formulário, confirmação e avisos.

## Endpoints da API

### `GET /api/filmes/`
Retorna a lista de todos os filmes cadastrados.

**Resposta (exemplo):**
```json
[
  {"id": 1, "titulo": "Matrix", "genero": "Ficção", "ano": 1999, "assistido": true}
]
```

### `GET /api/filmes/?nome=matrix`
Filtra filmes cujo título contenha o texto informado (não diferencia maiúsculas/minúsculas).

### `POST /api/filmes/`
Cria um novo filme. Envie um JSON no corpo da requisição:

```json
{"titulo": "Matrix", "genero": "Ficção", "ano": 1999, "assistido": true}
```

- Todos os campos são obrigatórios.
- Resposta de sucesso: `201 Created`, retornando o objeto criado (já com `id`).
- Resposta de erro: `400 Bad Request`, com os detalhes de validação.

### `DELETE /api/filmes/<id>/`
Remove o filme com o `id` informado na URL.

- Resposta de sucesso: `204 No Content`.
- Resposta se o `id` não existir: `404 Not Found`.

## Campos do model `Filme`

| Campo    | Tipo         | Observações                  |
|----------|--------------|-------------------------------|
| id       | inteiro      | gerado automaticamente        |
| titulo   | texto        | até 200 caracteres            |
| genero   | texto        | até 100 caracteres            |
| ano      | inteiro      |                                |
| assistido| booleano     | padrão: `false`                |

## CORS e configuração da API

A origem `http://localhost:5173` (padrão do Vite) está liberada para consumir esta API em desenvolvimento.

Para apontar o frontend para outro servidor, copie `frontend/.env.example` para `frontend/.env` e informe `VITE_API_URL`.
