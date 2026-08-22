import api from './api';

export const getReports = async ({ from, to }) => {
    const response = await api.get('/reports', {
        params: { from, to }
    });

    return response.data;
};
