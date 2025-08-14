import React, { useState } from 'react';
import { FileText, Check, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../Button';
import { StepIndicator } from '../StepIndicator';
import { FormData } from '../../types';
import { translations } from '../../data/translations';
import { sanitizeInput } from '../../utils/validation';
import { submitFreightRequest } from '../../services/apiService';

interface FinalNotesProps {
  formData: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const FinalNotes: React.FC<FinalNotesProps> = ({ formData, onUpdate, onSubmit, onBack }) => {
  const [notes, setNotes] = useState(formData.notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const t = translations[formData.language];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    // Set send time and notes
    const sendTime = new Date().toISOString();
    const updatedFormData = {
      ...formData,
      notes: sanitizeInput(notes),
      sendTime 
    };
    
    onUpdate({ 
      notes: sanitizeInput(notes),
      sendTime 
    });

    try {
      // Submit to API
      const result = await submitFreightRequest(updatedFormData);
      
      if (result.success) {
        console.log('✅ Request submitted successfully:', result.requestId);
        setSubmitSuccess(true);
        // Wait 2 seconds to show success message, then proceed
        setTimeout(() => {
          onSubmit();
        }, 2000);
      } else {
        // Handle different error types with localized messages
        const errorMessage = result.message === 'timeout' 
          ? t.apiTimeout 
          : result.message === 'error' 
          ? t.apiError 
          : result.message;
        setSubmitError(errorMessage);
      }
    } catch (error) {
      console.error('❌ Submission failed:', error);
      setSubmitError(t.apiError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNotesChange = (value: string) => {
    if (value.length <= 500) {
      setNotes(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <StepIndicator currentStep={8} totalSteps={8} language={formData.language} />
        
        <div className="text-center mb-8">
          <div className="bg-blue-100 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t.additionalNotes}
          </h2>
          <p className="text-gray-600">
            Provide details about your cargo and shipping requirements
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.additionalNotes}
          </label>
          <textarea
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder={t.notesPlaceholder}
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isSubmitting || submitSuccess}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-500">
              {t.maxCharacters}
            </p>
            <p className={`text-sm ${notes.length > 450 ? 'text-red-500' : 'text-gray-500'}`}>
              {notes.length}/500
            </p>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-700">Transport Method:</p>
              <p className="text-gray-600">{formData.method} - {formData.particularMethod}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Route:</p>
              <p className="text-gray-600">{formData.fromCountry} → {formData.toCountry}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Contact:</p>
              <p className="text-gray-600">{formData.firstName} {formData.lastName}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Company:</p>
              <p className="text-gray-600">{formData.isCompany ? formData.companyName : 'Individual'}</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-800 font-medium">{t.quotationSentSuccessfully}</p>
            </div>
            <p className="text-green-700 mt-1">{t.requestProcessing}</p>
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800 font-medium">Submission Failed</p>
            </div>
            <p className="text-red-700 mt-1">{submitError}</p>
          </div>
        )}

        <div className="flex justify-between">
          <Button onClick={onBack} variant="outline" disabled={isSubmitting}>
            {t.back}
          </Button>
          <Button 
            onClick={handleSubmit} 
            loading={isSubmitting}
            disabled={submitSuccess}
            className="bg-green-600 hover:bg-green-700 focus:ring-green-500"
          >
            {submitSuccess ? (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                {t.quotationSentSuccessfully}
              </>
            ) : isSubmitting ? (
              <>
                Sending to API...
              </>
            ) : (
              <>
                <Check className="w-5 h-5 mr-2" />
                {t.submit}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};