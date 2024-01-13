const FieldError = ({ touched, error }) =>
  touched && error && <div className="error">{error}</div>;

export default FieldError;
