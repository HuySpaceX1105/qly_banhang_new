import Select from "react-select";

export default function MultiSelectField({label, options, value, onChange,  isMulti = false, col = "col-md-12"}) {
  return (
    <div className={col}>
      <div className="form-group">
        <label>{label}</label>

        <Select
          options={options}
          isMulti={isMulti}
          value={
            isMulti
              ? options.filter(o => value?.includes(o.value))
              : options.find(o => o.value === value) || null
          }
          onChange={(selected) => {
            if (isMulti) {
              onChange(selected ? selected.map(s => s.value) : []);
            } else {
              onChange(selected?.value);
            }
          }}
        />
      </div>
    </div>
  );
}