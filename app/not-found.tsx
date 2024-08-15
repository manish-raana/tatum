import { Button } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='w-full h-screen flex gap-4 flex-col items-center justify-center'>
      <h2 className='font-bolf text-3xl'>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">
       <Button>Return Home</Button>
      </Link>
    </div>
  )
}