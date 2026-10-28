export default function ModelInfo({
  infos,
  selectedPartName,
  selectedRotation,
  selectedPosition,
  moveSelected,
  rotateSelected
}) {

  if (
    !infos ||
    infos.length === 0
  ) {
    return null;
  }

  return (

    <div
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 1000,
        width: "300px",
        background: "white",
        padding: "10px",
        borderRadius: "8px",
        maxHeight: "80vh",
        overflowY: "auto"
      }}
    >

      <h3>
        Assembly Info
      </h3>
      
      <p>
        Selected:
        {
            selectedPartName
                ? selectedPartName
                : "None"
        }
      </p>
      {

        infos.map(
          (info) => (

            <div
              key={info.name}
              style={{
                marginBottom: "20px",
                borderBottom:"1px solid #ccc"
              }}
            >

              <h4>
                {info.name}
              </h4>
              <p>

                Rotation (degrees):

                {

                  selectedRotation
                    ? selectedRotation
                        .map(
                          value =>
                          (
                            value * 180 / Math.PI
                          ).toFixed(1)
                        )
                        .join(", ")
                    : "0, 0, 0"

                }

              </p>
              <p> 
                X:
                {
                  selectedPosition
                    ? selectedPosition[0].toFixed(2) 
                    : "0.00"
                }
              </p>
              <p>
                Y:
                {
                  selectedPosition
                    ? selectedPosition[1].toFixed(2)
                    : "0.00"
                }
              </p>
              <p>
                Z:
                {
                  selectedPosition
                    ? selectedPosition[2].toFixed(2)
                    : "0.00"
                }
              </p>
              <p>
                Triangles:
                {info.triangles}
              </p>

              <p>
                Width:
                {info.width}
              </p>

              <p>
                Height:
                {info.height}
              </p>

              <p>
                Depth:
                {info.depth}
              </p>

            </div>

          )
        )

      }
      <button
        onClick={() => {
          moveSelected(
            0.5,
            0,
            0
          );
        }}
      >
        Move +X
      </button>
      <button
        onClick={() => {
          moveSelected(
            -0.5,
            0,
            0
          );
        }}
      >
        Move -X
      </button>
      <button
        onClick={() => {
          moveSelected(
            0,
            0.5,
            0
          );
        }}
      >
        Move +Y
      </button>
      <button
        onClick={() => {
          moveSelected(
            0,
            -0.5,
            0
          );
        }}
      >
        Move -Y
      </button>
      <button
        onClick={() => {
          moveSelected(
            0,
            0,
            0.5
          );
        }}
      >
        Move +Z
      </button>
      <button
        onClick={() => {
          moveSelected(
            0,
            0,
            -0.5
          );
        }}
      >
        Move -Z
      </button>
      <button
        onClick={() => {
          rotateSelected(
            0.2,
            0,
            0
          );
        }}
      >
        Rotate +X
      </button>
      <button
        onClick={() => {
          rotateSelected(
            -0.2,
            0,
            0
          );
        }}
      >
        Rotate -X
      </button>
      <button
        onClick={() => {
          rotateSelected(
            0,
            0.2,
            0
          );
        }}
      >
        Rotate +Y
      </button>
      <button
        onClick={() => {
          rotateSelected(
            0,
            -0.2,
            0
          );
        }}
      >
        Rotate -Y
      </button>
      <button
        onClick={() => {
          rotateSelected(
            0,
            0,
            0.2
          );
        }}
      >
        Rotate +Z
      </button>
      <button
        onClick={() => {
          rotateSelected(
            0,
            0,
            -0.2
          );
        }}
      >
        Rotate -Z
      </button>
    </div>

  );

}