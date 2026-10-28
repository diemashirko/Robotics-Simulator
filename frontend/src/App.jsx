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

  const [selectedPart,
    setSelectedPart]
    = useState(null);

    const selectedModel = models.find(
    (model) =>
      model.id === selectedPart
  );
  function moveSelected(
    dx,
    dy,
    dz
  ) {

    setModels(
      current =>

        current.map(
          model => {

            if (
              model.id !==
              selectedPart
            ) {
              return model;
            }

            const newPosition = [

              model.position[0]
                + dx,

              model.position[1]
                + dy,

              model.position[2]
                + dz

            ];
            console.log(
              "moving",
              model.name,
              newPosition
            );
            return {

              ...model,

              position: [

                model.position[0]
                  + dx,

                model.position[1]
                  + dy,

                model.position[2]
                  + dz

              ]

            };

          }
        )
    );

  }
  function rotateSelected(
    rx,
    ry,
    rz
  ) {

    setModels(
      current =>

        current.map(
          model => {

            if (
              model.id !==
              selectedPart
            ) {
              return model;
            }

            return {

              ...model,

              rotation: [

                model.rotation[0]
                  + rx,

                model.rotation[1]
                  + ry,

                model.rotation[2]
                  + rz

              ]

            };

          }
        )

    );

  }
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
            url: result.url,
            position: [0, 0, 0],
            rotation: [0, 0, 0]
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
      <ModelInfo

        infos={modelInfos}
        selectedRotation={
          selectedModel
            ?.rotation
        }
        selectedPosition={
          selectedModel
            ?.position
        }
        selectedPartName={
          selectedModel
            ?.name
        }
        moveSelected={moveSelected}
        rotateSelected={rotateSelected}
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

          {
            models.map(
              (model, index) => (

                <STLModel

                  key={model.id}

                  modelUrl={model.url}

                  position={model.position}

                  rotation={model.rotation}

                  selected={
                    selectedPart ===
                    model.id
                  }

                  onSelect={() => {

                    setSelectedPart(
                      model.id
                    );

                  }}
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