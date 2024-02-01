import fieldDefs from '../config/field-definitions.json';

export const toDTO = (data = {}) =>
  Object.entries(data).reduce((acc, cur) => {
    const [fieldName, value] = cur;
    const { dtoTransform, label } = fieldDefs[fieldName];
    switch (dtoTransform) {
      case 'append_to_description':
        acc.description = acc.description || data.description || '';
        acc.description += `\n\n${label}: ${value}`;
        break;
      default:
        acc[fieldName] = value;
    }
    return acc;
  }, {});
