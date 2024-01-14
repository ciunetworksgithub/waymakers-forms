import axios from 'axios';
import { isDev } from '../../../helpers/util';

const API_URL = `${isDev ? 'http://localhost:9000' : ''}/create-ticket.php`;
const headers = {
  'Content-Type': 'application/json',
};

export const createTicket = async attrs => {
  try {
    const { data } = await axios.post(`${API_URL}`, attrs, { headers });
    return data;
  } catch (error) {
    const out = error.response ? error.response.data : error.message;
    console.error('Error submitting form:', out);
    return out;
  }
};

