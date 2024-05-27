import MainFooter from '@/components/MainFooter'
import MainHeader from '@/components/MainHeader'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className='bg-primary-10 min-h-dvh'>
      <MainHeader />
      <main className='min-h-[calc(100dvh-16rem)] max-sm:min-h-[calc(100dvh-24rem)]'>
        <Outlet />
      </main>
      <MainFooter />
    </div>
  )
}
