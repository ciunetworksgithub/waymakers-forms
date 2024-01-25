import { addDays, format } from 'date-fns';

const DATETIME_FORMAT = 'MMMM d, yyyy h:mm:ss a';

const getDueDateTime = daysFromNow =>
  format(addDays(new Date(), daysFromNow), DATETIME_FORMAT);

export const replaceDueDateTime = (fields = {}) => {
  const { dueDateTime: daysFromNow } = fields;
  return daysFromNow
    ? { ...fields, dueDateTime: getDueDateTime(daysFromNow) }
    : fields;
};
