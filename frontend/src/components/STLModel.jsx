import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

export default function STLModel() {

  const geometry = useLoader(
    STLLoader,
    "/models/test.stl"
  );

  geometry.center();

  return (
    <mesh
      geometry={geometry}
      scale={0.01}
    >
      <meshStandardMaterial
        color="orange"
      />
    </mesh>
  );
}