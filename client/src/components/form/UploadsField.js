import Form from 'react-bootstrap/Form';

export const UploadsField = ({ errors, label, name }) => {
  const handleChange = (e, ...rest) => {
    debugger;
  }

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type="file" onChange={handleChange} multiple />
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
