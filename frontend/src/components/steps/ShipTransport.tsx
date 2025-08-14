import React, { useState } from 'react';
import { Ship } from 'lucide-react';
import { Button } from '../Button';
import { StepIndicator } from '../StepIndicator';
import { FormData } from '../../types';
import { translations } from '../../data/translations';

interface ShipTransportProps {
  formData: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ShipTransport: React.FC<ShipTransportProps> = ({ formData, onUpdate, onNext, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState(formData.particularMethod || '');
  const t = translations[formData.language];

  const shipOptions = [
    { value: 'FCL', label: t.fcl, description: 'Full container exclusively for your cargo' },
    { value: 'LCL', label: t.lcl, description: 'Shared container space for smaller shipments' },
    { value: 'Other', label: t.other, description: 'Special ocean freight requirements' }
  ];

  const handleSubmit = () => {
    if (selectedMethod) {
      onUpdate({ particularMethod: selectedMethod });
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <StepIndicator currentStep={5} totalSteps={8} language={formData.language} />
        
        <div className="text-center mb-8">
          <div className="bg-blue-100 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
            <Ship className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t.byShip}
          </h2>
          <p className="text-gray-600">
            Select your ocean freight option
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {shipOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedMethod(option.value)}
              className={`w-full p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                selectedMethod === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{option.label}</h3>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedMethod === option.value
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`} />
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <Button onClick={onBack} variant="outline">
            {t.back}
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedMethod}>
            {t.next}
          </Button>
        </div>
      </div>
    </div>
  );
};