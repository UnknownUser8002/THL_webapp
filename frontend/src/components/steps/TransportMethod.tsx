import React from 'react';
import { Truck, Ship, Plane, Package } from 'lucide-react';
import { Button } from '../Button';
import { StepIndicator } from '../StepIndicator';
import { FormData } from '../../types';
import { translations } from '../../data/translations';

interface TransportMethodProps {
  formData: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: (method: 'LAND' | 'SHIP' | 'PLANE' | 'LOGISTICS') => void;
  onBack: () => void;
}

export const TransportMethod: React.FC<TransportMethodProps> = ({ formData, onUpdate, onNext, onBack }) => {
  const t = translations[formData.language];

  const transportOptions = [
    {
      method: 'LAND' as const,
      label: t.byLand,
      icon: Truck,
      description: 'Road transport for domestic and international routes',
      color: 'bg-green-100 text-green-600'
    },
    {
      method: 'SHIP' as const,
      label: t.byShip,
      icon: Ship,
      description: 'Ocean freight for international shipping',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      method: 'PLANE' as const,
      label: t.byPlane,
      icon: Plane,
      description: 'Air cargo for fast international delivery',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      method: 'LOGISTICS' as const,
      label: t.logistics,
      icon: Package,
      description: 'Comprehensive logistics solutions',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const handleMethodSelect = (method: 'LAND' | 'SHIP' | 'PLANE' | 'LOGISTICS') => {
    onUpdate({ method });
    onNext(method);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full">
        <StepIndicator currentStep={4} totalSteps={8} language={formData.language} />
        
        <div className="text-center mb-8">
          <div className="bg-blue-100 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
            <Truck className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t.transportMethod}
          </h2>
          <p className="text-gray-600">
            {t.selectTransport}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {transportOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.method}
                onClick={() => handleMethodSelect(option.method)}
                className="p-6 border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${option.color} group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {option.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between">
          <Button onClick={onBack} variant="outline">
            {t.back}
          </Button>
        </div>
      </div>
    </div>
  );
};