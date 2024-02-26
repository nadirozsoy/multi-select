import { IMultiSelectAction, IMultiSelectState } from '@/types'

const INITIAL_STATE = {
  selectedItems: [],
  formItems: [],
  isOpen: false,
  searchTerm: '',
  handleToggleSelect: () => {},
  handleRemoveSelectItem: () => {},
  handleToggleSelectDropdown: () => {},
  handleSetIsOpen: () => {},
  handleOpenDropdown: () => {},
  handleSetSearchTerm: () => {}
}

const multiSelectReducer = (state: IMultiSelectState, action: IMultiSelectAction): IMultiSelectState => {
  switch (action.type) {
    case 'TOGGLE': {
      const { idField, nameField } = action.payload
      const isSelected = state.selectedItems.some(item => item.idField === idField)

      return {
        ...state,
        selectedItems: isSelected
          ? state.selectedItems.filter(item => item.idField !== idField)
          : [...state.selectedItems, { idField, nameField }],
        formItems: isSelected ? state.formItems.filter(formId => formId !== idField) : [...state.formItems, idField]
      }
    }
    case 'REMOVE':
      return {
        ...state,
        selectedItems: state.selectedItems.filter(item => item.idField !== action.payload),
        formItems: state.formItems.filter(formId => formId !== action.payload)
      }
    case 'TOGGLE_DROPDOWN':
      return {
        ...state,
        isOpen: !state.isOpen
      }

    case 'SET_IS_OPEN':
      return {
        ...state,
        isOpen: action.payload
      }
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload
      }
    default:
      throw new Error(`Unhandled action type: ${(action as { type: string }).type}`)
  }
}

export { multiSelectReducer, INITIAL_STATE }
