import axios from 'axios';

const API_BASE_URL = `https://backend.srv19.info`; 

if (!API_BASE_URL) {
  throw new Error('API_BASE_URL is not defined. Please check your .env file.');
}

const ClientApiInstance = axios.create({
  baseURL: API_BASE_URL,
  // withCredentials: true, 
});

ClientApiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ClientApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Logging out...");
      
      localStorage.removeItem('jwt_token');
      sessionStorage.removeItem('admin_meta');
      
      window.location.href = '/'; 
    }
    return Promise.reject(error);
  }
);

export default ClientApiInstance;