// client/src/components/FormWithFormik.js
import React from 'react';
import { useFormik } from 'formik';
import createTicket from './helpers/create-ticket';

const CreateTicketForm = () => {
  const formik = useFormik({
    initialValues: {
      network: '',
      email: '',
    },
    validate: values => {
      const errors = {};

      if (!values.network) {
        errors.network = 'Network is required';
      }

      return errors;
    },
    onSubmit: async values => {
      createTicket(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>
        Network:
        <input
          type="text"
          name="network"
          value={formik.values.network}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.network && formik.errors.network ? (
          <div style={{ color: 'red' }}>{formik.errors.network}</div>
        ) : null}
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateTicketForm;
