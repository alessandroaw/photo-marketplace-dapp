import axios from 'axios';

// const API_URL = 'https://photo-markeplace-service.herokuapp.com/api';
const API_URL = 'http://localhost:3000/api';

export default axios.create({ baseURL: API_URL });
