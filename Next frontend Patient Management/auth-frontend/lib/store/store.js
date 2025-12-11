import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './features/patientSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            patient: patientReducer,
        },
    });
};
