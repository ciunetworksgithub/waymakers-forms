import Form from 'react-bootstrap/Form';
import { readFiles } from '../../lib/util';

export const UploadsField = ({
  errors,
  label,
  name,
  required,
  setFieldError,
  setFieldTouched,
  setFieldValue,
  touched,
  values,
}) => {
  const handleChange = async e => {
    const files = e.target?.files;
    if (!files?.length) {
      setFieldError(name, 'No files found to upload');
      return;
    }

    try {
      const value = await readFiles(files);
      setFieldError(name, null);
      setFieldValue(name, value);
    } catch (e) {
      setFieldError(name, e);
    }
  };

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        isInvalid={!!errors[name]}
        isValid={touched[name] && !errors[name]}
        multiple
        onChange={handleChange}
        required={required}
        type="file"
        name={name}
      />
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
