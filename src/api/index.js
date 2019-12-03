import axios from 'axios';

export default {
    create(payload) {
        return axios.post('http://127.0.0.1:4000/pic/new', payload);
    },
    loadAll() {
        return axios.get('http://127.0.0.1:4000/pic/all');
    }
}
