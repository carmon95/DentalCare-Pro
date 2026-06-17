import axios from 'axios';

const API_URL =
    'http://localhost:3001/api/treatments';

export const getTreatments =
async () => {

    const response =
        await axios.get(API_URL);

    return response.data;

};

export const createTreatment =
async (treatment) => {

    const response =
        await axios.post(
            API_URL,
            treatment
        );

    return response.data;

};

export const updateTreatment =
async (
    id,
    treatment
) => {

    const response =
        await axios.put(
            `${API_URL}/${id}`,
            treatment
        );

    return response.data;

};

export const deleteTreatment =
async (id) => {

    const response =
        await axios.delete(
            `${API_URL}/${id}`
        );

    return response.data;

};