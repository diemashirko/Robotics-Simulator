import { useState, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "@react-three/drei";

import STLModel from "./components/STLModel";
import FileUploader from "./components/FileUploader";
import { uploadFile } from "./api/upload";
import ModelInfo from "./components/ModelInfo";
import ControlsPanel from "./components/ControlsPanel";

function translateModelAndDescendants(models, modelId, dx, dy, dz) {
  const movedIds = new Set();

  function collectDescendants(parentId) {
    if (movedIds.has(parentId)) {
      return;
    }

    movedIds.add(parentId);
    models.forEach((model) => {
      if (model.parentId === parentId) {
        collectDescendants(model.id);
      }
    });
  }

  collectDescendants(modelId);

  return models.map((model) => {
    if (!movedIds.has(model.id)) {
      return model;
    }

    return {
      ...model,
      position: [
        model.position[0] + dx,
        model.position[1] + dy,
        model.position[2] + dz,
      ],
    };
  });
}

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
      model.id === selectedPart);
    
  const [selectedMesh, setSelectedMesh] = useState(null);
  const [ dragging, setDragging ] = useState(false);
  const [parentPart,setParentPart] = useState(null);
  const selectedParent =
  models.find(model => model.id === selectedModel?.parentId);
  const parentToAttach = models.find(
    (model) => model.id === parentPart
  );
  const selectedChildren = models.filter(
    (model) => model.parentId === selectedPart
  );

  const handleModelLoaded = useCallback((modelId, data) => {
    setModelInfos((current) => {
      const existing = current.find((info) => info.id === modelId);
      if (
        existing &&
        existing.triangles === data.triangles &&
        existing.width === data.width &&
        existing.height === data.height &&
        existing.depth === data.depth
      ) {
        return current;
      }

      return [
        ...current.filter((info) => info.id !== modelId),
        { id: modelId, ...data },
      ];
    });
  }, []);
  
function moveSelected(dx, dy, dz) {
  setModels((current) =>
    translateModelAndDescendants(
      current,
      selectedPart,
      dx,
      dy,
      dz
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
            position: [current.length * 5, 0, 0],
            rotation: [0, 0, 0],
            parentId: null
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
        saveAssembly={saveAssembly}
        loadAssembly={loadAssembly}
      />
      <ModelInfo

        infos={modelInfos}
        models={models}
        selectedParent={selectedParent}
        selectedChildren={selectedChildren}
      />
      <ControlsPanel
        selectedModel={selectedModel}
        parentToAttach={parentToAttach}
        moveSelected={moveSelected}
        rotateSelected={rotateSelected}
        markAsParent={markAsParent}
        attachToParent={attachToParent}

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
              (model) => (

                <STLModel

                  key={model.id}

                  modelUrl={model.url}

                  modelId={model.id}

                  position={model.position}

                  rotation={model.rotation}

                  selected={
                    selectedPart ===
                    model.id
                  }

                  onSelect={(mesh) => {

                    setSelectedPart(
                      model.id
                    );
                    setSelectedMesh(mesh);
                  }}
                  onLoaded={handleModelLoaded}

                />

              )
            )
          }

          <OrbitControls 
            enabled={!dragging}
          />

          {

            selectedMesh && (
              console.log(
                "Selected mesh:",
                selectedMesh
              ),
              <TransformControls
                object={
                  selectedMesh
                }
                mode="translate"

                onMouseDown={() => {
                  setDragging(true);

                }}
                onMouseUp={() => {

                  setDragging(false);

                }}
                onObjectChange={() => {

                  if (
                    !selectedMesh
                  ) return;

                  const newPosition = [

                    selectedMesh.position.x,

                    selectedMesh.position.y,

                    selectedMesh.position.z

                  ];

                  setModels((current) => {
                    const model = current.find(
                      (item) => item.id === selectedPart
                    );

                    if (!model) {
                      return current;
                    }

                    return translateModelAndDescendants(
                      current,
                      selectedPart,
                      newPosition[0] - model.position[0],
                      newPosition[1] - model.position[1],
                      newPosition[2] - model.position[2]
                    );
                  });
                    }}
              />

            )

          }
        </Canvas>
      </div>
    </>
  );
  function saveAssembly() {

    const assembly = {

      models: models

    };

    localStorage.setItem(

      "robotAssembly",

      JSON.stringify(
        assembly
      )

    );

    console.log(
      "Assembly Saved"
    );

  }
  function loadAssembly() {

    const saved =

      localStorage.getItem(
        "robotAssembly"
      );

    if (!saved) {

      return;

    }

    const data =
      JSON.parse(saved);

    setModels(
      data.models
    );

  }
  function markAsParent() {

    setParentPart(
      selectedPart
    );

  }
  function attachToParent() {

    if (
      !parentPart ||
      !selectedPart ||
      parentPart === selectedPart
    ) {
      return;
    }
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

              parentId:
                parentPart

            };
          }
        )
    );

  }
}

export default App;