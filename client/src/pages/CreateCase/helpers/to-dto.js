export const toDTO = ({ data = {}, fieldDefs }) =>
  Object.entries(data)
    .reverse()
    .reduce((acc, cur) => {
      const [fieldName, value] = cur;
      const { appendToDescription, label } = fieldDefs[fieldName] || {};
      if (appendToDescription) {
        acc.description = acc.description || data.description || '';
        acc.description += `${
          acc.description ? '\n\n' : ''
        }${label}:\n${value}`;
      } else {
        acc[fieldName] = acc[fieldName] || replacePlaceholders(value, data);
      }
      return acc;
    }, {});

function replacePlaceholders(str, obj) {
  const regex = /{(.+?)}/g;
  return regex.test(str)
    ? str.replace(regex, (match, key) =>
        obj.hasOwnProperty(key) ? obj[key] : match
      )
    : str;
}
