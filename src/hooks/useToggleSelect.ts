import { useReducer } from 'react'

type ToggleSelectAction =
  | { type: 'TOGGLE'; payload: { idField: string; labelField: string } }
  | { type: 'REMOVE'; payload: string }

interface Item {
  idField: string
  labelField: string
}

interface ToggleSelectState {
  selectedItems: Item[]
  formItems: string[]
}

const initialState: ToggleSelectState = {
  selectedItems: [],
  formItems: []
}

function toggleSelectReducer(state: ToggleSelectState, action: ToggleSelectAction): ToggleSelectState {
  switch (action.type) {
    case 'TOGGLE': {
      const { idField, labelField } = action.payload
      const isSelected = state.selectedItems.some(item => item.idField === idField)

      return {
        ...state,
        selectedItems: isSelected
          ? state.selectedItems.filter(item => item.idField !== idField)
          : [...state.selectedItems, { idField, labelField }],
        formItems: isSelected ? state.formItems.filter(formId => formId !== idField) : [...state.formItems, idField]
      }
    }
    case 'REMOVE':
      return {
        ...state,
        selectedItems: state.selectedItems.filter(item => item.idField !== action.payload),
        formItems: state.formItems.filter(formId => formId !== action.payload)
      }
    default:
      throw new Error(`Unhandled action type: ${(action as { type: string }).type}`)
  }
}

export function useToggleSelect() {
  const [{ formItems, selectedItems }, dispatch] = useReducer(toggleSelectReducer, initialState)

  const handleToggleSelectFun = (idField: string, labelField: string) => {
    dispatch({ type: 'TOGGLE', payload: { idField, labelField } })
  }

  const handleRemoveSelectItemFun = (idField: string) => {
    dispatch({ type: 'REMOVE', payload: idField })
  }

  return {
    selectedItems,
    formItems,
    handleToggleSelectFun,
    handleRemoveSelectItemFun
  }
}
