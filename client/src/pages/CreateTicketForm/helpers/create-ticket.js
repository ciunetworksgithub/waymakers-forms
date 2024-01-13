import axios from 'axios';
import { isDev } from '../../../helpers/util';

const API_URL = `${isDev ? 'http://localhost:9000' : ''}/create-ticket.php`;

const createTicket = async data => {
  try {
    // Send form data to the server using Axios
    const response = await axios.post(`${API_URL}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Handle response from the server as needed
    console.log('Server response:', response.data);
  } catch (error) {
    // Handle errors
    console.error(
      'Error submitting form:',
      error.response ? error.response.data : error.message
    );
  }
};

export default createTicket;
