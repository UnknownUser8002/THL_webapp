import React, { useState } from 'react';
import { Plane } from 'lucide-react';
import { InputField } from '../InputField';
import { Button } from '../Button';
import { StepIndicator } from '../StepIndicator';
import { FormData } from '../../types';
import { translations } from '../../data/translations';

interface PlaneTransportProps {
  formData: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PlaneTransport: React.FC<PlaneTransportProps> = ({ formData, onUpdate, onNext, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState(formData.particularMethod || '');
  const [maxHeight, setMaxHeight] = useState(formData.maxHeight?.toString() || '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const t = translations[formData.language];

  const height = parseInt(maxHeight) || 0;
  const canSelectPAX = height < 160;

  const planeOptions = [
    { value: 'CARGO', label: t.cargo, description: 'Dedicated air cargo service', available: true },
    { value: 'PAX', label: t.pax, description: 'Passenger aircraft cargo space', available: canSelectPAX },
    { value: 'Other', label: t.other, description: 'Special air freight requirements', available: true }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!maxHeight || height <= 0) {
      newErrors.maxHeight = t.required;
    }

    if (!selectedMethod) {
      newErrors.method = t.required;
    }

    if (selectedMethod === 'PAX' && height >= 160) {
      newErrors.method = t.heightTooHigh;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onUpdate({ 
        particularMethod: selectedMethod,
        maxHeight: height
      });
      onNext();
    }
  };

  const handleHeightChange = (value: string) => {
    const numValue = value.replace(/\D/g, '');
    setMaxHeight(numValue);
    onUpdate({ maxHeight: parseInt(numValue) || 0 });
    
    // Reset PAX selection if height becomes too high
    if (parseInt(numValue) >= 160 && selectedMethod === 'PAX') {
      setSelectedMethod('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <StepIndicator currentStep={5} totalSteps={8} language={formData.language} />
        
        <div className="text-center mb-8">
          <div className="bg-orange-100 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
            <Plane className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t.byPlane}
          </h2>
          <p className="text-gray-600">
            Select your air freight option
          </p>
        </div>

        <div className="mb-6">
          <InputField
            label={t.maxHeight}
            type="number"
            value={maxHeight}
            onChange={handleHeightChange}
            required
            error={errors.maxHeight}
            placeholder="Enter height in centimeters"
          />
          {height >= 160 && (
            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ PAX option is not available for cargo with height ≥ 160cm
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4 mb-8">
          {planeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => option.available ? setSelectedMethod(option.value) : null}
              disabled={!option.available}
              className={`w-full p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                !option.available
                  ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                  : selectedMethod === option.value
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{option.label}</h3>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  {!option.available && (
                    <p className="text-xs text-red-500 mt-1">Not available for current height</p>
                  )}
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedMethod === option.value
                    ? 'border-orange-500 bg-orange-500'
                    : 'border-gray-300'
                }`} />
              </div>
            </button>
          ))}
        </div>

        {errors.method && (
          <p className="text-red-600 text-sm mb-4">{errors.method}</p>
        )}

        <div className="flex justify-between">
          <Button onClick={onBack} variant="outline">
            {t.back}
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedMethod || !maxHeight}>
            {t.next}
          </Button>
        </div>
      </div>
    </div>
  );
};