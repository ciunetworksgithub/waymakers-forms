export const transformContactsFields = ({ contacts, config }) => {
  if (!contacts?.length) {
    return config;
  }

  if (contacts.length === 1) {
    return config.map(form => {
      form.fields.visible = form.fields.visible.filter(
        ({ name }) => !['companyID', 'contactID'].includes(name)
      );
      form.fields.hidden.companyID = contacts[0].companyID;
      form.fields.hidden.contactID = contacts[0].id;
      return form;
    });
  }

  const companyOptions = buildCompanyOptions({ contacts, form: config[0] });

  if (Object.keys(companyOptions).length === 1) {
    const companyID = Object.values(companyOptions)[0];

    return config.map(form => {
      form.fields.visible = form.fields.visible.filter(
        ({ name }) => !['companyID', 'contactID'].includes(name)
      );
      form.fields.hidden.companyID = companyID;
      form.fields.hidden.contactID = contactIdByCompanyId({
        contacts,
        companyID,
      });
      return form;
    });
  }

  return config;

  // return config.map(form => {
  //   form.fields.visible = form.fields.visible.filter(
  //     ({ name }) => name !== 'contactID'
  //   );
  //   const companyID = form.fields.visible.find(
  //     ({ name }) => name === 'companyID'
  //   );
  //   companyID.options = companyOptions;
  //   companyID.onChange = makeSetContactId({ contacts, form });
  //   return form;
  // });
};

function buildCompanyOptions({ contacts, form }) {
  const companyID = form.fields.visible.find(
    ({ name }) => name === 'companyID'
  );
  const companyIds = contacts.map(({ companyID }) => companyID);
  const options = Object.entries(companyID.options)
    .filter(([k, v]) => companyIds.includes(v))
    .reduce((acc, [k, v]) => ({ [k]: v, ...acc }), {});
  return options;
}

const contactIdByCompanyId = ({ contacts, companyID }) =>
  contacts.find(contact => contact.companyID === companyID).id;

const makeSetContactId =
  ({ contacts, form }) =>
  companyID => {
    debugger;
    form.fields.hidden.contactID = contactIdByCompanyId({
      contacts,
      companyID,
    });
  };
