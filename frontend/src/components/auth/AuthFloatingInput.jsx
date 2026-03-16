function FloatingInput({id, type, label }) {
  return (
    <div className="col-lg-12">
      <div className="floating-label form-group">
        <input
          id={id}
          className="floating-input form-control"
          type={type}
          placeholder=" "
        />
        <label>{label}</label>
      </div>
    </div>
  );
}

export default FloatingInput;