import axios from 'axios';

const apiClubs = axios.create({
    baseURL: 'http://localhost:5000/api/ComLiv/Clubs',
});

export const fetchClubes = () => apiClubs.get('/buscarclub');
