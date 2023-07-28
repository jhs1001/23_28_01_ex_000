import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Torus } from '@react-three/drei'

function MeshComponent({name, position, onClick, onPointerOver, onPointerOut}) {
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
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}>
      {geometry}
      <meshStandardMaterial color='orange' />
    </mesh>
  )
}

function ScenePanel({objects, addObject, removeObject, selectedObject, selectObject}) {
  return (
    <div className="panel">
      <h2>Scene</h2>
      <ul>
        {objects.map((object, index) => (
          <li key={index} style={{color: selectedObject === object ? 'blue' : 'red'}}>
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
    <div>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        {objects.map((name, index) => (
          <MeshComponent
            key={name}
            name={name}
            position={[(index*2.4)-1.2, 0, 0]}
            onClick={() => selectObject(name)}
            onPointerOver={() => selectObject(name)}
            onPointerOut={() => selectObject(null)}
          />
        ))}
        <OrbitControls />
      </Canvas>
      <ScenePanel
        objects={objects}
        selectedObject={selectedObject}
        addObject={addObject}
        removeObject={removeObject}
        selectObject={selectObject}
      />
      <div>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
        <p>You clicked {count} times</p>
      </div>
    </div>
  )
}
