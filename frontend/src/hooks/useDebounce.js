import { useEffect, useState } from 'react'

export function useDebounce(valor, atraso = 350) {
  const [valorAtrasado, setValorAtrasado] = useState(valor)

  useEffect(() => {
    const temporizador = setTimeout(() => setValorAtrasado(valor), atraso)
    return () => clearTimeout(temporizador)
  }, [valor, atraso])

  return valorAtrasado
}
