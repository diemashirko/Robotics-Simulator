import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import * as THREE from "three";

export default function OBJModel() {

  const object = useLoader(
    OBJLoader,
    "/models/mesh.obj"
  );

  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());

  object.position.sub(center);

  return (
    <primitive
      object={object}
      scale={1}
    />
  );
}