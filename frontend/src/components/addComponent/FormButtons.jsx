export default function FormButtons({ submitText, addReset }) {
  return (
    <>
      <button type="submit" className="btn btn-primary mr-2">
        {submitText}
      </button>

      <button type="reset" className="btn btn-danger" onClick={addReset}>
        Reset
      </button>
    </>
  );
}