import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { useState } from 'react';

import { createTicket, replaceDueDateTime, toDTO } from '../helpers';
import { FormField } from '../../../components/form';

import fieldDefs from '../config/field-definitions.json';

const CreateTicketForm = ({ ticketDef, onCancel, onComplete }) => {
  const {
    subject,
    formFields: { hidden: initialValues, visible: fieldNames },
  } = ticketDef;
  const fields = fieldNames.map(name => ({ name, ...fieldDefs[name] }));
  const [error, setError] = useState();

  const onSubmit = async values => {
    const response = await createTicket(toDTO(values));
    if (response.status === 'error') {
      try {
        setError(JSON.parse(response.message).errors.join(' '));
      } catch (e) {
        setError('Encountered an error. Please contact support.');
      }
    } else {
      onComplete(response);
    }
  };

  const validate = values => {
    const errors = {};

    if (fieldNames.includes('companyID') && !values.companyID) {
      errors.companyID = 'Required';
    }

    if (
      fieldNames.includes('contactEmail') &&
      !!values.contactEmail &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.contactEmail)
    ) {
      errors.contactEmail = 'Invalid email address';
    }

    return errors;
  };

  const formikProps = {
    initialValues: replaceDueDateTime(initialValues),
    onSubmit,
    validate,
  };

  return (
    <Container className="CreateTicketForm">
      {error && <Alert variant="danger">{error}</Alert>}

      <h3 className="title">{subject}</h3>

      <Formik {...formikProps}>
        {({ handleSubmit, isValidating, isSubmitting, ...formikBag }) => (
          <Form onSubmit={handleSubmit}>
            {fields.map((fieldDef, idx) => (
              <FormField key={idx} {...fieldDef} {...formikBag} />
            ))}
            <Button
              className="me-3"
              variant="primary"
              type="submit"
              disabled={isSubmitting || isValidating}
            >
              Submit
            </Button>
            <Button
              variant="secondary"
              onClick={onCancel}
              disabled={isSubmitting || isValidating}
            >
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateTicketForm;
