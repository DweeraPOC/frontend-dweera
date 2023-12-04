import axios from 'axios';

export const SendMessage = async (data) => {
  try {
    const response = await axios.post(process.env.REACT_APP_MAIN_URL+"/Contact-Us", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};