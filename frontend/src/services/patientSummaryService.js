import axios from 'axios';

const API_URL =
    'http://localhost:3001/api/patient-summary';

export const getPatientSummary = async (id) => {

    const response =
        await axios.get(

            `${API_URL}/${id}`

        );

    return response.data;

};