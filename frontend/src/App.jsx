import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import STLModel from "./components/STLModel";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Canvas
        camera={{
          position: [100, 100, 100],
          fov: 60,
        }}
        style={{
          background: "#222",
        }}
      ><axesHelper args={[50]} />
        <ambientLight intensity={1} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />

        <gridHelper args={[20, 20]} />


        <mesh position={[2, 0.5, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="red" />
        </mesh>

        <STLModel />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;