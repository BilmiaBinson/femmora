/**
 * @file SettingsScreen.tsx
 * @description This screen allows users to configure application settings,
 * such as changing the display language and enabling or disabling push notifications.
 * Settings are persisted to localStorage.
 */
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Language } from '../../types';
import Card from '../../components/common/Card';
import SectionTitle from '../../components/common/SectionTitle';

const SettingsScreen: React.FC = () => {
  const { language, setLanguage, translate } = useLanguage();
  
  // State for the notification toggle, initialized from localStorage.
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    // Check localStorage for a previously saved setting. Default to false if not found.
    localStorage.getItem('femmoraNotifications') === 'true'
  );

  /**
   * Handles changes to the language selection dropdown.
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The change event from the select element.
   */
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  /**
   * Toggles the notification setting and saves it to localStorage.
   */
  const handleNotificationToggle = () => {
    const newSetting = !notificationsEnabled;
    setNotificationsEnabled(newSetting);
    localStorage.setItem('femmoraNotifications', String(newSetting));
    // This alert is a simulation. A real app would register/unregister a service worker.
    alert(`Push notifications ${newSetting ? 'enabled' : 'disabled'}. (This is a simulation)`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <SectionTitle title={translate('settings')} />

      {/* Language Selection Card */}
      <Card className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">{translate('language')}</h3>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-800"
        >
          <option value={Language.EN}>English</option>
          <option value={Language.HI}>हिन्दी (Hindi)</option>
          <option value={Language.TA}>தமிழ் (Tamil)</option>
        </select>
      </Card>

      {/* Notification Settings Card */}
      <Card className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">{translate('notifications')}</h3>
        <div className="flex items-center justify-between">
          <span className="text-lg text-gray-600">{translate('enablePushNotifications')}</span>
          {/* A stylish toggle switch for the notification setting */}
          <label htmlFor="notificationToggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <input 
                type="checkbox" 
                id="notificationToggle" 
                className="sr-only peer" // `peer` class allows styling sibling elements based on state
                checked={notificationsEnabled}
                onChange={handleNotificationToggle}
              />
              <div className="block bg-gray-300 peer-checked:bg-teal-500 w-14 h-8 rounded-full transition"></div>
              <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform peer-checked:transform peer-checked:translate-x-6"></div>
            </div>
          </label>
        </div>
        {/* Informational text based on the toggle's state */}
        {notificationsEnabled && <p className="text-sm text-green-600 mt-2">You will receive updates and opportunities.</p> }
        {!notificationsEnabled && <p className="text-sm text-gray-500 mt-2">You might miss important updates.</p> }
      </Card>
    </div>
  );
};

export default SettingsScreen;