import React, { useEffect, useState } from 'react';
import { Truck } from 'lucide-react';
import { ProgressBar } from '../ProgressBar';
import { getUserIP } from '../../utils/ipUtils';
import { translations } from '../../data/translations';

interface SplashScreenProps {
  onComplete: (ip: string) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [ip, setIp] = useState('');

  useEffect(() => {
    // Get IP address
    getUserIP().then(setIp);

    // Progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(ip), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete, ip]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        {/* Logo */}
        <div className="mb-8 animate-pulse">
          <div className="bg-white rounded-full p-6 mx-auto w-24 h-24 flex items-center justify-center shadow-2xl">
            <Truck className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        {/* Company Name */}
        <h1 className="text-4xl font-bold text-white mb-2">
          THL International
        </h1>
        <p className="text-blue-200 mb-8 text-lg">s.r.l.</p>

        {/* Loading Text */}
        <p className="text-white mb-6 text-lg">
          {translations.EN.gettingReady}
        </p>

        {/* Progress Bar */}
        <ProgressBar progress={progress} className="mb-4" />
        
        {/* Progress Text */}
        <p className="text-blue-200 text-sm">
          {progress}% {translations.EN.loading}
        </p>
      </div>
    </div>
  );
};