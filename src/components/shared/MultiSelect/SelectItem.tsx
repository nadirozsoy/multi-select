/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICustomSelectItem } from '@/types'
import { X } from 'lucide-react'

export default function SelectItem({
  item,
  handleRemoveSelectItem
}: {
  item: ICustomSelectItem
  handleRemoveSelectItem: any
}) {
  return (
    <>
      <span
        key={item?.idField}
        className='bg-tertiary flex items-center gap-2 whitespace-nowrap rounded-xl p-2 text-white'
      >
        {item?.labelField}
        <X
          size={20}
          className='hover cursor-pointer rounded-xl bg-primary/70 p-1 text-white transition-colors duration-300 hover:bg-primary'
          onClick={e => handleRemoveSelectItem(item?.idField, e)}
        />
      </span>
    </>
  )
}
