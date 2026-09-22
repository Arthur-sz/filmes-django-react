# API de Filmes — Backend (Django REST Framework)

API REST para gerenciar uma lista de filmes, desenvolvida em Django + Django REST Framework.

## Como rodar o projeto

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip3 install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver
```

O servidor sobe em `http://127.0.0.1:8000/`.

## Endpoints disponíveis

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

## Campos do Model `Filme`

| Campo    | Tipo         | Observações                  |
|----------|--------------|-------------------------------|
| id       | inteiro      | gerado automaticamente        |
| titulo   | texto        | até 200 caracteres            |
| genero   | texto        | até 100 caracteres            |
| ano      | inteiro      |                                |
| assistido| booleano     | padrão: `false`                |

## CORS

A origem `http://localhost:5173` (padrão do Vite) está liberada para consumir esta API em desenvolvimento.