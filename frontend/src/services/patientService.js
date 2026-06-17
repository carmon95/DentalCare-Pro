import axios from 'axios';

const API_URL =
'http://localhost:3001/api/patients';

export const getPatients = async () => {

    const response =
        await axios.get(API_URL);

    return response.data;

};

export const createPatient = async (
    patient
) => {

    const response =
        await axios.post(
            API_URL,
            patient
        );

    return response.data;

};

export const deletePatient = async (
    id
) => {

    const response =
        await axios.delete(
            `${API_URL}/${id}`
        );

    return response.data;

};

export const updatePatient = async (
    id,
    patient
) => {

    const response =
        await axios.put(
            `${API_URL}/${id}`,
            patient
        );

    return response.data;

};