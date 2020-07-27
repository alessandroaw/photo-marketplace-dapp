import axios from 'axios';

const API_URL = 'https://photo-markeplace-service.herokuapp.com/api';

export default axios.create({ baseURL: API_URL });
