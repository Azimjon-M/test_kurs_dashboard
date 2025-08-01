import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Request interceptor: token qo‘shish
axiosInstance.interceptors.request.use((request) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

// Response interceptor: 401 holatda "/not-authorized" ga yo'naltirish
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const is401 = error.response?.status === 401;
        const isLoginPage = window.location.pathname === '/login';

        if (is401 && !isLoginPage) {
            localStorage.clear(); // tokenlarni tozalash (ixtiyoriy)
            window.location.href = '/not-authorized'; // redirect
        }

        return Promise.reject(error); // xatoni qaytaramiz
    }
);

export default axiosInstance;
