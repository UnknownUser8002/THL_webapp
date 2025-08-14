import React from 'react';
import { CheckCircle, Mail, Phone, Server } from 'lucide-react';
import { Button } from '../Button';
import { FormData } from '../../types';
import { translations } from '../../data/translations';

interface SuccessPageProps {
  formData: FormData;
  onReset: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ formData, onReset }) => {
  const t = translations[formData.language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="bg-green-100 rounded-full p-6 mx-auto w-20 h-20 flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Request Submitted Successfully!
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Thank you for choosing THL International. Your freight forwarding request has been sent to our backend API and is being processed.
          </p>
        </div>

        {/* API Confirmation */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Server className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">API Integration Active</p>
          </div>
          <p className="text-green-700 text-sm">
            All form data has been successfully transmitted to the backend API in JSON format according to your specifications.
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What happens next?</h2>
          <div className="space-y-3 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
              <p className="text-gray-700">Our team will review your request within 2 hours</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
              <p className="text-gray-700">We'll contact you with a detailed quote and timeline</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
              <p className="text-gray-700">Upon approval, we'll arrange your shipment</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">info@thlinternational.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">+39 02 1234 5678</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500 mb-6">
          <p>Request ID: THL-{formData.sendTime ? new Date(formData.sendTime).getTime().toString().slice(-8) : '00000000'}</p>
          <p>Submitted: {formData.sendTime ? new Date(formData.sendTime).toLocaleString() : 'N/A'}</p>
          <p className="text-blue-600 mt-1">✓ Data sent to backend API</p>
        </div>

        <Button onClick={onReset} size="lg" className="w-full md:w-auto">
          Submit Another Request
        </Button>
      </div>
    </div>
  );
};