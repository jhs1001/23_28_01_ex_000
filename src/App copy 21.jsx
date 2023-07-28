import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sphere, Torus } from '@react-three/drei'
import { GridHelper, SpotLight } from 'three'

function LightComponent({name, position}) {
  return (
    name.includes('Spot Light') ?
    <spotLight position={position} angle={0.15} penumbra={1} color="blue" intensity={10}/>
    : null
  )
}

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

function ControlPanel({count, setCount, addObject, addSpotLight, numObjects, numLights, numCameras}) {
  return (
    <div className="control-panel">
      <button onClick={addObject}>Add Box</button>
      <button onClick={addSpotLight}>Add Spot Light</button>
      <button onClick={() => setCount(count + 1)}>
        Num
      </button>
      <p>Count : {count}</p>
      <p>Number of objects: {numObjects}</p>
      <p>Number of lights: {numLights}</p> 
      <p>Number of cameras: {numCameras}</p> 
    </div>
  );
}

export default function App() {
  const [count, setCount] = useState(0);
  const [objects, setObjects] = useState([
    "Camera",        
    "Ambient Light", 
    "Spot Light",    
    "Point Light",  
    "Box 1", 
    "Box 2", 
    "Sphere", 
    "Torus"
  ]);
  const numObjects = objects.filter(object => !object.includes('Light') && !object.includes('Camera')).length;
  const numLights = objects.filter(object => object.includes('Light')).length;
  const numCameras = objects.filter(object => object.includes('Camera')).length;
  const [selectedObject, selectObject] = useState(null);

  const addObject = () => {
    const objectName = "Box " + (objects.length + 1);
    setObjects([...objects, objectName]);
  };

  const addSpotLight = () => {
    const objectName = "Spot Light " + (objects.filter(object => object.includes("Spot Light")).length + 1);
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
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, 10, 10]} intensity={2}/>
        {objects.map((name, index) => {
          let position = [(index*2.4)-12, 0, 0];
          let lightIndex = objects.filter((object, i) => object.includes('Light') && i < index).length;
          let objectIndex = index - lightIndex;
          if (name.includes('Light')) {
            position = [(lightIndex*2.4)-6, 5, 5]
          } else {
            position = [(objectIndex*2.4)-6, 0, 0]
          }
          return (
            name.includes('Light') || name.includes('Camera') ?
            <LightComponent
              key={name}
              name={name}
              position={position}
            />
            :
            <MeshComponent
              key={name}
              name={name}
              position={position}
              onClick={() => selectObject(name)}
              selected={selectedObject === name}
            />
          )
        })}
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
          addSpotLight={addSpotLight} 
          numObjects={numObjects}
          numLights={numLights}
          numCameras={numCameras}
        />
      </div>
    </div>
  )
}