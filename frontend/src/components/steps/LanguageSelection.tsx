import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '../Button';
import { translations } from '../../data/translations';

interface LanguageSelectionProps {
  onLanguageSelect: (language: 'EN' | 'IT' | 'CN') => void;
}

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onLanguageSelect }) => {
  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'IT', name: 'Italiano', flag: '🇮🇹' },
    { code: 'CN', name: '中文', flag: '🇨🇳' }
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-blue-100 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
            <Globe className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {translations.EN.selectLanguage}
          </h2>
          <p className="text-gray-600">
            {translations.EN.choosePreferred}
          </p>
        </div>

        <div className="space-y-3">
          {languages.map((language) => (
            <Button
              key={language.code}
              onClick={() => onLanguageSelect(language.code)}
              variant="outline"
              className="w-full justify-start hover:border-blue-500 hover:bg-blue-50 py-4"
            >
              <span className="text-2xl mr-3">{language.flag}</span>
              <span className="text-lg font-medium">{language.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};