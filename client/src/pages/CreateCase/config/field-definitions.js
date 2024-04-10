import * as Yup from 'yup';

import { getContactsByCompanyId } from '../helpers';

const config = {
  contactID: {
    options: {},
    optionsApi: getContactsByCompanyId,
    listensTo: 'companyID',
    schema: Yup.string().required('Required'),
    type: 'autosuggest',
  },
  contactName: {
    schema: Yup.string().required('Required'),
    type: 'text',
  },
  contactPhone: {
    schema: Yup.string().required('Required'),
    type: 'text',
  },
  companyID: {
    schema: Yup.string().required('Required'),
    type: 'select',
  },
  description: {
    schema: Yup.string().required('Required'),
    type: 'textarea',
  },
  deviceName: {
    helpComponent: 'DeviceNameHowTo',
    schema: Yup.string().required('Required'),
    type: 'text',
  },
  supervisorEmail: {
    type: 'email',
  },
  title: {
    schema: Yup.string().required('Required'),
    type: 'text',
  },
};

export default config;
