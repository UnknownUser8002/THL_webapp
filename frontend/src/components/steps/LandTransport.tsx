import React, { useState } from 'react';
import { Truck } from 'lucide-react';
import { Button } from '../Button';
import { StepIndicator } from '../StepIndicator';
import { FormData } from '../../types';
import { translations } from '../../data/translations';

interface LandTransportProps {
  formData: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const LandTransport: React.FC<LandTransportProps> = ({ formData, onUpdate, onNext, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState(formData.particularMethod || '');
  const t = translations[formData.language];

  const landOptions = [
    { value: 'FTL', label: t.ftl, description: 'Dedicated truck for your cargo' },
    { value: 'LTL', label: t.ltl, description: 'Shared truck space for smaller loads' },
    { value: 'Express/Other', label: t.express, description: 'Fast delivery or special requirements' }
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
          <div className="bg-green-100 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
            <Truck className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t.byLand}
          </h2>
          <p className="text-gray-600">
            Select your land transport option
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {landOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedMethod(option.value)}
              className={`w-full p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                selectedMethod === option.value
                  ? 'border-green-500 bg-green-50'
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
                    ? 'border-green-500 bg-green-500'
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