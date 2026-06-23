import axios from 'axios';

const API_URL =
    'http://localhost:3001/api/clinical-histories';

/*
|--------------------------------------------------------------------------
| Obtener historiales clínicos
|--------------------------------------------------------------------------
*/

export const getClinicalHistories =
async () => {

    const response =
        await axios.get(API_URL);

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Crear historial clínico
|--------------------------------------------------------------------------
*/

export const createClinicalHistory =
async (history) => {

    const response =
        await axios.post(
            API_URL,
            history
        );

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Actualizar historial clínico
|--------------------------------------------------------------------------
*/

export const updateClinicalHistory =
async (
    id,
    history
) => {

    const response =
        await axios.put(
            `${API_URL}/${id}`,
            history
        );

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Eliminar historial clínico
|--------------------------------------------------------------------------
*/

export const deleteClinicalHistory =
async (id) => {

    const response =
        await axios.delete(
            `${API_URL}/${id}`
        );

    return response.data;

};