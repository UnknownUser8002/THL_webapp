import { useState, useCallback } from 'react';
import { FormData, Step } from '../types';

const initialFormData: FormData = {
  ipv4: '',
  language: 'EN',
  firstName: '',
  lastName: '',
  email: '',
  isCompany: false,
  companyName: 'private',
  companyVat: 'private',
  companyFiscalCode: 'private',
  fromCountry: '',
  fromAddress: '',
  fromPostalCode: '',
  fromDate: '',
  toCountry: '',
  toAddress: '',
  toPostalCode: '',
  toDate: '',
  method: 'LAND',
  particularMethod: '',
  maxHeight: 0,
  notes: '',
  sendTime: ''
};

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState<Step>('splash');

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const nextStep = useCallback((step: Step) => {
    setCurrentStep(step);
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep('splash');
  }, []);

  return {
    formData,
    currentStep,
    updateFormData,
    nextStep,
    resetForm
  };
};