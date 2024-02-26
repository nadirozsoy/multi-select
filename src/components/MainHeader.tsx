import { CopyCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function MainHeader() {
  return (
    <header>
      <nav className='border-gray-200 bg-white px-4 py-5 lg:px-6 dark:bg-gray-800'>
        <div className='containerSmall flex items-center justify-between max-sm:flex-col'>
          <div className='flex items-center gap-4'>
            <CopyCheck color='white' size={25} />
            <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>Multi Select</span>
          </div>

          <ul className='flex items-center gap-8 font-medium'>
            <li>
              <Link
                to='#'
                className='block rounded py-2 pl-3 pr-4 font-semibold text-white lg:bg-transparent lg:p-0 dark:text-white'
                aria-current='page'
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to='https://github.com/nadirozsoy'
                className='block rounded py-2 pl-3 pr-4 font-normal text-slate-300 lg:bg-transparent lg:p-0'
                target='_blank'
              >
                My Github
              </Link>
            </li>
            <li>
              <Link
                to='https://www.linkedin.com/in/thisisnadirozsoy/'
                className='block rounded py-2 pl-3 pr-4 font-normal text-slate-300 lg:bg-transparent lg:p-0'
                target='_blank'
              >
                LinkedIn
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
