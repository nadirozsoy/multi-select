import { useReducer } from 'react'

type FocusAction = { type: 'FOCUS'; payload: boolean } | { type: 'BLUR'; payload: boolean }
type FocusState = {
  isFocused: boolean | null
}

const initialState: FocusState = {
  isFocused: null
}

function focusReducer(state: FocusState, action: FocusAction): FocusState {
  switch (action.type) {
    case 'FOCUS':
      return {
        ...state,
        isFocused: action.payload
      }
    case 'BLUR':
      return {
        ...state,
        isFocused: action.payload
      }
    default:
      throw new Error(`Unhandled action type: ${(action as { type: string }).type}`)
  }
}

export function useFocusManagement() {
  const [{ isFocused }, dispatch] = useReducer(focusReducer, initialState)

  const handleFocus = () => {
    dispatch({ type: 'FOCUS', payload: true })
  }

  const handleBlur = () => {
    dispatch({ type: 'BLUR', payload: false })
  }

  return { isFocused, handleFocus, handleBlur }
}
