import axios from 'axios';
import { isDev } from '../../../lib/util';

const BASE_URL = `${isDev ? 'http://localhost:9000' : ''}`;
const headers = {
  'Content-Type': 'application/json',
};
const api = axios.create({ baseURL: BASE_URL, headers });

export const createTicket = async attrs => {
  try {
    console.log(`[JMG] attrs`, attrs);
    // const { data } = await api.post(`/create-ticket.php`, attrs);
    // return data;
    return {};
  } catch (error) {
    const out = error.response ? error.response.data : error.message;
    console.error('API Error > createTicket:', out);
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
