export const toDTO = ({ data = {}, fieldDefs }) =>
  Object.entries(data)
    .reverse()
    .reduce((acc, cur) => {
      const [fieldName, value] = cur;
      const { appendToDescription, label } = fieldDefs[fieldName] || {};
      if (appendToDescription) {
        acc.description = acc.description || data.description || '';
        acc.description += `\n\n${label}: ${value}`;
      }
      acc[fieldName] = acc[fieldName] || value;
      return acc;
    }, {});
