import { Field } from 'formik';

import FieldError from './field-error';

const TextInput = ({ name, placeholder, title }) => {
  return (
    <label>
      {title}:
      <Field name={name}>
        {({ field, meta }) => (
          <div>
            <input type="text" placeholder={placeholder} {...field} />
            <FieldError {...meta} />
          </div>
        )}
      </Field>
    </label>
  );
};

export default TextInput;
