import axios from 'axios';

const {
  AUTOTASK_API,
  AUTOTASK_API_TOKEN,
} = process.env;

const createAutotaskTicket = async data => {
  try {
    const response = await axios.post(AUTOTASK_API, data, {
      headers: {
        'Content-Type': 'application/json',
        ApiIntegration: AUTOTASK_API_TOKEN,
      },
    });

    console.log('Autotask API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error calling Autotask API:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default createAutotaskTicket;
