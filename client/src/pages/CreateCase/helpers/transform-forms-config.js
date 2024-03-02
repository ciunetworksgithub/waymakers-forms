import fieldDefs from '../config/field-definitions';

export const transformFormsConfig = ({ fieldDefaults, forms }) =>
  forms.map(form => ({
    ...form,
    fields: {
      ...form.fields,
      visible: form.fields.visible.map(field =>
        typeof field === 'object'
          ? {
              ...fieldDefs[field.name],
              ...fieldDefaults[field.name],
              ...field,
            }
          : {
              name: field,
              ...fieldDefs[field],
              ...fieldDefaults[field],
            }
      ),
    },
  }));
