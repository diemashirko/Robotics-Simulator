import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { useEffect, useRef } from "react";

export default function STLModel({
  modelUrl,
  modelId,
  position,
  rotation,
  onLoaded,
  onSelect,
  selected
}) {
  const meshRef = useRef();

  const geometry = useLoader(
    STLLoader,
    modelUrl
  );

  geometry.center();
  geometry.computeBoundingBox();

  const box = geometry.boundingBox;
  const width = box.max.x - box.min.x;
  const height = box.max.y - box.min.y;
  const depth = box.max.z - box.min.z;

  useEffect(() => {
    if (!onLoaded) {
      return;
    }

    onLoaded(modelId, {
      triangles: geometry.attributes.position.count / 3,
      width: width.toFixed(2),
      height: height.toFixed(2),
      depth: depth.toFixed(2)
    });
  }, [depth, geometry, height, modelId, onLoaded, width]);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      scale={0.1}
      position={position}
      rotation={rotation}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(meshRef.current);
      }}
    >
      <meshStandardMaterial
        color={
          selected
            ? "red"
            : "orange"
        }
      />
    </mesh>
  );
}