import axios from 'axios';

export default() => {

    const instance = axios.create({baseURL: 'http://localhost:8080/api'});
    return instance;

}