import Form from 'react-bootstrap/Form';

export const TextAreaField = ({
  errors,
  handleChange,
  label,
  name,
  placeholder,
  required,
  touched,
  values,
}) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        isInvalid={!!errors[name]}
        isValid={touched[name] && !errors[name]}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        rows={3}
        type="text"
        value={values[name]}
      />
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
