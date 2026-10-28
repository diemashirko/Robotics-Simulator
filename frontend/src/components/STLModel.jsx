import { useLoader } from "@react-three/fiber";
import { STLLoader }
  from "three/examples/jsm/loaders/STLLoader.js";

export default function STLModel({
  modelUrl,
  onLoaded
})
 {

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

  geometry.computeBoundingBox();

  const box =
    geometry.boundingBox;

  const width =
    box.max.x - box.min.x;

  const height =
    box.max.y - box.min.y;

  const depth =
    box.max.z - box.min.z;

  if (onLoaded) {

    onLoaded({

      triangles:
        geometry.attributes
          .position.count / 3,

      width:
        width.toFixed(2),

      height:
        height.toFixed(2),

      depth:
        depth.toFixed(2)

    });

  }

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