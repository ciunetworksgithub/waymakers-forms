import Form from 'react-bootstrap/Form';

const TextAreaField = ({
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
        isValid={touched[name] && !errors[name]}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        rows={3}
        type="text"
        value={values[name]}
      />
    </Form.Group>
  );
};

export default TextAreaField;
