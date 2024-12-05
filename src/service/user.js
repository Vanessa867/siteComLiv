import axios from 'axios';

const apiUsers = axios.create({
    baseURL: 'http://localhost:5000/api/ComLiv/users',
});

export const fetchUsers = () => apiUsers.get('/buscarUsuarios');
