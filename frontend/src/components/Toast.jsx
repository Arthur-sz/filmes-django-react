import { CheckIcon, CloseIcon } from './Icons.jsx'

export default function Toast({ mensagem, tipo, aoFechar }) {
  if (!mensagem) return null

  return (
    <div className={`toast toast--${tipo}`} role="status">
      <span className="toast__icon"><CheckIcon /></span>
      <span>{mensagem}</span>
      <button onClick={aoFechar} aria-label="Fechar mensagem"><CloseIcon /></button>
    </div>
  )
}
