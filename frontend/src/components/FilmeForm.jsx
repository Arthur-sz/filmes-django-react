import { useEffect, useState } from 'react'
import { CheckIcon, CloseIcon, FilmIcon } from './Icons.jsx'

const FORMULARIO_INICIAL = { titulo: '', genero: '', ano: '', assistido: false }

export default function FilmeForm({ aberto, salvando, aoFechar, aoSalvar }) {
  const [formulario, setFormulario] = useState(FORMULARIO_INICIAL)
  const [erros, setErros] = useState({})

  useEffect(() => {
    if (aberto) {
      setFormulario(FORMULARIO_INICIAL)
      setErros({})
    }
  }, [aberto])

  useEffect(() => {
    if (!aberto) return undefined

    const fecharComEsc = (event) => {
      if (event.key === 'Escape' && !salvando) aoFechar()
    }

    document.addEventListener('keydown', fecharComEsc)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', fecharComEsc)
      document.body.classList.remove('modal-open')
    }
  }, [aberto, salvando, aoFechar])

  if (!aberto) return null

  function alterarCampo(event) {
    const { name, value, type, checked } = event.target
    setFormulario((atual) => ({ ...atual, [name]: type === 'checkbox' ? checked : value }))
    setErros((atuais) => ({ ...atuais, [name]: '' }))
  }

  function validar() {
    const novosErros = {}
    const anoAtual = new Date().getFullYear() + 2

    if (!formulario.titulo.trim()) novosErros.titulo = 'Informe o título do filme.'
    if (!formulario.genero.trim()) novosErros.genero = 'Informe o gênero do filme.'
    if (!formulario.ano) novosErros.ano = 'Informe o ano de lançamento.'
    else if (Number(formulario.ano) < 1888 || Number(formulario.ano) > anoAtual) {
      novosErros.ano = `Use um ano entre 1888 e ${anoAtual}.`
    }

    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  async function enviar(event) {
    event.preventDefault()
    if (!validar()) return

    const salvou = await aoSalvar({
      ...formulario,
      titulo: formulario.titulo.trim(),
      genero: formulario.genero.trim(),
      ano: Number(formulario.ano),
    })

    if (salvou) setFormulario(FORMULARIO_INICIAL)
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && !salvando && aoFechar()}>
      <section className="modal filme-form" role="dialog" aria-modal="true" aria-labelledby="form-title">
        <button className="modal__close" onClick={aoFechar} disabled={salvando} aria-label="Fechar formulário"><CloseIcon /></button>
        <div className="modal__heading">
          <span className="modal__icon"><FilmIcon /></span>
          <div>
            <p className="eyebrow">Novo título</p>
            <h2 id="form-title">Adicionar à coleção</h2>
            <p>Preencha as informações do filme.</p>
          </div>
        </div>

        <form onSubmit={enviar} noValidate>
          <label className="field field--full">
            <span>Título do filme <b>*</b></span>
            <input autoFocus name="titulo" value={formulario.titulo} onChange={alterarCampo} placeholder="Ex.: Interestelar" aria-invalid={Boolean(erros.titulo)} />
            {erros.titulo && <small>{erros.titulo}</small>}
          </label>

          <div className="form-row">
            <label className="field">
              <span>Gênero <b>*</b></span>
              <input name="genero" value={formulario.genero} onChange={alterarCampo} placeholder="Ex.: Ficção científica" aria-invalid={Boolean(erros.genero)} />
              {erros.genero && <small>{erros.genero}</small>}
            </label>
            <label className="field">
              <span>Ano <b>*</b></span>
              <input name="ano" value={formulario.ano} onChange={alterarCampo} type="number" inputMode="numeric" placeholder="Ex.: 2014" aria-invalid={Boolean(erros.ano)} />
              {erros.ano && <small>{erros.ano}</small>}
            </label>
          </div>

          <label className="watch-toggle">
            <input name="assistido" type="checkbox" checked={formulario.assistido} onChange={alterarCampo} />
            <span className="watch-toggle__control"><CheckIcon /></span>
            <span><strong>Já assisti este filme</strong><small>Marque para registrar como assistido.</small></span>
          </label>

          <div className="modal__actions">
            <button type="button" className="button button--light" onClick={aoFechar} disabled={salvando}>Cancelar</button>
            <button type="submit" className="button button--primary" disabled={salvando}>
              {salvando ? <><span className="button-loader" /> Salvando...</> : 'Salvar filme'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
