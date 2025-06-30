/**
 * @file Sidebar.tsx
 * @description The main navigation sidebar for the application.
 * It contains links to all major features, user information, a language switcher,
 * a logout button, and copyright information. It is responsive and can be
 * toggled on mobile screens.
 */

import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { APP_ROUTES } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import AppLogo from '../common/AppLogo';
import { Language } from '../../types';

// Define the props for the main Sidebar component.
interface SidebarProps {
  isOpen: boolean; // Controls whether the sidebar is visible on mobile.
  toggleSidebar: () => void; // Function to change the sidebar's visibility.
}

// Define props for the reusable navigation item component.
interface NavItemProps {
  to: string;
  icon: string;
  labelKey: string;
  onClick?: () => void;
}

/**
 * A reusable component for a single navigation link in the sidebar.
 * It uses NavLink from react-router-dom to highlight the active route.
 */
const NavItem: React.FC<NavItemProps> = ({ to, icon, labelKey, onClick }) => {
  const { translate } = useLanguage();
  return (
    <ReactRouterDOM.NavLink
      to={to}
      onClick={onClick}
      // Dynamically apply classes based on whether the link is active.
      className={({ isActive }) =>
        `flex items-center px-4 py-3 text-lg hover:bg-teal-700 rounded-md transition-colors duration-150 ${
          isActive ? 'bg-teal-700 font-semibold' : ''
        }`
      }
    >
      <i className={`fas ${icon} w-6 mr-3`}></i>
      {translate(labelKey)}
    </ReactRouterDOM.NavLink>
  );
};

/**
 * The main sidebar component.
 */
const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { translate, language, setLanguage } = useLanguage();
  const { logout, user } = useAuth();
  const navigate = ReactRouterDOM.useNavigate();

  /**
   * Handles the logout process, navigates to the login screen,
   * and closes the sidebar on mobile.
   */
  const handleLogout = () => {
    logout();
    navigate(APP_ROUTES.LOGIN);
    if (window.innerWidth < 768) { // Close sidebar on mobile after action
        toggleSidebar();
    }
  };

  /**
   * Handles changes to the language selector dropdown.
   */
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
     if (window.innerWidth < 768) { 
        // Optional: close sidebar on mobile after language change. Currently disabled.
        // toggleSidebar();
    }
  };
  
  /**
   * Closes the sidebar on mobile when a navigation item is clicked.
   */
  const handleNavItemClick = () => {
    if (window.innerWidth < 768) {
        toggleSidebar();
    }
  }


  // An array defining all the navigation links to be displayed in the sidebar.
  const navLinks = [
    { to: APP_ROUTES.HOME, icon: 'fa-home', labelKey: 'home' },
    { to: APP_ROUTES.SMART_PATHWAY, icon: 'fa-route', labelKey: 'smartPathway' },
    { to: APP_ROUTES.WOMEN_AWARENESS, icon: 'fa-venus', labelKey: 'womenAwareness' }, // Age-specific awareness
    { to: APP_ROUTES.WOMEN_LAW_AWARENESS, icon: 'fa-gavel', labelKey: 'womenLawAwarenessTitle' }, // New Law Awareness
    { to: APP_ROUTES.AWARENESS_LIFE_SKILLS, icon: 'fa-lightbulb', labelKey: 'awarenessLifeSkills' },
    { to: APP_ROUTES.LEARN_TO_USE_APPS, icon: 'fa-mobile-alt', labelKey: 'learnToUseApps' },
    { to: APP_ROUTES.BRAIN_QUIZZES, icon: 'fa-brain', labelKey: 'brainQuizzes' },
    { to: APP_ROUTES.EMERGENCY_CONTACTS, icon: 'fa-phone-alt', labelKey: 'emergencyContacts' },
    { to: APP_ROUTES.SETTINGS, icon: 'fa-cog', labelKey: 'settings' },
    { to: APP_ROUTES.HELP, icon: 'fa-question-circle', labelKey: 'helpSupport' },
  ];

  return (
    <>
      {/* Semi-transparent overlay for mobile view when the sidebar is open. */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" 
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
      {/* The main sidebar container. */}
      <aside
        className={`fixed top-0 left-0 h-full bg-teal-600 text-white w-72 p-5 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:w-72 transition-transform duration-300 ease-in-out z-40 shadow-lg flex flex-col`}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between mb-2 md:justify-center">
          <ReactRouterDOM.Link to={APP_ROUTES.HOME} className="flex items-center space-x-3" onClick={handleNavItemClick}>
            <AppLogo size={50} />
            <span className="text-2xl font-bold">{translate('appName')}</span>
          </ReactRouterDOM.Link>
          <button onClick={toggleSidebar} className="md:hidden text-white p-2 hover:bg-teal-700 rounded-md" aria-label="Close sidebar">
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>

        {/* Language Switcher Dropdown */}
        <div className="mb-4 px-2">
            <label htmlFor="sidebarLanguageSelect" className="sr-only">{translate('selectLanguage')}</label>
            <select
                id="sidebarLanguageSelect"
                value={language}
                onChange={handleLanguageChange}
                className="w-full p-2.5 text-base bg-teal-700 border border-teal-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-white text-white"
            >
                <option value={Language.EN} className="bg-white text-black">English</option>
                <option value={Language.HI} className="bg-white text-black">हिन्दी (Hindi)</option>
                <option value={Language.TA} className="bg-white text-black">தமிழ் (Tamil)</option>
            </select>
        </div>
        
        {/* User Information Display */}
        {user && (
          <div className="mb-4 p-3 bg-teal-700 rounded-lg text-center">
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-sm text-teal-200">{user.email}</p>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-grow overflow-y-auto space-y-1 pr-1 pb-2" role="navigation">
          {navLinks.map(link => (
            <NavItem key={link.to} {...link} onClick={handleNavItemClick} />
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-lg bg-red-500 hover:bg-red-600 rounded-md transition-colors duration-150"
          >
            <i className="fas fa-sign-out-alt w-6 mr-3"></i>
            {translate('logout')}
          </button>
        </div>
        
        {/* Copyright and Credits */}
        <div className="mt-4 pt-4 border-t border-teal-500 text-center text-xs text-teal-200">
          <p>&copy; {new Date().getFullYear()} Femmora. All rights reserved.</p>
          <p className="mt-1">Developed by Arlin Robeiksha B and Bilmia M Binson</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;