import axios from 'axios';

const API_URL =
    'http://localhost:3001/api/settings';

export const getSettings =
async () => {

    const response =
        await axios.get(API_URL);

    return response.data;

};

export const updateSettings =
async (settingsData) => {

    const response =
        await axios.put(
            API_URL,
            settingsData
        );

    return response.data;

};