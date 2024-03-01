import axios from 'axios';
import { isDev } from '../../../lib/util';

const BASE_URL = `${isDev ? 'http://localhost:9000' : ''}`;
const headers = {
  'Content-Type': 'application/json',
};
const api = axios.create({ baseURL: BASE_URL, headers });

export const createAttachment = async ({
  contactId: attachedByContactID,
  data: fileData,
  name: title,
  size: fileSize,
  ticketId: ticketID,
  type: contentType,
}) => {
  try {
    const { data } = await api.post(
      `/create-attachment.php?ticket_id=${ticketID}`,
      {
        attachedByContactID,
        attachmentType: 'FILE_ATTACHMENT',
        contentType,
        fileSize,
        fullPath: title,
        publish: 1,
        ticketID,
        title,
        data: fileData,
      }
    );
    return data;
  } catch (error) {
    const out = error.response ? error.response.data : error.message;
    console.error('API Error > createTicket:', out);
    throw out;
  }
};

export const createTicket = async attrs => {
  try {
    const { data } = await api.post(`/create-ticket.php`, attrs);
    return data;
  } catch (error) {
    const out = error.response ? error.response.data : error.message;
    console.error('API Error > createTicket:', out);
    return out;
  }
};

export const getContacts = async companyId => {
  try {
    const { data } = await api.get(`/get-contacts.php?company_id=${companyId}`);
    return data
      ? data.reduce((acc, cur) => ({ [cur.emailAddress]: cur.id, ...acc }), {})
      : {};
  } catch (error) {
    const out = error.response ? error.response.data : error.message;
    console.error('API Error > getContacts:', out);
    return out;
  }
};

export const getTicket = async id => {
  try {
    const { data } = await api.get(`/get-ticket.php?id=${id}`);
    return data?.item || {};
  } catch (error) {
    const out = error.response ? error.response.data : error.message;
    console.error('API Error > getTicket:', out);
    return out;
  }
};
