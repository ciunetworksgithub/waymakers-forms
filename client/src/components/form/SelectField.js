import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

export const SelectField = ({
  emptyPlaceholder,
  errors,
  handleChange,
  label,
  listensTo,
  name,
  options: _options,
  optionsApi,
  placeholder,
  required,
  touched,
  values,
}) => {
  const [dependentField, setDependentField] = useState(values[listensTo]);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(_options);
  const isEmpty = Object.keys(options).length === 0;

  useEffect(() => {
    if (!listensTo || dependentField === values[listensTo]) return;
    setIsLoading(true);
    optionsApi(values[listensTo]).then(newOptions => {
      setDependentField(values[listensTo]);
      setOptions(newOptions);
      setIsLoading(false);
    });
  }, [dependentField, listensTo, optionsApi, values]);

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
