/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown, Loader2 } from 'lucide-react'
import SelectItem from './SelectItem'
import ListItem from './ListItem'
import { IMultiSelectProps } from '@/types'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useReducer, useRef } from 'react'
import { useScrollTop } from '@/helpers/useScrollTop'
import { INITIAL_STATE, multiSelectReducer } from '@/reducers/multiSelectReducer'

export default function MultiSelect({
  options,
  className,
  handleSearch,
  children,
  isLoading,
  isError,
  error
}: IMultiSelectProps) {
  const [{ isOpen, selectedItems, searchTerm }, dispatch] = useReducer(multiSelectReducer, INITIAL_STATE)

  const multiSelectRef = useRef<HTMLDivElement | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const { handleScrollTop } = useScrollTop(scrollContainerRef)

  const handleToggleSelect = (item: Record<string, any>) => {
    const { idField, nameField } = item
    dispatch({ type: 'TOGGLE', payload: { idField, nameField } })
  }

  const handleRemoveSelectItem = (item: string, event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    dispatch({ type: 'REMOVE', payload: item })
  }

  const toggleDropdown = () => {
    dispatch({ type: 'TOGGLE_DROPDOWN' })
  }

  const handleSetIsOpen = (isOpen: boolean) => {
    dispatch({ type: 'SET_IS_OPEN', payload: isOpen })
  }

  const handleSetSearchTerm = (searchTerm: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: searchTerm })
  }

  function handleOpenDropdown(e: React.KeyboardEvent<HTMLInputElement>) {
    const isEscapeKey = e.key === 'Escape'
    const isEnterKey = e.key === 'Enter'

    if (isOpen && isEscapeKey) {
      handleSetIsOpen(false)
    } else if (!isOpen && isEnterKey) {
      handleSetIsOpen(true)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value
    handleScrollTop()
    handleSetSearchTerm(searchTerm)
    handleSearch(searchTerm)
    handleSetIsOpen(true)
  }

  useClickOutside(multiSelectRef, () => {
    handleSetIsOpen(false)
  })

  return (
    <div ref={multiSelectRef} className={`relative flex w-[35rem] ${className ?? ''}`}>
      <div className='w-full space-y-2'>
        <span>{selectedItems.length + ' item selected'}</span>
        <div
          className='flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl border border-primary bg-white p-2 text-sm shadow transition-colors duration-300 hover:bg-slate-100'
          onClick={toggleDropdown}
        >
          {selectedItems.length > 0 ? (
            <div className='flex w-[35rem] items-center gap-2 overflow-x-auto'>
              {selectedItems.map((item, index) => (
                <SelectItem key={item?.idField || index} item={item} handleRemoveSelectItem={handleRemoveSelectItem} />
              ))}
            </div>
          ) : (
            <div className='flex items-center justify-between'>
              <p className='flex items-center gap-2 whitespace-nowrap rounded-xl p-2 text-slate-900'>Select an item</p>
            </div>
          )}
          <div className='flex items-center gap-1'>
            <input
              type='text'
              placeholder='Search'
              className='w-[10rem] rounded-lg bg-slate-50 px-6 py-3 text-primary '
              onChange={handleInputChange}
              onKeyDown={handleOpenDropdown}
              onClick={e => {
                e.stopPropagation()
              }}
            />
            <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          ref={scrollContainerRef}
          className='absolute left-0 top-[105%] z-[99] grid h-[35rem] w-full gap-2 overflow-y-auto rounded-xl border border-primary bg-white p-2 shadow'
        >
          {options?.length === 0 && (
            <div className='flex items-center justify-center'>
              <p>No results found</p>
            </div>
          )}
          <div className='flex h-full flex-col'>
            {options?.map((page: any, i) => (
              <ul key={i} className='grid gap-4'>
                {page?.results?.map((item: any) => (
                  <ListItem
                    key={item?.id}
                    item={item}
                    handleToggleSelect={handleToggleSelect}
                    selectedItems={selectedItems}
                    searchTerm={searchTerm}
                  />
                ))}
              </ul>
            ))}
            {isLoading && <Loader2 className='animate-spin' />}
            {isError && <p className='mx-auto mt-auto text-red-500'>{error.error}</p>}
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
