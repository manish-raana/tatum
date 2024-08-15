import { LoaderCircleIcon } from 'lucide-react'
import React from 'react'

const Loader = ({isLoading}:{isLoading: boolean}) => {
  return (
    isLoading && <LoaderCircleIcon className='animate-spin'/>
  )
}

export default Loader