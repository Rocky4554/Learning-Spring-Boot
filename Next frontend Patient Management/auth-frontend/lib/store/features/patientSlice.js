'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINTS, apiCall } from '@/lib/api';
import { getToken } from '@/lib/auth';

// Async thunk to fetch patient details
export const fetchPatient = createAsyncThunk(
    'patient/fetchPatient',
    async (username, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) {
                throw new Error('No authentication token found');
            }

            const result = await apiCall(API_ENDPOINTS.GET_PATIENT_DETAILS(username), {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (result.success) {
                return result.data;
            } else {
                return rejectWithValue(result.error || 'Failed to fetch patient details');
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    user: null, // Stores { username, isAuthenticated, ... }
    data: null, // Stores patient details from API
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.user = null;
            state.data = null;
            state.status = 'idle';
            state.error = null;
        },
        // You can add more reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatient.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchPatient.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchPatient.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { setUser, logoutUser } = patientSlice.actions;

export default patientSlice.reducer;
