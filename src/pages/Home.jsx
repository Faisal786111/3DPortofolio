/* eslint-disable react/no-unknown-property */

import  { Canvas } from '@react-three/fiber'
import { Suspense , useState} from 'react'
import Loader from '../components/Loader'
import { Island } from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import HomeInfo from '../components/HomeInfo'


const Home = () => {
  const [isRotating , setIsRotating] = useState(false);
  const [currentStage , setCurrentStage] = useState(1);

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
            planScale = {planScale}
            planePosition={planePosition}
            rotation = {[0 ,20 , 0]}
          />

        </Suspense>
        
      </Canvas>
    </section>
  )
}

export default Home