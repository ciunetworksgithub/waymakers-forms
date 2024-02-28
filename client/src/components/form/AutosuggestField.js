import Autosuggest from 'react-autosuggest';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

import { useDependentField } from './hooks/use-dependent-field';

import './AutosuggestField.css';

export const AutosuggestField = ({
  emptyPlaceholder,
  errors,
  dirty,
  label,
  name,
  placeholder,
  required,
  touched,
  setFieldError,
  setFieldValue,
  submitCount,
  values,
  ...rest
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');
  const { isEmpty, isLoading, options } = useDependentField({
    onOptionsLoaded: () => {
      setValue('');
      setFieldValue(name, null);
    },
    values,
    ...rest,
  });

  const handleBlur = () => {
    if (!values[name]) {
      console.log(`[JMG] blur error`);
      setFieldError(name, 'Please select an email from the list');
    }
  };

  const handleChange = (e, { newValue }) => {
    setValue(newValue);
    setFieldValue(name, null);
  };

  const handleSuggestionSelected = (e, { suggestion }) => {
    const { label, value } = suggestion;
    setValue(label);
    setFieldValue(name, value);
  };

  const updateSuggestions = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const newSuggestions = Object.entries(options)
      .filter(
        ([label]) => label.toLowerCase().slice(0, inputLength) === inputValue
      )
      .map(([label, value]) => ({ label, value }));
    setSuggestions(newSuggestions);
  };

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Autosuggest
        suggestions={suggestions}
        containerProps={{
          className: errors[name] ? 'is-invalid' : '',
        }}
        inputProps={{
          'aria-autocomplete': 'off',
          autoComplete: 'off',
          autoCorrect: 'off',
          autoCapitalize: 'off',
          className: `form-control ${
            !!errors[name]
              ? 'is-invalid'
              : submitCount && !errors[name]
              ? 'is-valid'
              : ''
          }`,
          disabled: isLoading || isEmpty,
          name: `${name}-autosuggest`,
          placeholder,
          value,
          onBlur: handleBlur,
          onChange: handleChange,
        }}
        getSuggestionValue={({ label }) => label}
        onSuggestionsClearRequested={() => setSuggestions([])}
        onSuggestionsFetchRequested={updateSuggestions}
        onSuggestionSelected={handleSuggestionSelected}
        renderSuggestion={({ label }) => <div>{label}</div>}
      />
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
