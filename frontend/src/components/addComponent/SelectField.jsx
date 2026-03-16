export default function SelectField({ label, options, col = "col-md-12" }) {
  return (
    <div className={col}>
      <div className="form-group">
        <label>{label}</label>

        <select className="selectpicker form-control" data-style="py-0">
          {options.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>

      </div>
    </div>
  );
}