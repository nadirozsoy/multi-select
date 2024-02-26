import { Loader2 } from 'lucide-react'

const Loader = () => {
  return (
    <div className='flex min-h-dvh items-center justify-center bg-dark--2'>
      <Loader2 className='animate-spin' color='white' size={50} />
    </div>
  )
}

export default Loader
