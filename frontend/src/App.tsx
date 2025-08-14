import React, { useEffect } from 'react';
import { useFormData } from './hooks/useFormData';
import { Step } from './types';

// Step Components
import { SplashScreen } from './components/steps/SplashScreen';
import { LanguageSelection } from './components/steps/LanguageSelection';
import { UserInfo } from './components/steps/UserInfo';
import { ShippingInfo } from './components/steps/ShippingInfo';
import { TransportMethod } from './components/steps/TransportMethod';
import { LandTransport } from './components/steps/LandTransport';
import { ShipTransport } from './components/steps/ShipTransport';
import { PlaneTransport } from './components/steps/PlaneTransport';
import { FinalNotes } from './components/steps/FinalNotes';
import { SuccessPage } from './components/steps/SuccessPage';

function App() {
  const { formData, currentStep, updateFormData, nextStep, resetForm } = useFormData();

  // Update document title based on current step
  useEffect(() => {
    const titles: Record<Step, string> = {
      splash: 'THL International - Loading',
      language: 'THL International - Select Language',
      'user-info': 'THL International - Personal Information',
      shipping: 'THL International - Shipping Details',
      transport: 'THL International - Transport Method',
      land: 'THL International - Land Transport',
      ship: 'THL International - Ship Transport',
      plane: 'THL International - Air Transport',
      logistics: 'THL International - Logistics',
      notes: 'THL International - Final Details'
    };

    document.title = titles[currentStep] || 'THL International - Freight Forwarding';
  }, [currentStep]);

  const handleSplashComplete = (ip: string) => {
    updateFormData({ ipv4: ip });
    nextStep('language');
  };

  const handleLanguageSelect = (language: 'EN' | 'IT' | 'CN') => {
    updateFormData({ language });
    nextStep('user-info');
  };

  const handleTransportMethodSelect = (method: 'LAND' | 'SHIP' | 'PLANE' | 'LOGISTICS') => {
    const stepMap: Record<typeof method, Step> = {
      LAND: 'land',
      SHIP: 'ship',
      PLANE: 'plane',
      LOGISTICS: 'notes'
    };

    if (method === 'LOGISTICS') {
      updateFormData({ particularMethod: 'Other' });
    }

    nextStep(stepMap[method]);
  };

  const handleStepBack = () => {
    const backSteps: Record<Step, Step> = {
      language: 'splash',
      'user-info': 'language',
      shipping: 'user-info',
      transport: 'shipping',
      land: 'transport',
      ship: 'transport',
      plane: 'transport',
      logistics: 'transport',
      notes: formData.method === 'LOGISTICS' ? 'transport' : 
             formData.method === 'LAND' ? 'land' :
             formData.method === 'SHIP' ? 'ship' : 'plane',
      splash: 'splash'
    };

    nextStep(backSteps[currentStep]);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      
      case 'language':
        return <LanguageSelection onLanguageSelect={handleLanguageSelect} />;
      
      case 'user-info':
        return (
          <UserInfo
            formData={formData}
            onUpdate={updateFormData}
            onNext={() => nextStep('shipping')}
            onBack={handleStepBack}
          />
        );
      
      case 'shipping':
        return (
          <ShippingInfo
            formData={formData}
            onUpdate={updateFormData}
            onNext={() => nextStep('transport')}
            onBack={handleStepBack}
          />
        );
      
      case 'transport':
        return (
          <TransportMethod
            formData={formData}
            onUpdate={updateFormData}
            onNext={handleTransportMethodSelect}
            onBack={handleStepBack}
          />
        );
      
      case 'land':
        return (
          <LandTransport
            formData={formData}
            onUpdate={updateFormData}
            onNext={() => nextStep('notes')}
            onBack={handleStepBack}
          />
        );
      
      case 'ship':
        return (
          <ShipTransport
            formData={formData}
            onUpdate={updateFormData}
            onNext={() => nextStep('notes')}
            onBack={handleStepBack}
          />
        );
      
      case 'plane':
        return (
          <PlaneTransport
            formData={formData}
            onUpdate={updateFormData}
            onNext={() => nextStep('notes')}
            onBack={handleStepBack}
          />
        );
      
      case 'notes':
        return (
          <FinalNotes
            formData={formData}
            onUpdate={updateFormData}
            onSubmit={() => nextStep('splash')} // Navigate to success page
            onBack={handleStepBack}
          />
        );
      
      default:
        return <SuccessPage formData={formData} onReset={resetForm} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentStep()}
    </div>
  );
}

export default App;