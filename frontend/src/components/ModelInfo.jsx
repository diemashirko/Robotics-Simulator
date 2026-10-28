export default function ModelInfo({
  infos,
  selectedPartName,
  moveSelected
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
    </div>

  );

}