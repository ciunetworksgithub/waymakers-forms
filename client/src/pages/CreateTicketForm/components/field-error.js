const FieldError = ({ formik, name }) => {
  return formik.touched[name] && formik.errors[name] ? (
    <div className="error">{formik.errors[name]}</div>
  ) : null;
};

export default FieldError;
