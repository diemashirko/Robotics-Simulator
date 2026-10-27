import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

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
          position: [5, 5, 5],
        }}
        style={{
          background: "#222",
        }}
      >
        <ambientLight intensity={1} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />

        <gridHelper args={[20, 20]} />

        <mesh position={[0, 0.5, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;