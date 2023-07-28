import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Torus } from '@react-three/drei'
import { GridHelper } from 'three'

function MeshComponent({name, position, onClick, onPointerOver, onPointerOut, selected}) {
  const ref = useRef()
  useFrame((state, delta) => (ref.current.rotation.x += delta))

  let geometry;
  switch (name) {
    case "Sphere":
      geometry = <sphereGeometry args={[0.5, 30, 30]} />;
      break;
    case "Torus":
      geometry = <torusGeometry args={[0.3, 0.2, 30, 100]} />;
      break;
    default:
      geometry = <boxGeometry args={[1, 1, 1]} />;
  }

  return (
    <mesh
      position={position}
      ref={ref}
      scale={selected ? 1.5 : 1}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}>
      {geometry}
      <meshPhysicalMaterial
        color={selected ? 'Blue' : 'orange'}
        metalness={1}   
        roughness={0.5}    
        opacity={1}       
        clearcoat={0.1}     
        transparent={true}  
      />
    </mesh>
  )
}

function ScenePanel({objects, removeObject, selectedObject, selectObject}) {
  return (
    <div className="panel">
      <h2>Scene</h2>
      <ul>
        {objects.map((object, index) => (
          <li key={index} style={{color: selectedObject === object ? 'blue' : 'red'}}
              onClick={() => selectObject(object)}>
            {object}
            <button onClick={(e) => {removeObject(object); e.stopPropagation();}}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ControlPanel({count, setCount, addObject, numObjects}) {
  return (
    <div className="control-panel">
      <button onClick={addObject}>Add Box</button>
      <button onClick={() => setCount(count + 1)}>
        Num
      </button>
      <p>Count : {count}</p>
      <p>Number of objects: {numObjects}</p> 
    </div>
  );
}

export default function App() {
  const [count, setCount] = useState(0);
  const [objects, setObjects] = useState([
    "Camera",         // 카메라 
    "Ambient Light", // 라이트
    "Spot Light",    // 라이트
    "Point Light",   // 라이트
    "Box 1", 
    "Box 2", 
    "Sphere", 
    "Torus"
  ]);
  const [selectedObject, selectObject] = useState(null);

  const addObject = () => {
    const objectName = "Box " + (objects.length + 1);
    setObjects([...objects, objectName]);
  };

  const removeObject = (objectName) => {
    setObjects(objects.filter(object => object !== objectName));
    if (selectedObject === objectName) {
      selectObject(null);
    }
  };

  return (
    <div className="container">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        {objects.map((name, index) => (
          name.includes('Light') || name.includes('Camera') ? null :
          <MeshComponent
            key={name}
            name={name}
            position={[(index*2.4)-12, 0, 0]}
            onClick={() => selectObject(name)}
            selected={selectedObject === name}
          />
        ))}
        <OrbitControls />
      </Canvas>
      <div className="side-panel">
        <ScenePanel
          objects={objects}
          selectedObject={selectedObject}
          removeObject={removeObject}
          selectObject={selectObject}
        />
        <ControlPanel
          count={count}
          setCount={setCount}
          addObject={addObject}
          numObjects={objects.length}
        />
      </div>
    </div>
  )
}
