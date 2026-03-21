export default function TextAreaField({ label }) {
  return (
    <div className="col-md-12">
      <div className="form-group">
        <label>{label}</label>

        <textarea className="form-control" rows="4"></textarea>
        
      </div>
    </div>
  );
}