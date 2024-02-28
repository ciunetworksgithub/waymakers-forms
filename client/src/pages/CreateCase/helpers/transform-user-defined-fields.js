import fieldDefs from '../config/field-definitions.js';

export const transformUserDefinedFields = (fields = {}) => {
  const userDefinedFields = [];
  Object.entries(fields).forEach(([field, value]) => {
    const { udfName: name } = fieldDefs[field];
    if (!!name) {
      userDefinedFields.push({
        name: fieldDefs[field].udfName,
        value,
      });
    }
  });
  return {
    ...fields,
    userDefinedFields,
  };
};
