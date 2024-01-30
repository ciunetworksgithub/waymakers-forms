import { EmailField, SelectField, TextAreaField, TextField } from './';

export const FormField = ({
  label,
  name,
  placeholder,
  required,
  type,
  ...formikBag
}) => {
  switch (type) {
    case 'email':
      return (
        <EmailField
          name={name}
          label={label}
          placeholder={placeholder}
          required={required}
          {...formikBag}
        />
      );
    case 'select':
      return (
        <SelectField
          name={name}
          label={label}
          placeholder={placeholder}
          required={required}
          {...formikBag}
        />
      );
    case 'textarea':
      return (
        <TextAreaField
          name={name}
          label={label}
          placeholder={placeholder}
          required={required}
          {...formikBag}
        />
      );
    default:
      return (
        <TextField
          name={name}
          label={label}
          placeholder={placeholder}
          required={required}
          {...formikBag}
        />
      );
  }
};
