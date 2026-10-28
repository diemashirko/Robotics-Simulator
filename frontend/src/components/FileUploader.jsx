export default function FileUploader({
  onFileSelected,
}) {

  const handleChange = (event) => {

    const file =
      event.target.files[0];

    if (file) {
      onFileSelected(file);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 1000,
        background: "white",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      <input
        type="file"
        accept=".stl"
        onChange={handleChange}
      />
    </div>
  );
}