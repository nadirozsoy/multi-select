/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react'
import { ICustomSelectItem } from '@/types'

const ListItem = forwardRef(
  (
    {
      item,
      handleToggleSelect,
      selectedItems,
      searchTerm,
      isFocused
    }: {
      item: any
      handleToggleSelect: any
      selectedItems: ICustomSelectItem[]
      searchTerm: string | null
      isFocused: boolean
    },
    ref: React.Ref<HTMLLIElement>
  ) => {
    const name = item?.label
    const lowerCaseName = name.toLowerCase().trim()
    const lowerCaseSearchTerm = (searchTerm || '').toLowerCase().trim()
    const startIndex = lowerCaseName.indexOf(lowerCaseSearchTerm)
    const endIndex = startIndex + lowerCaseSearchTerm.length

    const isSelected = selectedItems.some(selectedItem => selectedItem.idField === item?.value)

    return (
      <li
        key={item?.value}
        ref={ref}
        className={`flex h-fit cursor-pointer items-center gap-4 rounded-xl border bg-primary/10 p-2 text-sm transition-all duration-150 hover:bg-primary/50 hover:text-white ${isSelected ? 'bg-primary/30' : 'text-black'} ${isFocused ? 'border-primary' : ''}`}
        onClick={() => handleToggleSelect({ idField: item?.value, labelField: item?.label })}
      >
        <input
          type='checkbox'
          id={item?.value}
          checked={isSelected}
          onChange={() => handleToggleSelect({ idField: item?.value, labelField: item?.label })}
          onClick={e => e.stopPropagation()}
          className='cursor-pointer'
        />
        <div className='flex min-h-[6rem] cursor-pointer items-center gap-4'>
          {item?.image && <img src={item?.image} alt='' className='h-20 rounded-xl' />}
          <span className='flex flex-col gap-2'>
            <span className='font-medium'>
              {startIndex !== -1 ? (
                <>
                  {name.substring(0, startIndex)}
                  <span className='font-bold'>{name.substring(startIndex, endIndex)}</span>
                  {name.substring(endIndex)}
                </>
              ) : (
                name
              )}
            </span>
            {item?.episode && <span className='font-medium'>{item?.episode?.length} </span>}
          </span>
        </div>
      </li>
    )
  }
)

export default ListItem
