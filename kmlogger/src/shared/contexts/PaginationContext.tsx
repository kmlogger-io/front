import { createContext, useContext, useReducer, type ReactNode } from 'react'

export interface PaginationState {
  pageIndex: number
  itemsPerPage: number
  totalItems: number
}

export type PaginationAction =
  | { type: 'setPageIndex'; pageIndex: number }
  | { type: 'setItemsPerPage'; itemsPerPage: number }
  | { type: 'setTotalItems'; totalItems: number }
  | { type: 'updatePagination'; pagination: Partial<PaginationState> }

export interface PaginationContextType {
  state: PaginationState
  dispatch: React.Dispatch<PaginationAction>
}

export const PaginationContext = createContext<PaginationContextType | undefined>(undefined)

// Reducer para gerenciar o estado da paginação
function paginationReducer(state: PaginationState, action: PaginationAction): PaginationState {
  switch (action.type) {
    case 'setPageIndex':
      return { ...state, pageIndex: action.pageIndex }
    case 'setItemsPerPage':
      return { ...state, itemsPerPage: action.itemsPerPage }
    case 'setTotalItems':
      return { ...state, totalItems: action.totalItems }
    case 'updatePagination':
      return { ...state, ...action.pagination }
    default:
      return state
  }
}

interface PaginationProviderProps {
  children: ReactNode
  initialState?: Partial<PaginationState>
}

// Estado inicial padrão
const defaultInitialState: PaginationState = {
  pageIndex: 0,
  itemsPerPage: 10,
  totalItems: 0,
}

export function PaginationProvider({ children, initialState }: PaginationProviderProps) {
  const [state, dispatch] = useReducer(
    paginationReducer,
    { ...defaultInitialState, ...initialState }
  )

  const value: PaginationContextType = {
    state,
    dispatch,
  }

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  )
}

// Hook para usar o contexto
export function usePaginationContext() {
  const context = useContext(PaginationContext)
  if (context === undefined) {
    throw new Error(
      'usePaginationContext must be used within a PaginationProvider'
    )
  }
  return context
}