import { CheckIcon, TrashIcon } from './Icons.jsx'

const paletas = [
  ['#5b1d24', '#e35d46'],
  ['#123b46', '#2ba7a0'],
  ['#45316e', '#a569d4'],
  ['#70501c', '#e1a83a'],
  ['#183f32', '#4caf73'],
  ['#253f6a', '#6994df'],
]

function hashTitulo(titulo) {
  return [...titulo].reduce((total, letra) => total + letra.charCodeAt(0), 0)
}

export default function FilmeCard({ filme, aoExcluir }) {
  const [corUm, corDois] = paletas[hashTitulo(filme.titulo) % paletas.length]
  const iniciais = filme.titulo
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((palavra) => palavra[0])
    .join('')
    .toUpperCase()

  return (
    <article className="filme-card">
      <div className="filme-card__poster" style={{ '--poster-start': corUm, '--poster-end': corDois }}>
        <span className="filme-card__year">{filme.ano}</span>
        <div className="filme-card__reel" />
        <strong>{iniciais}</strong>
        <small>CINEBOX PRESENTS</small>
      </div>

      <div className="filme-card__body">
        <div>
          <span className="filme-card__genre">{filme.genero}</span>
          <h3 title={filme.titulo}>{filme.titulo}</h3>
        </div>

        <div className="filme-card__footer">
          <span className={`status ${filme.assistido ? 'status--watched' : 'status--pending'}`}>
            {filme.assistido && <CheckIcon />}
            {filme.assistido ? 'Assistido' : 'Quero assistir'}
          </span>
          <button className="icon-button" onClick={() => aoExcluir(filme)} aria-label={`Excluir ${filme.titulo}`}>
            <TrashIcon />
          </button>
        </div>
      </div>
    </article>
  )
}
