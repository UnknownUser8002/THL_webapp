import React from 'react';
import { translations } from '../data/translations';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  language: 'EN' | 'IT' | 'CN';
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, language }) => {
  const t = translations[language];
  
  return (
    <div className="flex items-center justify-center space-x-2 mb-6">
      <span className="text-sm text-gray-600">
        {t.step} {currentStep} {t.of} {totalSteps}
      </span>
      <div className="flex space-x-1">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              i < currentStep ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};