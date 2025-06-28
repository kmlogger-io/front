import { useCallback, useState } from 'react'

export interface MenuAnchor {
  id?: string | number
  selector?: string
  element: Element
}

export function useMenu() {
  const [menuAnchor, setMenuAnchor] = useState<MenuAnchor | null>(null)

  const openMenu = useCallback(
    (event: React.MouseEvent, id: string | number, selector?: string) => {
      event.stopPropagation()
      const anchorElement = selector
        ? event.currentTarget?.closest(selector)
        : event.currentTarget
      if (anchorElement)
        setMenuAnchor({ id, selector, element: anchorElement })
    },
    []
  )

  const closeMenu = useCallback(() => {
    setMenuAnchor(null)
  }, [])

  return {
    menuAnchor,
    setMenuAnchor,
    openMenu,
    closeMenu,
  }
}