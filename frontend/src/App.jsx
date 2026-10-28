import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import STLModel from "./components/STLModel";
import FileUploader from "./components/FileUploader";
import { uploadFile } from "./api/upload";
import ModelInfo from "./components/ModelInfo";

function App() {

  const [modelInfos, setModelInfos]
    = useState([]);

    const [file, setFile] =
    useState(null);

  const [models, setModels] =
    useState([]);

  useEffect(() => {

    if (!file) return;

    console.log("Selected file:", file);

    uploadFile(file)
      .then((result) => {
        console.log(
          "Upload success:",
          result
        );
        setModels((current) => [

          ...current,

          {
            id: Date.now(),
            name: file.name,
            url: result.url
          }

        ]);

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
        <ModelInfo
          infos={modelInfos}
        />
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

          {
            models.map(
              (model, index) => (

                <STLModel

                  key={model.id}

                  modelUrl={model.url}

                  position={[
                    index * 3,
                    0,
                    0
                  ]}

                  onLoaded={(data) => {

                    setModelInfos(
                      (current) => {

                        const exists =
                          current.find(
                            x =>
                              x.name ===
                              model.name
                          );

                        if (exists) {
                          return current;
                        }

                        return [

                          ...current,

                          {
                            ...data,

                            name: model.name
                          }

                        ];

                      }
                    );

                  }}

                />

              )
            )
          }

          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
}

export default App;