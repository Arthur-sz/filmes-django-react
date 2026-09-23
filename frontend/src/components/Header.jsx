import { LogoIcon, PlusIcon } from './Icons.jsx'

export default function Header({ aoAbrirFormulario }) {
  return (
    <header className="header">
      <a className="brand" href="#inicio" aria-label="Ir para o início">
        <span className="brand__icon"><LogoIcon /></span>
        <span>Cine<span>Box</span></span>
      </a>

      <nav aria-label="Navegação principal">
        <a href="#colecao">Minha coleção</a>
        <a href="#sobre">Sobre</a>
      </nav>

      <button className="button button--primary header__button" onClick={aoAbrirFormulario}>
        <PlusIcon />
        Adicionar filme
      </button>
    </header>
  )
}
