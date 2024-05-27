/* eslint-disable @typescript-eslint/no-explicit-any */

export type IMultiSelectProps = {
  options?: any[]
  className?: string
  handleSearch: (value: string | null) => void
  children?: React.ReactNode
  isLoading: boolean
  isError: boolean
  error?: any
}

export type ICustomItem = {
  id: string
  name: string
}

export type ICustomSelectItem = {
  idField: string
  labelField: string
}

export type IMultiSelectState = {
  selectedItems: any[]
  formItems: string[]
  isOpen: boolean
  searchTerm: string | null
  handleToggleSelect: (item: any) => void
  handleRemoveSelectItem: (item: string, event?: React.MouseEvent<HTMLButtonElement>) => void
  handleToggleSelectDropdown: () => void
  handleSetIsOpen: (isOpen: boolean) => void
  handleOpenDropdown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleSetSearchTerm: (searchTerm: string | null) => void
}

export type IMultiSelectAction =
  | { type: 'TOGGLE'; payload: any; formPayload?: string[] }
  | { type: 'REMOVE'; payload: string; event?: React.MouseEvent<HTMLButtonElement> }
  | { type: 'TOGGLE_DROPDOWN' }
  | { type: 'SET_IS_OPEN'; payload: boolean }
  | { type: 'SET_SEARCH_TERM'; payload: string }
