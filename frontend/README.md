# THL International Freight Forwarding App

## API Configuration

### 🔧 Backend Integration Setup

To connect the app to your Python backend API:

1. **Open the file**: `src/config/api.ts`
2. **Replace the BASE_URL** with your actual domain:

```typescript
export const API_CONFIG = {
  BASE_URL: 'https://your-backend-domain.com', // <-- CHANGE THIS
  ENDPOINTS: {
    SUBMIT_FREIGHT_REQUEST: '/api/freight-request'
  }
};
```

### 📡 API Endpoint Expected

The app will send a POST request to: `{YOUR_DOMAIN}/api/freight-request`

### 📋 JSON Data Format Sent to Backend

```json
{
  "USER_ipv4": "192.168.1.1",
  "USER_language_preference": "EN",
  "USER_first_name": "Mario",
  "USER_last_name": "Rossi",
  "USER_email": "mario.rossi@email.com",
  "USER_company_name": "private",
  "USER_company_vat": "private", 
  "USER_company_fiscal_code": "private",
  "FROM_country": "IT",
  "FROM_address": "Via Roma 123",
  "FROM_postalcode": "20100",
  "FROM_date": "2024-01-15",
  "TO_country": "DE",
  "TO_address": "Hauptstraße 456",
  "TO_postalcode": "10115",
  "TO_date": "2024-01-20",
  "TRANSPORT_method": "LAND",
  "TRANSPORT_particular_method": "FTL",
  "TRANSPORT_max_height": 150,
  "USER_notes": "Fragile goods, handle with care",
  "USER_sendtime": "2024-01-10T14:30:00.000Z"
}
```

### 🔒 Security Features

- Input sanitization on all text fields
- Email validation
- Date validation (future dates only)
- XSS protection
- Request timeout (30 seconds)
- Error handling with user feedback

### 📱 Mobile Ready

- Fully responsive design
- Touch-friendly interface
- Optimized for iOS and Android webviews
- Progressive Web App capabilities

### 🌍 Multi-language Support

- English (EN)
- Italian (IT) 
- Chinese (CN)

### 🚀 Deployment

The app is ready for production deployment and can be easily integrated with native iOS and Android apps through webviews.

---

**IMPORTANTE**: Ricordati di cambiare il dominio API in `src/config/api.ts` prima del deployment!