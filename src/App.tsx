import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from '@/components/shared/Loader'
import MainLayout from '@/_app/MainLayout'
import { Homepage, NotFound } from '@/_app/pages'

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <MainLayout />
              </Suspense>
            }
          >
            <Route index element={<Homepage />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
