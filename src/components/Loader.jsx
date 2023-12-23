
import {Html} from '@react-three/drei'

// drei is used to convert react code into 3d objects bcoz canvas accepts only objects 

const Loader = () => {
  return (
    <Html>
    <div className='flex justify-center items-center'>
       <div className='w-20 h-20 border-2 border-opacity-20 border-blue-500 border-t-blue-950 rounded-full animate-spin'></div>
    </div>
    </Html>
  )
}

export default Loader