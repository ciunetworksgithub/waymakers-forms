import Form from 'react-bootstrap/Form';

export const SelectField = ({
  errors,
  handleChange,
  label,
  name,
  options,
  placeholder,
  required,
  touched,
  values,
}) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Select
        isInvalid={!!errors[name]}
        isValid={touched[name] && !errors[name]}
        onChange={handleChange}
        required={required}
        value={values[name]}
      >
        <option>{placeholder}</option>
        {Object.entries(options).map(([label, value], idx) => (
          <option key={idx} value={value}>
            {label}
          </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
