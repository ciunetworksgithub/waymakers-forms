import Form from 'react-bootstrap/Form';

import { HelpIcon } from '../help';

export const TextField = ({
  errors,
  handleChange,
  helpComponent,
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
      {helpComponent && <HelpIcon componentName={helpComponent} />}
      <Form.Control
        isInvalid={!!errors[name]}
        isValid={touched[name] && !errors[name]}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        type="text"
        value={values[name]}
      />
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
