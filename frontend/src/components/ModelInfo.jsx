export default function ModelInfo({
  infos,
  models,
  selectedParent,
  selectedChildren
}) {
  const sectionStyle = {
    borderTop: "1px solid #ccc",
    marginTop: "8px",
    paddingTop: "6px"
  };

  const detailStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2px 8px",
    fontSize: "14px",
    lineHeight: 1.3
  };

  const headingStyle = {
    margin: "4px 0 2px",
    fontSize: "15px",
    lineHeight: 1.3
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 1000,
        width: "300px",
        background: "white",
        color: "#222",
        padding: "8px",
        borderRadius: "8px",
        maxHeight: "80vh",
        overflowY: "auto",
        textAlign: "left",
        fontSize: "14px",
        lineHeight: 1.35
      }}
    >
      <h3 style={{ margin: "0 0 6px", fontSize: "18px", lineHeight: 1.3 }}>
        Assembly Info
      </h3>

      <section>
        <h4 style={headingStyle}>Parent</h4>
        <p>{selectedParent?.name ?? "None"}</p>

        <h4 style={headingStyle}>Children</h4>
        {selectedChildren.length > 0 ? (
          <ul style={{ margin: "2px 0 0", paddingLeft: "18px" }}>
            {selectedChildren.map((child) => (
              <li key={child.id}>{child.name}</li>
            ))}
          </ul>
        ) : (
          <p>None</p>
        )}
      </section>

      <section style={sectionStyle}>
        <h4 style={{ ...headingStyle, marginTop: 0 }}>Parts</h4>
        {models.length === 0 ? (
          <p>No parts loaded</p>
        ) : (
          models.map((model) => {
            const info = infos.find((item) => item.id === model.id);
            const rotation = model.rotation
              .map((value) => (value * 180 / Math.PI).toFixed(1))
              .join(", ");

            return (
              <div
                key={model.id}
                style={{
                  ...sectionStyle,
                  marginTop: "6px",
                  paddingTop: "5px"
                }}
              >
                <h4 style={{ ...headingStyle, marginTop: 0 }}>{model.name}</h4>
                <div style={detailStyle}>
                  <span>Rotation:</span>
                  <span>{rotation}°</span>
                  <span>X:</span>
                  <span>{model.position[0].toFixed(2)}</span>
                  <span>Y:</span>
                  <span>{model.position[1].toFixed(2)}</span>
                  <span>Z:</span>
                  <span>{model.position[2].toFixed(2)}</span>
                  <span>Triangles:</span>
                  <span>{info?.triangles ?? "Loading…"}</span>
                  <span>Width:</span>
                  <span>{info?.width ?? "Loading…"}</span>
                  <span>Height:</span>
                  <span>{info?.height ?? "Loading…"}</span>
                  <span>Depth:</span>
                  <span>{info?.depth ?? "Loading…"}</span>
                </div>
              </div>
            );
          })
        )}
      </section>

    </div>
  );
}
