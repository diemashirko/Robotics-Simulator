export default function ModelInfo({
  info
}) {

  if (!info) {
    return null;
  }

  return (

    <div
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 1000,
        width: "250px",
        background: "white",
        padding: "10px",
        borderRadius: "8px",
        boxShadow:
          "0 0 10px rgba(0,0,0,0.2)"
      }}
    >

      <h3>
        Model Info
      </h3>

      <p>
        Name:
        {info.name}
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

  );
}