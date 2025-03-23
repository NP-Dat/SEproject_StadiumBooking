import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // Ensure React environment variable prefix
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: Attach Authorization token if it exists
axiosInstance.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            if (token) {
                config.headers.Authorization = `Bearer ${token}`; // Add Authorization header
            }
            return config;
        } catch (error) {
            console.error('Error attaching token:', error);
            return config; // Continue even if token retrieval fails
        }
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error); // Reject the request with error
    }
);

// Response interceptor: Handle errors globally
axiosInstance.interceptors.response.use(
    (response) => response, // Return the response directly if successful
    (error) => {
        if (error.response) {
            const { status } = error.response;

            if (status === 401) {
                console.error('Unauthorized. Redirecting to login...');
                // Example: Redirect to login (if applicable in your setup)
                window.location.href = '/login';
            } else if (status === 403) {
                console.error('Forbidden access.');
            } else if (status === 500) {
                console.error('Server error. Please try again later.');
            }
        } else {
            console.error('Network or unexpected error:', error.message);
        }

        return Promise.reject(error); // Reject the response with error
    }
);

export default axiosInstance;
