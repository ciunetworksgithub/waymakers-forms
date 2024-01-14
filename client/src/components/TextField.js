import Form from 'react-bootstrap/Form';

const TextField = ({
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
        isValid={touched[name] && !errors[name]}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        type="text"
        value={values[name]}
        isInvalid={!!errors[name]}
      />
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default TextField;
