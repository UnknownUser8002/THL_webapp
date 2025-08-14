import React, { useState } from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { InputField } from '../InputField';
import { SelectField } from '../SelectField';
import { Button } from '../Button';
import { StepIndicator } from '../StepIndicator';
import { FormData } from '../../types';
import { translations } from '../../data/translations';
import { countries } from '../../data/countries';
import { sanitizeInput, validateDate, validateDateOrder, getTodayDate } from '../../utils/validation';

interface ShippingInfoProps {
  formData: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ShippingInfo: React.FC<ShippingInfoProps> = ({ formData, onUpdate, onNext, onBack }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [otherFromCountry, setOtherFromCountry] = useState('');
  const [otherToCountry, setOtherToCountry] = useState('');
  const t = translations[formData.language];

  const countryOptions = countries.map(country => ({
    value: country.code,
    label: country.name[formData.language]
  }));

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // From fields
    if (!formData.fromCountry) {
      newErrors.fromCountry = t.required;
    }
    if (formData.fromCountry === 'OTHER' && !otherFromCountry.trim()) {
      newErrors.fromCountry = t.required;
    }
    if (!formData.fromAddress.trim()) {
      newErrors.fromAddress = t.required;
    }
    if (!formData.fromPostalCode.trim()) {
      newErrors.fromPostalCode = t.required;
    }

    // To fields
    if (!formData.toCountry) {
      newErrors.toCountry = t.required;
    }
    if (formData.toCountry === 'OTHER' && !otherToCountry.trim()) {
      newErrors.toCountry = t.required;
    }
    if (!formData.toAddress.trim()) {
      newErrors.toAddress = t.required;
    }
    if (!formData.toPostalCode.trim()) {
      newErrors.toPostalCode = t.required;
    }

    // Date validation
    if (!formData.fromDate && !formData.toDate) {
      newErrors.fromDate = t.atLeastOneDate;
      newErrors.toDate = t.atLeastOneDate;
    }

    if (formData.fromDate && !validateDate(formData.fromDate)) {
      newErrors.fromDate = t.dateInPast;
    }
    if (formData.toDate && !validateDate(formData.toDate)) {
      newErrors.toDate = t.dateInPast;
    }

    if (formData.fromDate && formData.toDate && !validateDateOrder(formData.fromDate, formData.toDate)) {
      newErrors.toDate = t.deliveryBeforePickup;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    // Update other country values if selected
    const updates: Partial<FormData> = {};
    if (formData.fromCountry === 'OTHER') {
      updates.fromCountry = otherFromCountry;
    }
    if (formData.toCountry === 'OTHER') {
      updates.toCountry = otherToCountry;
    }
    
    // Set default date messages
    if (!formData.fromDate && formData.toDate) {
      updates.fromDate = 'only TO date';
    }
    if (!formData.toDate && formData.fromDate) {
      updates.toDate = 'only FROM date';
    }

    onUpdate(updates);

    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full">
        <StepIndicator currentStep={3} totalSteps={8} language={formData.language} />
        
        <div className="text-center mb-8">
          <div className="bg-blue-100 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t.shippingDetails}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FROM Section */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              {t.pickupInfo}
            </h3>
            
            <SelectField
              label={t.country}
              value={formData.fromCountry}
              onChange={(value) => onUpdate({ fromCountry: value })}
              options={countryOptions}
              required
              error={errors.fromCountry}
              placeholder={t.selectCountry}
              searchable
            />

            {formData.fromCountry === 'OTHER' && (
              <InputField
                label="Specify country"
                value={otherFromCountry}
                onChange={setOtherFromCountry}
                required
                error={errors.fromCountry}
              />
            )}

            <InputField
              label={t.address}
              value={formData.fromAddress}
              onChange={(value) => onUpdate({ fromAddress: sanitizeInput(value) })}
              required
              error={errors.fromAddress}
            />

            <InputField
              label={t.postalCode}
              value={formData.fromPostalCode}
              onChange={(value) => onUpdate({ fromPostalCode: sanitizeInput(value) })}
              required
              error={errors.fromPostalCode}
            />

            <InputField
              label={t.fromDate}
              type="date"
              value={formData.fromDate}
              onChange={(value) => onUpdate({ fromDate: value })}
              error={errors.fromDate}
              placeholder={getTodayDate()}
            />
          </div>

          {/* TO Section */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              {t.deliveryInfo}
            </h3>
            
            <SelectField
              label={t.country}
              value={formData.toCountry}
              onChange={(value) => onUpdate({ toCountry: value })}
              options={countryOptions}
              required
              error={errors.toCountry}
              placeholder={t.selectCountry}
              searchable
            />

            {formData.toCountry === 'OTHER' && (
              <InputField
                label="Specify country"
                value={otherToCountry}
                onChange={setOtherToCountry}
                required
                error={errors.toCountry}
              />
            )}

            <InputField
              label={t.address}
              value={formData.toAddress}
              onChange={(value) => onUpdate({ toAddress: sanitizeInput(value) })}
              required
              error={errors.toAddress}
            />

            <InputField
              label={t.postalCode}
              value={formData.toPostalCode}
              onChange={(value) => onUpdate({ toPostalCode: sanitizeInput(value) })}
              required
              error={errors.toPostalCode}
            />

            <InputField
              label={t.toDate}
              type="date"
              value={formData.toDate}
              onChange={(value) => onUpdate({ toDate: value })}
              error={errors.toDate}
              placeholder={getTodayDate()}
            />
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button onClick={onBack} variant="outline">
            {t.back}
          </Button>
          <Button onClick={handleSubmit}>
            {t.next}
          </Button>
        </div>
      </div>
    </div>
  );
};