import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Box(props) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  return (
    <mesh 
      {...props}
      ref = {ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (hover(true))}
      onPointerOut={(event) => hover(false)}
      >
      <boxGeometry />
      <meshPhysicalMaterial color={hovered ? 'red' : 'blue' }/>
    </mesh>
  )
}

function ScenePanel({objects}) {
  return (
    <div className="panel">
      <h2>Scene</h2>
      <ul>
        {objects.map((object, index) => (
          <li key={index}>{object}</li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  const [count, setCount] = useState(0);
  const [objects, setObjects] = useState(["Box 1", "Box 2"]);
  return (
    <div>
      <Canvas>
        <ambientLight intensity={'0.2'}/>
        <pointLight position={[10,10,10]} />
        <Box position={[1,0,0]}/>
        <Box position={[-1,0,0]}/>
        <OrbitControls />
      </Canvas>
      <ScenePanel objects={objects} />
    </div>
  )
}
