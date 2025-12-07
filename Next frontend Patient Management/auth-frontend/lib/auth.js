import { API_ENDPOINTS, apiCall } from './api';

// Storage keys
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

// Authentication functions
export async function login(username, password) {
    const result = await apiCall(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });

    if (result.success) {
        // Store token and user info
        localStorage.setItem(TOKEN_KEY, result.data.jwt);
        localStorage.setItem(USER_KEY, JSON.stringify({
            userId: result.data.userId,
            username: result.data.username,
        }));
    }

    return result;
}

export async function signup(username, password) {
    const result = await apiCall(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });

    if (result.success) {
        // Store token and user info
        localStorage.setItem(TOKEN_KEY, result.data.jwt);
        localStorage.setItem(USER_KEY, JSON.stringify({
            userId: result.data.userId,
            username: result.data.username,
        }));
    }

    return result;
}

export function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

export function getToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
}

export function isAuthenticated() {
    return !!getToken();
}
