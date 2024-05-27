import { useReducer } from 'react'

type SearchTermAction = { type: 'SET'; payload: string }
type SearchTermState = {
  searchTerm: string
}

const initialState: SearchTermState = {
  searchTerm: ''
}

function searchTermReducer(state: SearchTermState, action: SearchTermAction): SearchTermState {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        searchTerm: action.payload
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function useSearchTerm() {
  const [{ searchTerm }, dispatch] = useReducer(searchTermReducer, initialState)

  const handleSearchTermChange = (value: string) => {
    dispatch({ type: 'SET', payload: value.trim() })
  }

  return { searchTerm, handleSearchTermChange }
}
