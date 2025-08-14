import { API_CONFIG, getApiHeaders } from '../config/api';
import { FormData } from '../types';

export interface ApiSubmissionData {
  USER_ipv4: string;
  USER_language_preference: 'EN' | 'IT' | 'CN';
  USER_first_name: string;
  USER_last_name: string;
  USER_email: string;
  USER_company_name: string;
  USER_company_vat: string;
  USER_company_fiscal_code: string;
  FROM_country: string;
  FROM_address: string;
  FROM_postalcode: string;
  FROM_date: string;
  TO_country: string;
  TO_address: string;
  TO_postalcode: string;
  TO_date: string;
  TRANSPORT_method: 'LAND' | 'SHIP' | 'PLANE' | 'LOGISTICS';
  TRANSPORT_particular_method: string;
  TRANSPORT_max_height?: number;
  USER_notes: string;
  USER_sendtime: string;
}

export const transformFormDataToApi = (formData: FormData): ApiSubmissionData => {
  return {
    USER_ipv4: formData.ipv4,
    USER_language_preference: formData.language,
    USER_first_name: formData.firstName,
    USER_last_name: formData.lastName,
    USER_email: formData.email,
    USER_company_name: formData.companyName,
    USER_company_vat: formData.companyVat,
    USER_company_fiscal_code: formData.companyFiscalCode,
    FROM_country: formData.fromCountry,
    FROM_address: formData.fromAddress,
    FROM_postalcode: formData.fromPostalCode,
    FROM_date: formData.fromDate,
    TO_country: formData.toCountry,
    TO_address: formData.toAddress,
    TO_postalcode: formData.toPostalCode,
    TO_date: formData.toDate,
    TRANSPORT_method: formData.method,
    TRANSPORT_particular_method: formData.particularMethod,
    TRANSPORT_max_height: formData.maxHeight,
    USER_notes: formData.notes,
    USER_sendtime: formData.sendTime
  };
};

export const submitFreightRequest = async (formData: FormData): Promise<{ success: boolean; message: string; requestId?: string }> => {
  try {
    const apiData = transformFormDataToApi(formData);
    
    console.log('Sending data to API:', apiData);
    
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SUBMIT_FREIGHT_REQUEST}`, {
      method: 'POST',
      headers: getApiHeaders(),
      body: JSON.stringify(apiData),
      signal: AbortSignal.timeout(API_CONFIG.TIMEOUT)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    // Check for success status in API response
    if (result.status === 'success') {
      return {
        success: true,
        message: 'success', // Special flag for success message
        requestId: result.requestId || result.id
      };
    }
    
    return {
      success: false,
      message: result.message || 'Unknown error occurred'
    };
    
  } catch (error) {
    console.error('API submission error:', error);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          success: false,
          message: 'timeout'
        };
      }
      
      return {
        success: false,
        message: 'error'
      };
    }
    
    return {
      success: false,
      message: 'error'
    };
  }
};