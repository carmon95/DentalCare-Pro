import axios from 'axios';

const API_URL =
'http://localhost:3001/api/dashboard';

export const getDashboard = async () => {

    const response =
        await axios.get(API_URL);

    return response.data;

};