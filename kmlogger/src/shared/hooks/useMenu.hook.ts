import { useCallback, useState } from 'react'

export interface MenuAncora {
  id?: string | number
  seletor?: string
  element: Element
}

export function useMenu() {
  const [menuAncora, setarMenuAncora] = useState<MenuAncora | null>(null)

  const aoAbrirMenu = useCallback(
    (event: React.MouseEvent, id: string | number, seletor?: string) => {
      event.stopPropagation()
      const elementoAncora = seletor
        ? event.currentTarget?.closest(seletor)
        : event.currentTarget
      if (elementoAncora)
        setarMenuAncora({ id, seletor, element: elementoAncora })
    },
    []
  )

  const aoFecharMenu = useCallback(() => {
    setarMenuAncora(null)
  }, [])

  return {
    menuAncora,
    setarMenuAncora,
    aoAbrirMenu,
    aoFecharMenu,
  }
}
