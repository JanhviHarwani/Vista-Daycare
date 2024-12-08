import axios, { AxiosHeaders } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // This references your .env value
});

// Add a request interceptor to include Authorization headers
axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // Fetch token from localStorage
      if (token) {
        if (!config.headers) {
          config.headers = new AxiosHeaders(); // Ensure headers is not undefined
        }
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

export default axiosInstance;
