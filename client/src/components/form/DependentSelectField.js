import Form from 'react-bootstrap/Form';

import { useDependentField } from './hooks/use-dependent-field';

export const DependentSelectField = ({
  emptyPlaceholder,
  errors,
  handleChange,
  label,
  name,
  placeholder,
  required,
  touched,
  values,
  ...rest
}) => {
  const { isEmpty, isLoading, options } = useDependentField({ values, ...rest });

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Select
        isInvalid={!!errors[name]}
        isValid={touched[name] && !errors[name]}
        onChange={handleChange}
        required={required}
        value={values[name]}
        disabled={isLoading || isEmpty}
      >
        <option>{isEmpty ? emptyPlaceholder : placeholder}</option>
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
