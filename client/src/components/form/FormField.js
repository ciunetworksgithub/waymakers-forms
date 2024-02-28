import {
  AutosuggestField,
  DependentSelectField,
  EmailField,
  SelectField,
  TextAreaField,
  TextField,
  UploadsField,
} from './';

export const FormField = ({ type, ...props }) => {
  switch (type) {
    case 'autosuggest':
      return <AutosuggestField {...props} />;
    case 'email':
      return <EmailField {...props} />;
    case 'select':
      return props.listensTo ? (
        <DependentSelectField {...props} />
      ) : (
        <SelectField {...props} />
      );
    case 'textarea':
      return <TextAreaField {...props} />;
    case 'upload':
      return <UploadsField {...props} />;
    default:
      return <TextField {...props} />;
  }
};
