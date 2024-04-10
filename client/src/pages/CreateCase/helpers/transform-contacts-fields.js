export const transformContactsFields = ({ contacts, config }) => {
  if (!contacts?.length) {
    return config;
  }

  return config.map(form => {
    form.fields.visible = form.fields.visible.filter(
      ({ name }) => !['companyID', 'contactID'].includes(name)
    );
    form.fields.hidden.companyID = contacts[0].companyID;
    form.fields.hidden.contactID = contacts[0].id;
    return form;
  });
};
