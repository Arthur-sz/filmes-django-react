import { FilmIcon, PlusIcon, SparkIcon } from './Icons.jsx'

export default function Hero({ total, assistidos, aoAbrirFormulario }) {
  const pendentes = total - assistidos

  return (
    <section className="hero" id="inicio">
      <div className="hero__content">
        <p className="eyebrow"><SparkIcon /> Seu cinema, do seu jeito</p>
        <h1>Filmes que marcam.<br /><em>Histórias que ficam.</em></h1>
        <p className="hero__description">
          Organize sua coleção, registre o que já assistiu e nunca mais esqueça aquele filme que queria ver.
        </p>
        <div className="hero__actions">
          <button className="button button--primary" onClick={aoAbrirFormulario}>
            <PlusIcon /> Adicionar meu primeiro filme
          </button>
          <a className="button button--ghost" href="#colecao">Ver coleção</a>
        </div>
        <dl className="hero__stats" aria-label="Resumo da coleção">
          <div><dt>{total}</dt><dd>na coleção</dd></div>
          <div><dt>{assistidos}</dt><dd>assistidos</dd></div>
          <div><dt>{pendentes}</dt><dd>para assistir</dd></div>
        </dl>
      </div>

      <div className="hero__visual" aria-hidden="true">
        <div className="hero__glow" />
        <div className="ticket ticket--back">
          <span>CINEBOX</span><FilmIcon /><small>SESSÃO 08</small>
        </div>
        <div className="poster">
          <div className="poster__top"><span>CINEBOX ORIGINAL</span><span>★★★★★</span></div>
          <div className="poster__moon" />
          <div className="poster__mountain poster__mountain--one" />
          <div className="poster__mountain poster__mountain--two" />
          <div className="poster__title"><small>UMA JORNADA PARA</small>ALÉM<br />DO TEMPO</div>
          <div className="poster__credits">UMA HISTÓRIA SOBRE ESCOLHAS · MEMÓRIAS · DESTINO</div>
        </div>
        <div className="ticket ticket--front">
          <span>ADMIT ONE</span><strong>08</strong><small>SALA 04</small>
        </div>
      </div>
    </section>
  )
}
