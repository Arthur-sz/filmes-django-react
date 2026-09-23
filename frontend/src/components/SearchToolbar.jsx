import { SearchIcon } from './Icons.jsx'

export default function SearchToolbar({ busca, aoBuscar, ordem, aoOrdenar, total }) {
  return (
    <div className="toolbar">
      <label className="search">
        <span className="sr-only">Pesquisar por título</span>
        <SearchIcon />
        <input
          type="search"
          value={busca}
          onChange={(event) => aoBuscar(event.target.value)}
          placeholder="Pesquisar por título..."
        />
        {busca && <button type="button" onClick={() => aoBuscar('')} aria-label="Limpar pesquisa">×</button>}
      </label>

      <div className="toolbar__right">
        <span className="result-count">{total} {total === 1 ? 'filme' : 'filmes'}</span>
        <label className="select-field">
          <span>Ordenar por</span>
          <select value={ordem} onChange={(event) => aoOrdenar(event.target.value)}>
            <option value="recentes">Mais recentes</option>
            <option value="antigos">Mais antigos</option>
            <option value="titulo">Título (A–Z)</option>
          </select>
        </label>
      </div>
    </div>
  )
}
