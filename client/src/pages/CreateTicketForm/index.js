// client/src/components/FormWithFormik.js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import createTicket from './helpers/create-ticket';
import TextInput from './components/text-input';

const INITIAL_VALUES = {
  network: '',
  email: '',
};

const CreateTicketForm = ({ initialValues = INITIAL_VALUES }) => {
  const onSubmit = async values => {
    createTicket(values);
  };

  const validate = values => {
    const errors = {};

    if (!values.network) {
      errors.network = 'Network is required';
    }

    return errors;
  };

  const formikProps = {
    initialValues,
    onSubmit,
    validate,
  };

  return (
    <Formik {...formikProps}>
      {props => (
        <Form>
          <h1>Waymakers Customer Form</h1>
          <TextInput
            title="Network"
            name="network"
            placeholder="Enter your network name"
          />
          <TextInput
            title="Email"
            name="email"
            placeholder="Enter your email"
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateTicketForm;
