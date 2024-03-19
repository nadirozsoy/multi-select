import MainFooter from '@/components/MainFooter'
import MainHeader from '@/components/MainHeader'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className='min-h-dvh bg-slate-200'>
      <MainHeader />
      <main className='min-h-[calc(100dvh-16rem)] max-sm:min-h-[calc(100dvh-24rem)]'>
        <Outlet />
      </main>
      <MainFooter />
    </div>
  )
}
