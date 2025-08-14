// API Configuration
// CHANGE THIS TO YOUR BACKEND DOMAIN
export const API_CONFIG = {
  BASE_URL: 'https://dtrut.pythonanywhere.com', // <-- INSERISCI QUI IL TUO DOMINIO API
  ENDPOINTS: {
    SUBMIT_FREIGHT_REQUEST: '/api/freight-request'
  },
  TIMEOUT: 30000 // 30 seconds timeout
};

// API Headers
export const getApiHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  // Add any authentication headers here if needed
  // 'Authorization': `Bearer ${token}`,
});