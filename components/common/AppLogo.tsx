
import React from 'react';
import { APP_NAME } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';

interface AppLogoProps {
  size?: number;
  className?: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ size = 60, className = '' }) => {
  const { translate } = useLanguage();
  const altText = `${translate('appName', APP_NAME)} Logo`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-label={altText}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="4" />
      <path
        d="M30 75 V 25 H 50 C 66.5685 25 80 38.4315 80 55 C 80 71.5685 66.5685 85 50 85 H 30"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="rotate(-15, 50, 50)"
      />
      <path
        d="M30 55 H 50"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="rotate(-15, 50, 50)"
      />
    </svg>
  );
};

export default AppLogo;
