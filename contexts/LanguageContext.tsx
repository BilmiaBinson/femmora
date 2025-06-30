/**
 * @file LanguageContext.tsx
 * @description This file defines the context for managing the application's language.
 * It provides the current language, a function to change the language, and a `translate`
 * function to get the correct UI string for the selected language. The user's language
 * preference is persisted to localStorage.
 */

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Language, Translations } from '../types';
import { UI_TEXT } from '../constants';

// Define the shape of the language context
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string, defaultText?: string) => string;
}

// Create the React context for language management
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * The provider component that makes the language context available to its children.
 * It handles the logic for storing and updating the current language.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components that will have access to this context.
 */
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize the language state from localStorage, or default to English.
  const [language, setLanguageState] = useState<Language>(() => {
    const storedLang = localStorage.getItem('femmoraLanguage') as Language;
    return storedLang || Language.EN;
  });

  /**
   * Sets the application language and persists the choice to localStorage.
   * @param {Language} lang - The new language to set.
   */
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('femmoraLanguage', lang);
  };

  /**
   * Translates a given key into the currently selected language.
   * It uses the `UI_TEXT` constants object as its translation dictionary.
   * `useCallback` is used for performance optimization, ensuring the function
   * reference doesn't change unless the language does.
   * @param {string} key - The key of the string to translate (from UI_TEXT).
   * @param {string} [defaultText] - An optional fallback text if the key is not found.
   * @returns {string} The translated string, or the key/defaultText if no translation is found.
   */
  const translate = useCallback((key: string, defaultText?: string): string => {
    const translationsForKey = UI_TEXT[key];
    if (translationsForKey && translationsForKey[language]) {
      return translationsForKey[language];
    }
    // Fallback to the provided default text or the key itself if no translation is available.
    return defaultText || key;
  }, [language]); // This function will only be re-created when the language changes.


  // Provide the language state and functions to all child components.
  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * A custom hook for consuming the LanguageContext.
 * This simplifies accessing language state and the translate function in components.
 * @returns {LanguageContextType} The language context values.
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};