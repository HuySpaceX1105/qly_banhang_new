export default function InputField({
  label,
  placeholder,
  required = false,
  type = "text",
  col = "col-md-12"
}) {
  return (
    <div className={col}>
      <div className="form-group">
        <label>{label}</label>

        <input
          type={type}
          className="form-control"
          placeholder={placeholder}
          required={required}
        />

        <div className="help-block with-errors"></div>
      </div>
    </div>
  );
}