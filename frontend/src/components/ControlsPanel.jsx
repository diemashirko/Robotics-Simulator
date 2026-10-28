export default function ControlsPanel({
  selectedModel,
  parentToAttach,
  moveSelected,
  rotateSelected,
  markAsParent,
  attachToParent
}) {
  const hasSelection = Boolean(selectedModel);
  const buttonStyle = {
    minWidth: 0,
    padding: "6px 4px"
  };

  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 1000,
        width: "300px",
        boxSizing: "border-box",
        background: "white",
        color: "#222",
        padding: "10px",
        borderRadius: "8px",
        maxHeight: "40vh",
        overflowY: "auto",
        textAlign: "left"
      }}
    >
      <h3>Controls</h3>
      <p style={{ marginBottom: "8px" }}>
        Selected: {selectedModel?.name ?? "None"}
      </p>

      <div style={{ display: "flex", gap: "4px", marginBottom: "8px" }}>
        <button
          onClick={markAsParent}
          disabled={!hasSelection}
          style={buttonStyle}
        >
          Set As Parent
        </button>
        <button
          onClick={attachToParent}
          disabled={
            !hasSelection ||
            !parentToAttach ||
            selectedModel.id === parentToAttach.id
          }
          style={buttonStyle}
        >
          Attach To Parent
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "4px"
        }}
      >
        <button onClick={() => moveSelected(0.5, 0, 0)} disabled={!hasSelection}>Move +X</button>
        <button onClick={() => moveSelected(-0.5, 0, 0)} disabled={!hasSelection}>Move -X</button>
        <button onClick={() => moveSelected(0, 0.5, 0)} disabled={!hasSelection}>Move +Y</button>
        <button onClick={() => moveSelected(0, -0.5, 0)} disabled={!hasSelection}>Move -Y</button>
        <button onClick={() => moveSelected(0, 0, 0.5)} disabled={!hasSelection}>Move +Z</button>
        <button onClick={() => moveSelected(0, 0, -0.5)} disabled={!hasSelection}>Move -Z</button>
        <button onClick={() => rotateSelected(0.2, 0, 0)} disabled={!hasSelection}>Rotate +X</button>
        <button onClick={() => rotateSelected(-0.2, 0, 0)} disabled={!hasSelection}>Rotate -X</button>
        <button onClick={() => rotateSelected(0, 0.2, 0)} disabled={!hasSelection}>Rotate +Y</button>
        <button onClick={() => rotateSelected(0, -0.2, 0)} disabled={!hasSelection}>Rotate -Y</button>
        <button onClick={() => rotateSelected(0, 0, 0.2)} disabled={!hasSelection}>Rotate +Z</button>
        <button onClick={() => rotateSelected(0, 0, -0.2)} disabled={!hasSelection}>Rotate -Z</button>
      </div>
    </div>
  );
}
