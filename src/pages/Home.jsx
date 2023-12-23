/* eslint-disable react/no-unknown-property */

import  { Canvas } from '@react-three/fiber'
import { Suspense , useState , useRef ,useEffect} from 'react'
import Loader from '../components/Loader'
import { Island } from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import HomeInfo from '../components/HomeInfo'
import sakura from "../assets/sakura.mp3"
import tuturu from "../assets/tuturu.mp3"
import { soundoff, soundon } from '../assets/icons'


const Home = () => {
  const audioRef = useRef(new Audio(tuturu))
  audioRef.current.volume = 0.4
  audioRef.current.loop = true
  const [isRotating , setIsRotating] = useState(false);
  const [currentStage , setCurrentStage] = useState(1);
  const [isPlaying , setIsPlaying] = useState(false)

  useEffect(()=>{
    if(isPlaying){
      audioRef.current.play();
    }
    return()=>{
      audioRef.current.pause();
    }
  }, [isPlaying])

  const adjustIslandForScreenSize = () => {
    let screenScale = null
    let screenPosition = [0 , -6.5 , -43];
    let rotation = [0.1 , 4.7, 0];
    
    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }
    
    return [screenScale, screenPosition , rotation];
  };
  
  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;
    
    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }
    
    return [screenScale, screenPosition];
  };
  
  const [isLandScale , isLandPosition , rotation ] = adjustIslandForScreenSize();
  const [planScale , planePosition]  = adjustPlaneForScreenSize();
  
  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-20 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage = {currentStage} />}
      </div>
      {/* The Canvas is an HTML element, not a Three.js object. It is the container in the HTML document where the Three.js renderer renders the 3D graphics. It provides the visual output for the Three.js scene. */}
      <Canvas
      camera={{near:0.1 , far:1000}} className={`w-full h-screen bg-transparent ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}>
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1 , 1, 1]} intensity={2}/>
          <ambientLight intensity={0.5}/>
          <pointLight />
          <spotLight/>
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000"/>
          <Sky isRotating = {isRotating}/>
          <Bird/>
          <Island
            position = {isLandPosition}
            scale= {isLandScale}
            rotation= {rotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating = {isRotating}
            scale = {planScale}
            position={planePosition}
            rotation = {[0 ,20 , 0]}
          />

        </Suspense>
        
      </Canvas>
      <div className='absolute bottom-2 left-2'>
        <img src={!isPlaying ? soundoff : soundon} alt="sound" 
        className='w-10 h-10 object-contain cursor-pointer' 
        onClick={()=>setIsPlaying(!isPlaying)}/>
      </div>
    </section>
  )
}

export default Home