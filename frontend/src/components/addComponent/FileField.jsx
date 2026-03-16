export default function FileField({ label }) {
  return (
    <div className="col-md-12">
      <div className="form-group">
        <label>{label}</label>

        <input
          type="file"
          className="form-control image-file"
          accept="image/*"
        />

      </div>
    </div>
  );
}