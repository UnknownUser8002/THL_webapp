export interface UserData {
  ipv4: string;
  language: 'EN' | 'IT' | 'CN';
  firstName: string;
  lastName: string;
  email: string;
  isCompany: boolean;
  companyName: string;
  companyVat: string;
  companyFiscalCode: string;
}

export interface ShippingData {
  fromCountry: string;
  fromAddress: string;
  fromPostalCode: string;
  fromDate: string;
  toCountry: string;
  toAddress: string;
  toPostalCode: string;
  toDate: string;
}

export interface TransportData {
  method: 'LAND' | 'SHIP' | 'PLANE' | 'LOGISTICS';
  particularMethod: string;
  maxHeight?: number;
}

export interface FormData extends UserData, ShippingData, TransportData {
  notes: string;
  sendTime: string;
}

export interface Country {
  code: string;
  name: {
    EN: string;
    IT: string;
    CN: string;
  };
}

export type Step = 'splash' | 'language' | 'user-info' | 'shipping' | 'transport' | 'land' | 'ship' | 'plane' | 'logistics' | 'notes';