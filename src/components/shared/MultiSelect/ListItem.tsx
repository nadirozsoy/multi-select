/* eslint-disable @typescript-eslint/no-explicit-any */

import { ICustomSelectItem } from '@/types'

export default function ListItem({
  item,
  handleToggleSelect,
  selectedItems,
  searchTerm
}: {
  item: any
  handleToggleSelect: any
  selectedItems: ICustomSelectItem[]
  searchTerm: string | null
}) {
  const name = item?.name ?? item?.title
  const lowerCaseName = name.toLowerCase()
  const lowerCaseSearchTerm = (searchTerm || '').toLowerCase()
  const startIndex = lowerCaseName.indexOf(lowerCaseSearchTerm)
  const endIndex = startIndex + lowerCaseSearchTerm.length

  const isSelected = selectedItems.some(selectedItem => selectedItem.idField === item?.id)

  return (
    <>
      <li
        key={item?.id}
        className={`flex h-fit cursor-pointer items-center gap-4 rounded-xl bg-primary/10 p-2 text-sm transition-all duration-150 hover:bg-primary/50 ${isSelected ? 'bg-primary/30' : 'text-black'}`}
        onClick={() => handleToggleSelect({ idField: item?.id, labelField: item?.name ?? item?.title })}
      >
        <input
          type='checkbox'
          id={item?.id}
          checked={isSelected}
          onChange={() => handleToggleSelect({ idField: item?.id, labelField: item?.name ?? item?.title })}
          onClick={e => e.stopPropagation()}
          className='cursor-pointer'
        />
        <div className='flex min-h-[6rem] cursor-pointer items-center gap-4'>
          {item?.image && <img src={item?.image} alt='' className='h-20 rounded-xl' />}
          <span className='flex flex-col gap-2'>
            <span className='font-medium text-slate-700'>
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
            {item?.episode && <span className='font-medium text-slate-700'>{item?.episode?.length} </span>}
          </span>
        </div>
      </li>
    </>
  )
}
