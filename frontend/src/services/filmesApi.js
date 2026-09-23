const API_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

async function lerResposta(response) {
  if (response.ok) {
    return response.status === 204 ? null : response.json()
  }

  let detalhe = null

  try {
    detalhe = await response.json()
  } catch {
    // Algumas respostas de erro podem não trazer JSON.
  }

  const mensagem =
    detalhe?.detail ||
    Object.values(detalhe || {}).flat().join(' ') ||
    'Não foi possível concluir a operação.'

  throw new Error(mensagem)
}

export async function buscarFilmes(nome = '', signal) {
  const parametros = new URLSearchParams()

  if (nome.trim()) {
    parametros.set('nome', nome.trim())
  }

  const query = parametros.toString()
  const response = await fetch(`${API_URL}/filmes/${query ? `?${query}` : ''}`, { signal })
  return lerResposta(response)
}

export async function cadastrarFilme(filme) {
  const response = await fetch(`${API_URL}/filmes/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filme),
  })

  return lerResposta(response)
}

export async function excluirFilme(id) {
  const response = await fetch(`${API_URL}/filmes/${id}/`, { method: 'DELETE' })
  return lerResposta(response)
}
