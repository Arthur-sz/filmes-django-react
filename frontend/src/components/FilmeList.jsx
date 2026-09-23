import FilmeCard from './FilmeCard.jsx'
import { FilmIcon, SearchIcon } from './Icons.jsx'

export default function FilmeList({ filmes, carregando, erro, busca, aoExcluir, aoTentarNovamente, aoAdicionar }) {
  if (carregando) {
    return (
      <div className="state-message" role="status">
        <span className="loader" />
        <strong>Carregando sua coleção...</strong>
        <p>As luzes estão se apagando. A sessão já vai começar.</p>
      </div>
    )
  }

  if (erro) {
    return (
      <div className="state-message state-message--error" role="alert">
        <FilmIcon />
        <strong>Não conseguimos falar com a bilheteria.</strong>
        <p>{erro}</p>
        <button className="button button--light" onClick={aoTentarNovamente}>Tentar novamente</button>
      </div>
    )
  }

  if (!filmes.length) {
    return (
      <div className="state-message">
        {busca ? <SearchIcon /> : <FilmIcon />}
        <strong>{busca ? 'Nenhum filme encontrado.' : 'Nenhum item cadastrado.'}</strong>
        <p>{busca ? 'Tente pesquisar usando outro título.' : 'Sua coleção está vazia. Que tal adicionar o primeiro filme?'}</p>
        {!busca && <button className="button button--primary" onClick={aoAdicionar}>Adicionar filme</button>}
      </div>
    )
  }

  return (
    <div className="filme-grid">
      {filmes.map((filme) => <FilmeCard key={filme.id} filme={filme} aoExcluir={aoExcluir} />)}
    </div>
  )
}
