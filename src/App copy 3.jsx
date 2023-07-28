import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Torus } from '@react-three/drei'

function Box(props) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function ScenePanel({objects, addObject, removeObject}) {
  return (
    <div className="panel">
      <h2>Scene</h2>
      <ul>
        {objects.map((object, index) => (
          <li key={index}>
            {object}
            <button onClick={() => removeObject(object)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={addObject}>Add object</button>
    </div>
  );
}

export default function App() {
  const [count, setCount] = useState(0);
  const [objects, setObjects] = useState(["Box 1", "Box 2", "Sphere", "Torus"]);

  const addObject = () => {
    const objectName = prompt("Enter object name");
    setObjects([...objects, objectName]);
  };

  const removeObject = (objectName) => {
    setObjects(objects.filter(object => object !== objectName));
  };

  return (
    <div>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        {objects.map((name, index) => {
          switch (name) {
            case "Box 1":
            case "Box 2":
              return <Box key={name} position={[(index*2.4)-1.2, 0, 0]} />
            case "Sphere":
              return <Sphere key={name} position={[(index*2.4)-1.2, 0, 0]} />
            case "Torus":
              return <Torus key={name} position={[(index*2.4)-1.2, 0, 0]} />
            default:
              return null;
          }
        })}
        <OrbitControls />
      </Canvas>
      <ScenePanel objects={objects} addObject={addObject} removeObject={removeObject} />
      <div>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
        <p>You clicked {count} times</p>
      </div>
    </div>
  )
}
