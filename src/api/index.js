import axios from 'axios';

export default {
    create(payload) {
        return axios.post('pic/new', payload);
    },
    loadAll() {
        return axios.get('pic/all');
    }
}
