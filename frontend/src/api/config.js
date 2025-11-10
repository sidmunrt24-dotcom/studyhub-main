// src/api/config.js
// Centralized API configuration

export const API_BASE_URL = process.env.REACT_APP_API_URL?.replace(/\/+$/, '') || 
  'https://studyhub-21ux.onrender.com';

export const API_ENDPOINTS = {
  notes: `${API_BASE_URL}/api/notes`,
  timetable: `${API_BASE_URL}/api/timetable`,
  doubts: `${API_BASE_URL}/api/doubts`,
  courses: `${API_BASE_URL}/api/courses`
};

console.log('🌍 Using API Base URL:', API_BASE_URL);