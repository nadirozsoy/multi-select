/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useReducer, useRef, useEffect, useState } from 'react'
import { ChevronDown, Loader2 } from 'lucide-react'
import SelectItem from './SelectItem'
import ListItem from './ListItem'
import { IMultiSelectProps } from '@/types'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useScrollTop } from '@/helpers/useScrollTop'
import { INITIAL_STATE, multiSelectReducer } from '@/reducers/multiSelectReducer'
import { cn } from '@/lib/utils'

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

  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [isFocused, setIsFocused] = useState(false)

  const multiSelectRef = useRef<HTMLDivElement | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])

  const { handleScrollTop } = useScrollTop(scrollContainerRef)

  const handleToggleSelect = (item: Record<string, any>) => {
    const { idField, labelField } = item
    dispatch({ type: 'TOGGLE', payload: { idField, labelField } })
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
    setIsFocused(true)
  }

  const handleSetIsOpen = (isOpen: boolean) => {
    dispatch({ type: 'SET_IS_OPEN', payload: isOpen })
  }

  const handleSetSearchTerm = (searchTerm: string | null) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: String(searchTerm) })
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleOpenDropdown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isEscapeKey = e.key === 'Escape'
    const isEnterKey = e.key === 'Enter'

    if (isEnterKey && !isOpen && isFocused) {
      handleSetIsOpen(true)
    } else if (isEscapeKey) {
      handleSetIsOpen(false)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.trim()
    handleScrollTop()
    handleSetSearchTerm(searchTerm === '' ? null : searchTerm)
    handleSearch(searchTerm === '' ? null : searchTerm)
    handleSetIsOpen(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocusedIndex(prevIndex => (prevIndex + 1) % (options?.length ?? 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusedIndex(prevIndex => (prevIndex - 1 + (options?.length ?? 0)) % (options?.length ?? 0))
    } else if (e.key === 'Enter' && focusedIndex !== -1) {
      e.preventDefault()
      handleToggleSelect(
        options?.[focusedIndex]?.value
          ? { idField: options?.[focusedIndex].value, labelField: options?.[focusedIndex].label }
          : { idField: options?.[focusedIndex].label, labelField: options?.[focusedIndex].label }
      )
    } else if (e.key === 'Escape') {
      e.preventDefault()
      handleSetIsOpen(false)
    }
  }

  useEffect(() => {
    if (focusedIndex !== -1 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      itemRefs.current[focusedIndex]?.focus()
    }
  }, [focusedIndex])

  useClickOutside(multiSelectRef, () => {
    handleSetIsOpen(false)
    setIsFocused(false)
  })

  return (
    <div
      ref={multiSelectRef}
      className={`relative flex w-[35rem] ${className ?? ''}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className='w-full space-y-2'>
        <span className='text-zinc-900'>{selectedItems.length + ' item selected'}</span>
        <div
          className={cn(
            `flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl border border-transparent bg-white p-2 text-sm shadow transition-colors duration-300 hover:bg-primary/10`,
            isFocused ? 'border-primary shadow-primary' : ''
          )}
          onClick={toggleDropdown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleOpenDropdown}
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
              className='w-[10rem] rounded-lg bg-slate-50 px-6 py-3 text-primary'
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
          className='absolute left-0 top-[105%] z-[99] grid h-[35rem] w-full gap-2 overflow-y-auto rounded-xl border bg-white p-2 shadow'
        >
          {options?.length === 0 && (
            <div className='flex items-center justify-center'>
              <p>No results found</p>
            </div>
          )}
          <div className='flex h-full flex-col'>
            <ul className='grid gap-4'>
              {options?.map((item, index) => (
                <ListItem
                  key={`${item?.value}-${index}`}
                  item={item}
                  handleToggleSelect={handleToggleSelect}
                  selectedItems={selectedItems}
                  searchTerm={searchTerm}
                  ref={el => (itemRefs.current[index] = el)}
                  isFocused={index === focusedIndex}
                />
              ))}
            </ul>
            {isLoading && <Loader2 className='animate-spin' />}
            {isError && <p className='mx-auto mt-auto text-red-500'>{error.error}</p>}
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
