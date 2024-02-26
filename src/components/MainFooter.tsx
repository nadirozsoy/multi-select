import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className='m-4 rounded-lg bg-white shadow dark:bg-gray-800'>
      <div className='containerSmall flex items-center justify-between gap-8 p-4 max-sm:flex-col'>
        <div className='flex gap-2 text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          <span>© {new Date().getFullYear()}</span>
          <p>Nadir Özsoy . All Rights Reserved.</p>
        </div>
        <ul className='flex flex-wrap items-center gap-2 text-sm font-medium text-gray-500 sm:mt-0 dark:text-gray-400'>
          <li>
            <Link to='#' className='me-4 hover:underline md:me-6'>
              Home
            </Link>
          </li>
          <li>
            <Link to='https://github.com/nadirozsoy' className='me-4 hover:underline md:me-6'>
              My Github
            </Link>
          </li>
          <li>
            <Link to='https://www.linkedin.com/in/thisisnadirozsoy/' className='me-4 hover:underline md:me-6'>
              LinkedIn
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
