import { useReducer } from 'react'
import { useFocusManagement } from './useFocusManagement'

type DropdownAction =
  | { type: 'TOGGLE'; payload: boolean }
  | { type: 'OPEN'; payload: boolean }
  | { type: 'CLOSE'; payload: boolean }
type DropdownState = {
  isOpen: boolean
}

const initialState: DropdownState = {
  isOpen: false
}

function dropdownReducer(state: DropdownState, action: DropdownAction): DropdownState {
  switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        isOpen: action.payload
      }
    case 'OPEN':
      return {
        ...state,
        isOpen: action.payload
      }
    case 'CLOSE':
      return {
        ...state,
        isOpen: action.payload
      }
    default:
      throw new Error(`Unhandled action type: ${(action as { type: string }).type}`)
  }
}

export function useToggleDropdown() {
  const [{ isOpen }, dispatch] = useReducer(dropdownReducer, initialState)

  const toggleDropdown = () => {
    dispatch({ type: 'TOGGLE', payload: !isOpen })
  }

  const openDropdown = () => {
    dispatch({ type: 'OPEN', payload: true })
  }

  const closeDropdown = () => {
    dispatch({ type: 'CLOSE', payload: false })
  }

  return { isOpen, toggleDropdown, openDropdown, closeDropdown }
}
