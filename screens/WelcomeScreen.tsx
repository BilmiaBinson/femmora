/**
 * @file WelcomeScreen.tsx
 * @description The landing page of the Femmora application.
 * This screen is the first thing a new or unauthenticated user sees.
 * It displays the app name, tagline, and a "Get Started" button
 * that navigates to the registration screen.
 */

import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
// Button component import removed as it's being replaced for this specific link
import { APP_ROUTES, APP_NAME, APP_TAGLINE } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import AppLogo from '../components/common/AppLogo';

const WelcomeScreen = () => {
  const { translate } = useLanguage();

  // Define class names for the "Get Started" link to mimic the Button component's appearance.
  // This is done to use React Router's Link component directly for navigation.
  // Styles are derived from the Button component's props:
  // baseStyle: 'font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ease-in-out inline-flex items-center justify-center'
  // size="lg": 'px-6 py-3 text-lg'
  // custom classes previously used: 'bg-white text-teal-600 hover:bg-gray-100'
  const getStartedLinkClassName = "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ease-in-out inline-flex items-center justify-center px-6 py-3 text-lg bg-white text-teal-600 hover:bg-gray-100";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-600 p-6 text-white">
      <div className="text-center max-w-lg">
        <AppLogo size={120} className="mx-auto mb-8 text-white" />
        <h1 className="text-5xl font-bold mb-4 drop-shadow-md">
          {translate('welcomeToFemmora', `Welcome to ${APP_NAME}`)}
        </h1>
        <p className="text-xl mb-12 opacity-90 drop-shadow-sm">
          {translate('appTagline', APP_TAGLINE)}
        </p>
        {/* Link to the registration page */}
        <ReactRouterDOM.Link
          to={APP_ROUTES.REGISTER}
          className={getStartedLinkClassName}
        >
          {translate('getStarted')}
        </ReactRouterDOM.Link>
      </div>
       {/* Decorative SVG background element */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-10 overflow-hidden pointer-events-none">
        {/* Placeholder for pathway/journey visual metaphor */}
        <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0 20 Q 25 0 50 10 T 100 0 V 20 Z" fill="rgba(255,255,255,0.2)"/>
            <path d="M0 15 Q 30 5 60 15 T 100 5 V 20 H0 Z" fill="rgba(255,255,255,0.1)"/>
        </svg>
      </div>
    </div>
  );
};

export default WelcomeScreen;