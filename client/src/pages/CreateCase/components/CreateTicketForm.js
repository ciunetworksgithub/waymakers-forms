import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useState } from 'react';

import { createTicket, replaceDueDateTime, toDTO } from '../helpers';
import { FormField } from '../../../components/form';

export const CreateTicketForm = ({ formDef, onCancel, onComplete }) => {
  const {
    tile: { title: subject },
    fields: { hidden, visible: visibileFields },
  } = formDef;
  const initialValues = {
    ...visibileFields.reduce((acc, cur) => ({ [cur]: '', ...acc }), {}),
    ...hidden,
  };
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async values => {
    setIsLoading(true);
    const response = await createTicket(
      toDTO({
        data: values,
        fieldDefs: visibileFields.reduce(
          (acc, cur) => ({ [cur.name]: cur, ...acc }),
          {}
        ),
      })
    );
    if (response.status === 'error') {
      setIsLoading(false);
      try {
        setError(JSON.parse(response.message).errors.join(' '));
      } catch (e) {
        setError('Encountered an error. Please contact support.');
      }
    } else {
      onComplete({ attachments: values['attachments'], ...response });
    }
  };

  const validationSchema = Yup.object().shape(
    visibileFields.reduce(
      (acc, { name, schema }) => (schema ? { [name]: schema, ...acc } : acc),
      {}
    )
  );

  const formikProps = {
    initialValues: replaceDueDateTime(initialValues),
    onSubmit,
    validationSchema,
    validateOnChange: false,
  };

  return (
    <Container className="CreateTicketForm">
      {error && <Alert variant="danger">{error}</Alert>}

      <h3 className="title">{subject}</h3>

      <Formik {...formikProps}>
        {({ handleSubmit, isValidating, isSubmitting, ...formikBag }) => (
          <Form noValidate onSubmit={handleSubmit}>
            {visibileFields.map((fieldDef, idx) => (
              <FormField key={idx} {...fieldDef} {...formikBag} />
            ))}
            <Button
              className="me-3"
              variant="primary"
              type="submit"
              disabled={isSubmitting || isValidating || isLoading}
            >
              Submit
            </Button>
            <Button
              variant="secondary"
              onClick={onCancel}
              disabled={isSubmitting || isValidating || isLoading }
            >
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
