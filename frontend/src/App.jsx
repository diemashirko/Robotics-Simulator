import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import STLModel from "./components/STLModel";
import FileUploader from "./components/FileUploader";
import { uploadFile } from "./api/upload";

function App() {

  const [file, setFile] = useState(null);

  useEffect(() => {

    if (!file) return;

    console.log("Selected file:", file);

    uploadFile(file)
      .then((result) => {
        console.log(
          "Upload success:",
          result
        );
      })
      .catch((error) => {
        console.error(
          "Upload failed:",
          error
        );
      });

  }, [file]);

  return (
    <>
      <FileUploader
        onFileSelected={setFile}
      />

      <div
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Canvas
          camera={{
            position: [5, 5, 5],
            fov: 60,
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

          <gridHelper
            args={[20, 20]}
          />

          <axesHelper
            args={[5]}
          />

          <STLModel />

          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
}

export default App;