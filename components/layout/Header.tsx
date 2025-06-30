/**
 * @file Header.tsx
 * @description The main header component for the application's authenticated layout.
 * It displays the app logo and name, and includes a hamburger icon to toggle the
 * sidebar on mobile devices.
 */
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { APP_ROUTES, APP_NAME, APP_TAGLINE } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';
import AppLogo from '../common/AppLogo';

// Define the props for the Header component.
interface HeaderProps {
  toggleSidebar: () => void; // A function passed from MainLayout to control the sidebar's visibility.
}

/**
 * The application header.
 * @param {HeaderProps} props - The component props.
 */
const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { translate } = useLanguage();

  return (
    <header className="bg-teal-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {/* Sidebar toggle button, visible only on mobile screens (md breakpoint) */}
          <button 
            onClick={toggleSidebar} 
            className="text-white mr-4 p-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-white md:hidden"
            aria-label="Open sidebar"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
          {/* Link to the home screen */}
          <ReactRouterDOM.Link to={APP_ROUTES.HOME} className="flex items-center space-x-2">
            <AppLogo size={40} className="text-white" />
            <div>
              <h1 className="text-xl font-bold">{translate('appName', APP_NAME)}</h1>
              <p className="text-xs hidden sm:block opacity-90">{translate('appTagline', APP_TAGLINE)}</p>
            </div>
          </ReactRouterDOM.Link>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
           {/* Notifications button removed as it's a "coming soon" placeholder
           <button 
            className="p-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-white"
            title={translate('notifications')}
            aria-label={translate('notifications')}
          >
            <i className="fas fa-bell text-lg"></i>
          </button>
          */}
        </div>
      </div>
    </header>
  );
};

export default Header;