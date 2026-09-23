import { useCallback, useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import SearchToolbar from './components/SearchToolbar.jsx'
import FilmeList from './components/FilmeList.jsx'
import FilmeForm from './components/FilmeForm.jsx'
import ConfirmModal from './components/ConfirmModal.jsx'
import Toast from './components/Toast.jsx'
import { LogoIcon } from './components/Icons.jsx'
import { useDebounce } from './hooks/useDebounce.js'
import { buscarFilmes, cadastrarFilme, excluirFilme } from './services/filmesApi.js'

export default function App() {
  const [filmes, setFilmes] = useState([])
  const [resumo, setResumo] = useState([])
  const [busca, setBusca] = useState('')
  const [ordem, setOrdem] = useState('recentes')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [formularioAberto, setFormularioAberto] = useState(false)
  const [salvando, setSalvando] = useState(false)
  const [filmeParaExcluir, setFilmeParaExcluir] = useState(null)
  const [excluindo, setExcluindo] = useState(false)
  const [toast, setToast] = useState({ mensagem: '', tipo: 'sucesso' })
  const buscaAtrasada = useDebounce(busca)

  const carregarFilmes = useCallback(async (nome = '', signal) => {
    setCarregando(true)
    setErro('')

    try {
      const dados = await buscarFilmes(nome, signal)
      setFilmes(dados)
      if (!nome.trim()) setResumo(dados)
    } catch (error) {
      if (error.name !== 'AbortError') {
        setErro('Confira se o servidor Django está ligado e tente novamente.')
      }
    } finally {
      if (!signal?.aborted) setCarregando(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    carregarFilmes(buscaAtrasada, controller.signal)
    return () => controller.abort()
  }, [buscaAtrasada, carregarFilmes])

  useEffect(() => {
    if (!toast.mensagem) return undefined
    const temporizador = setTimeout(() => setToast({ mensagem: '', tipo: 'sucesso' }), 3500)
    return () => clearTimeout(temporizador)
  }, [toast])

  const filmesOrdenados = useMemo(() => {
    return [...filmes].sort((a, b) => {
      if (ordem === 'titulo') return a.titulo.localeCompare(b.titulo, 'pt-BR')
      if (ordem === 'antigos') return a.ano - b.ano
      return b.ano - a.ano
    })
  }, [filmes, ordem])

  const totalAssistidos = resumo.filter((filme) => filme.assistido).length

  async function salvarFilme(novoFilme) {
    setSalvando(true)

    try {
      const filmeCriado = await cadastrarFilme(novoFilme)
      setFormularioAberto(false)
      setBusca('')
      setFilmes((atuais) => [...atuais, filmeCriado])
      setResumo((atuais) => [...atuais, filmeCriado])
      setToast({ mensagem: 'Filme adicionado à sua coleção!', tipo: 'sucesso' })
      return true
    } catch (error) {
      setToast({ mensagem: `Não foi possível cadastrar: ${error.message}`, tipo: 'erro' })
      return false
    } finally {
      setSalvando(false)
    }
  }

  async function confirmarExclusao() {
    setExcluindo(true)

    try {
      await excluirFilme(filmeParaExcluir.id)
      setFilmes((atuais) => atuais.filter((filme) => filme.id !== filmeParaExcluir.id))
      setResumo((atuais) => atuais.filter((filme) => filme.id !== filmeParaExcluir.id))
      setFilmeParaExcluir(null)
      setToast({ mensagem: 'Filme excluído da coleção.', tipo: 'sucesso' })
    } catch (error) {
      setToast({ mensagem: `Não foi possível excluir: ${error.message}`, tipo: 'erro' })
    } finally {
      setExcluindo(false)
    }
  }

  return (
    <>
      <Header aoAbrirFormulario={() => setFormularioAberto(true)} />
      <main>
        <Hero total={resumo.length} assistidos={totalAssistidos} aoAbrirFormulario={() => setFormularioAberto(true)} />

        <section className="collection" id="colecao">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Minha coleção</p>
              <h2>Todos os seus filmes</h2>
            </div>
            <p>Dos clássicos inesquecíveis às próximas descobertas.</p>
          </div>

          <SearchToolbar busca={busca} aoBuscar={setBusca} ordem={ordem} aoOrdenar={setOrdem} total={filmes.length} />
          <FilmeList
            filmes={filmesOrdenados}
            carregando={carregando}
            erro={erro}
            busca={busca}
            aoExcluir={setFilmeParaExcluir}
            aoTentarNovamente={() => carregarFilmes(buscaAtrasada)}
            aoAdicionar={() => setFormularioAberto(true)}
          />
        </section>

        <section className="about" id="sobre">
          <div className="about__icon"><LogoIcon /></div>
          <div><p className="eyebrow">Sobre o projeto</p><h2>Uma coleção feita por você.</h2></div>
          <p>O CineBox conecta um frontend React a uma API REST Django para tornar simples cadastrar, buscar, ordenar e excluir seus filmes.</p>
        </section>
      </main>

      <footer><span>© {new Date().getFullYear()} CineBox</span><span>Desenvolvido com React + Django REST</span></footer>

      <FilmeForm aberto={formularioAberto} salvando={salvando} aoFechar={() => setFormularioAberto(false)} aoSalvar={salvarFilme} />
      <ConfirmModal filme={filmeParaExcluir} excluindo={excluindo} aoCancelar={() => setFilmeParaExcluir(null)} aoConfirmar={confirmarExclusao} />
      <Toast {...toast} aoFechar={() => setToast({ mensagem: '', tipo: 'sucesso' })} />
    </>
  )
}
