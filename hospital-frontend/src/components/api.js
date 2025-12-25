import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Patient APIs
export const getPatients = () => api.get('/patients/');
export const createPatient = (data) => api.post('/patients/', data);
export const deletePatient = (id) => api.delete(`/patients/${id}/`);

// Medical History APIs
export const getMedicalHistory = () => api.get('/medical-history/');
export const createMedicalHistory = (data) => api.post('/medical-history/', data);

// Appointment APIs
export const getAppointments = () => api.get('/appointments/');
export const createAppointment = (data) => api.post('/appointments/', data);

// Billing APIs
export const getBilling = () => api.get('/billing/');
export const createBilling = (data) => api.post('/billing/', data);

// Admin APIs
export const getAdministrators = () => api.get('/administrators/');
export const createAdministrator = (data) => api.post('/administrators/', data);

// Facility APIs
export const getFacilities = () => api.get('/facilities/');
export const createFacility = (data) => api.post('/facilities/', data);

// Doctor APIs
export const getDoctors = () => api.get('/doctors/');
export const createDoctor = (data) => api.post('/doctors/', data);