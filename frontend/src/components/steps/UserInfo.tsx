import React, { useState } from 'react';
import { User, Building2 } from 'lucide-react';
import { InputField } from '../InputField';
import { Button } from '../Button';
import { StepIndicator } from '../StepIndicator';
import { FormData } from '../../types';
import { translations } from '../../data/translations';
import { validateEmail, sanitizeInput } from '../../utils/validation';

interface UserInfoProps {
  formData: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const UserInfo: React.FC<UserInfoProps> = ({ formData, onUpdate, onNext, onBack }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const t = translations[formData.language];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t.required;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t.required;
    }
    if (!formData.email.trim()) {
      newErrors.email = t.required;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.invalidEmail;
    }

    if (formData.isCompany) {
      if (!formData.companyName.trim() || formData.companyName === 'private') {
        newErrors.companyName = t.required;
      }
      if (!formData.companyVat.trim() || formData.companyVat === 'private') {
        newErrors.companyVat = t.required;
      }
      if (!formData.companyFiscalCode.trim() || formData.companyFiscalCode === 'private') {
        newErrors.companyFiscalCode = t.required;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Update company fields if not a company
      if (!formData.isCompany) {
        onUpdate({
          companyName: 'private',
          companyVat: 'private',
          companyFiscalCode: 'private'
        });
      }
      onNext();
    }
  };

  const handleAccountTypeChange = (isCompany: boolean) => {
    onUpdate({
      isCompany,
      companyName: isCompany ? '' : 'private',
      companyVat: isCompany ? '' : 'private',
      companyFiscalCode: isCompany ? '' : 'private'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <StepIndicator currentStep={2} totalSteps={8} language={formData.language} />
        
        <div className="text-center mb-8">
          <div className="bg-blue-100 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t.personalInfo}
          </h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label={t.firstName}
              value={formData.firstName}
              onChange={(value) => onUpdate({ firstName: sanitizeInput(value) })}
              required
              error={errors.firstName}
            />
            <InputField
              label={t.lastName}
              value={formData.lastName}
              onChange={(value) => onUpdate({ lastName: sanitizeInput(value) })}
              required
              error={errors.lastName}
            />
          </div>

          <InputField
            label={t.email}
            type="email"
            value={formData.email}
            onChange={(value) => onUpdate({ email: sanitizeInput(value) })}
            required
            error={errors.email}
          />

          {/* Account Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t.accountType} <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleAccountTypeChange(false)}
                className={`p-4 border-2 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                  !formData.isCompany
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <User className="w-5 h-5 text-gray-600" />
                <span className="font-medium">{t.individual}</span>
              </button>
              <button
                type="button"
                onClick={() => handleAccountTypeChange(true)}
                className={`p-4 border-2 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                  formData.isCompany
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Building2 className="w-5 h-5 text-gray-600" />
                <span className="font-medium">{t.company}</span>
              </button>
            </div>
          </div>

          {/* Company Fields */}
          {formData.isCompany && (
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <InputField
                label={t.companyName}
                value={formData.companyName === 'private' ? '' : formData.companyName}
                onChange={(value) => onUpdate({ companyName: sanitizeInput(value) })}
                required
                error={errors.companyName}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label={t.vatNumber}
                  value={formData.companyVat === 'private' ? '' : formData.companyVat}
                  onChange={(value) => onUpdate({ companyVat: sanitizeInput(value) })}
                  required
                  error={errors.companyVat}
                />
                <InputField
                  label={t.fiscalCode}
                  value={formData.companyFiscalCode === 'private' ? '' : formData.companyFiscalCode}
                  onChange={(value) => onUpdate({ companyFiscalCode: sanitizeInput(value) })}
                  required
                  error={errors.companyFiscalCode}
                />
              </div>
            </div>
          )}
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