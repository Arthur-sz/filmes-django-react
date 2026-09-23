import { CloseIcon, TrashIcon } from './Icons.jsx'

export default function ConfirmModal({ filme, excluindo, aoCancelar, aoConfirmar }) {
  if (!filme) return null

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && !excluindo && aoCancelar()}>
      <section className="modal confirm-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-title">
        <button className="modal__close" onClick={aoCancelar} disabled={excluindo} aria-label="Fechar confirmação"><CloseIcon /></button>
        <span className="confirm-modal__icon"><TrashIcon /></span>
        <h2 id="delete-title">Excluir filme?</h2>
        <p>Tem certeza que deseja excluir <strong>“{filme.titulo}”</strong> da sua coleção?</p>
        <small>Essa ação não poderá ser desfeita.</small>
        <div className="modal__actions">
          <button className="button button--light" onClick={aoCancelar} disabled={excluindo}>Cancelar</button>
          <button className="button button--danger" onClick={aoConfirmar} disabled={excluindo}>
            {excluindo ? <><span className="button-loader" /> Excluindo...</> : <><TrashIcon /> Excluir</>}
          </button>
        </div>
      </section>
    </div>
  )
}
