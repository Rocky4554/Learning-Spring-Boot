// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    CREATE_PATIENT: `${API_BASE_URL}/api/patient`,
    GET_PATIENT_DETAILS: (id) => `${API_BASE_URL}/api/patient/${id}`,
};

// API client with error handling
export async function apiCall(endpoint, options = {}) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        };

        const config = {
            ...options,
            headers,
        };

        console.log(`Making API call to: ${endpoint}`, config);

        const response = await fetch(endpoint, config);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
