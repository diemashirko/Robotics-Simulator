import { useLoader } from "@react-three/fiber";
import { STLLoader }
  from "three/examples/jsm/loaders/STLLoader.js";

export default function STLModel({
  modelUrl
}) {

  console.log(
    "Loading:",
    modelUrl
  );

  const geometry = useLoader(
    STLLoader,
    modelUrl
  );

  console.log(
    "Geometry loaded:",
    geometry
  );

  geometry.center();

  return (
    <mesh
      geometry={geometry}
      scale={0.1}
    >
      <meshStandardMaterial
        color="orange"
      />
    </mesh>
  );
}