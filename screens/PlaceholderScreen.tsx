/**
 * @file PlaceholderScreen.tsx
 * @description This file contains components for screens that are either placeholders
 * for future features or display static content like help guides and emergency contacts.
 * It includes a generic `PlaceholderScreen` component and specific implementations like
 * `EmergencyContactsScreen` and `HelpScreen`.
 */

import React from 'react';
import SectionTitle from '../components/common/SectionTitle';
import Card from '../components/common/Card';
import { useLanguage } from '../contexts/LanguageContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { APP_ROUTES, UI_TEXT } from '../constants'; // Added UI_TEXT
import * as ReactRouterDOM from 'react-router-dom'; // Added for internal navigation examples

// Props for the generic placeholder component
interface PlaceholderScreenProps {
  titleKey: string;
  defaultTitle: string;
  children?: React.ReactNode;
  showSearch?: boolean;
}

/**
 * A generic placeholder screen component. It can display a "coming soon" message
 * or render custom child content.
 * @param {PlaceholderScreenProps} props - The component props.
 */
const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ titleKey, defaultTitle, children, showSearch = false }) => {
  const { translate } = useLanguage();

  return (
    <div>
      <SectionTitle title={translate(titleKey, defaultTitle)} />
      {showSearch && (
        <div className="mb-6 max-w-lg">
          <Input 
            type="search" 
            placeholder={translate('searchPlaceholder', 'Type to search...')} 
            aria-label={translate('search')}
          />
        </div>
      )}
      <Card>
        {/* Render children if provided, otherwise show the "coming soon" message. */}
        {children || (
          <div className="text-center py-12">
            <i className="fas fa-tools text-5xl text-gray-400 mb-4"></i>
            <p className="text-xl text-gray-600">
              {translate(titleKey, defaultTitle)} {translate('featureComingSoon', 'feature is under development.')}
            </p>
            <p className="text-gray-500 mt-2">
              {translate('checkBackLater', 'Please check back later for updates.')}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

// --- Specific Screen Implementations ---

/**
 * The screen for displaying a list of emergency contact numbers.
 */
const EmergencyContactsScreen: React.FC = () => (
  <PlaceholderScreen titleKey="emergencyContacts" defaultTitle="Emergency Support Contacts">
    <div className="space-y-4">
      {[
        { name: 'Women Helpline', number: '1091', icon: 'fa-female' },
        { name: 'Police', number: '100', icon: 'fa-shield-alt' },
        { name: 'Ambulance', number: '102', icon: 'fa-ambulance' },
        { name: 'Child Helpline', number: '1098', icon: 'fa-child' },
      ].map(contact => (
         <Card key={contact.name} className="!bg-red-50 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-red-700 flex items-center">
                <i className={`fas ${contact.icon} mr-3 text-2xl`}></i>{contact.name}
              </h3>
              <p className="text-2xl text-gray-800 font-bold mt-1">{contact.number}</p>
            </div>
            {/* The call button is a simulation. */}
            <Button 
              onClick={() => alert(`Calling ${contact.name} at ${contact.number} (simulation)`)}
              size="lg"
              variant="danger"
            >
              <i className="fas fa-phone mr-2"></i> Call
            </Button>
          </div>
        </Card>
      ))}
    </div>
  </PlaceholderScreen>
);

/**
 * The screen for Help & Support, containing a "How to Use" guide and an FAQ section.
 */
const HelpScreen: React.FC = () => {
  const { translate } = useLanguage();

  // Defines the questions and answer keys for the FAQ section.
  const faqItems = [
    { qKey: 'faqQ1Title', aKeys: ['faqQ1Answer1', 'faqQ1Answer2', 'faqQ1Answer3'] },
    { qKey: 'faqQ2Title', aKeys: ['faqQ2Answer1', 'faqQ2Answer2', 'faqQ2Answer3', 'faqQ2Answer4'] },
    { qKey: 'faqQ3Title', aKeys: ['faqQ3Answer'] },
    { qKey: 'faqQ4Title', aKeys: ['faqQ4Answer'] },
    { qKey: 'faqQ5Title', aKeys: ['faqQ5AnswerSahana', 'faqQ5AnswerMentor', 'faqQ5AnswerAppAssistant', 'faqQ5AnswerGeneral'] },
    { qKey: 'faqQ6Title', aKeys: ['faqQ6Answer'] },
  ];

  return (
    <PlaceholderScreen titleKey="helpSupport" defaultTitle="Help & Support">
      <div className="space-y-6">
        {/* "How to Use Femmora" Guide */}
        <Card title={translate('howToUseFemmoraTitle', "How to Use Femmora App")}>
          <p className="text-gray-600 mb-4">
            {translate('howToUseFemmoraIntro', "Here's a simple guide to help you get started with the Femmora app and make the most of its features:")}
          </p>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              <strong>{translate('navigationSidebarTitle', "Finding Your Way (Sidebar Menu)")}:</strong>
              <ul className="list-disc list-inside pl-5 mt-1 text-sm">
                <li>{translate('navigationSidebarDesc1', "The app has a main menu, usually on the left side. On smaller phone screens, you might need to tap a button with three lines (☰) to open it.")}</li>
                <li>{translate('navigationSidebarDesc2', "This menu has links to all parts of the app, like 'Home', 'Smart Pathway', 'Settings', and more.")}</li>
              </ul>
            </li>
            <li>
              <strong>{translate('homeScreenTitle', "Home Screen")}:</strong>
              <ul className="list-disc list-inside pl-5 mt-1 text-sm">
                <li>{translate('homeScreenDesc', `Your starting point is the '${translate('home')}' screen. It shows quick links to important features and helpful information.`)}</li>
              </ul>
            </li>
            <li>
              <strong>{translate('usingKeyFeaturesTitle', "Using Key Features")}:</strong>
              <ul className="list-disc list-inside pl-5 mt-1 text-sm space-y-1">
                <li><ReactRouterDOM.Link to={APP_ROUTES.SMART_PATHWAY} className="text-teal-600 hover:underline">{translate('smartPathway')}</ReactRouterDOM.Link>: {translate('featureSmartPathwayDesc', "Tap here to get personalized guidance for your education and career. Fill in the form and tap 'Generate Pathway'. You can then chat with an AI mentor about your plan.")}</li>
                <li><ReactRouterDOM.Link to={APP_ROUTES.WOMEN_AWARENESS} className="text-teal-600 hover:underline">{translate('womenAwareness')}</ReactRouterDOM.Link>: {translate('featureWomenAwarenessDesc', "Get awareness tips based on your age. Enter your age, tap 'Get Awareness Tips', and then you can chat with your Caring Partner, our caring AI guide, about health or personal matters.")}</li>
                <li><ReactRouterDOM.Link to={APP_ROUTES.WOMEN_LAW_AWARENESS} className="text-teal-600 hover:underline">{translate('womenLawAwarenessTitle')}</ReactRouterDOM.Link>: {translate('featureWomenLawDesc', "Learn about important laws for women in India. Tap to expand and read details in different languages.")}</li>
                <li><ReactRouterDOM.Link to={APP_ROUTES.LEARN_TO_USE_APPS} className="text-teal-600 hover:underline">{translate('learnToUseApps')}</ReactRouterDOM.Link>: {translate('featureLearnAppsDesc', "Discover helpful apps and websites. Type your goal (like 'learn cooking') and get suggestions. A chat assistant is also available to help you understand the suggestions.")}</li>
                <li><ReactRouterDOM.Link to={APP_ROUTES.BRAIN_QUIZZES} className="text-teal-600 hover:underline">{translate('brainQuizzes')}</ReactRouterDOM.Link>: {translate('featureBrainQuizzesDesc', "Challenge yourself with fun quizzes and test your knowledge on various topics.")}</li>
                <li><ReactRouterDOM.Link to={APP_ROUTES.EMERGENCY_CONTACTS} className="text-teal-600 hover:underline">{translate('emergencyContacts')}</ReactRouterDOM.Link>: {translate('featureEmergencyDesc', "Find important phone numbers like Police (100) or Women Helpline (1091).")}</li>
              </ul>
            </li>
            <li>
              <strong>{translate('settingsTitle', "Settings & Language")}:</strong>
              <ul className="list-disc list-inside pl-5 mt-1 text-sm">
                <li>{translate('settingsLanguageDesc', `You can change the app's language to English, Hindi, or Tamil. Go to '${translate('settings')}' from the menu, or find the language selector directly in the sidebar menu.`)}</li>
                <li>{translate('settingsNotificationsDesc', `In '${translate('settings')}', you can also manage notification preferences (coming soon).`)}</li>
              </ul>
            </li>
            <li>
              <strong>{translate('loggingOutTitle', "Logging Out")}:</strong>
              <ul className="list-disc list-inside pl-5 mt-1 text-sm">
                <li>{translate('loggingOutDesc', `To sign out of the app, find the '${translate('logout')}' button, usually at the bottom of the sidebar menu.`)}</li>
              </ul>
            </li>
            <li>
              <strong>{translate('generalTipTitle', "Explore and Ask")}:</strong>
              <ul className="list-disc list-inside pl-5 mt-1 text-sm">
                <li>{translate('generalTipDesc', "Don't be afraid to tap on different sections to see what they offer. If you need more help, you can always come back to this 'Help & Support' section or use the chat features within specific modules.")}</li>
              </ul>
            </li>
          </ol>
        </Card>

        {/* Frequently Asked Questions (FAQ) Section */}
        <Card title={translate('faqTitle', "Frequently Asked Questions (FAQ)")}>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              // The <details> HTML element creates a disclosure widget (accordion)
              <details key={index} className="group border-b border-gray-200 pb-2 last:border-b-0">
                <summary className="font-semibold text-teal-700 cursor-pointer list-none flex justify-between items-center group-open:text-teal-800 hover:text-teal-600 py-2">
                  <span>{translate(item.qKey)}</span>
                  <i className="fas fa-chevron-down group-open:rotate-180 transition-transform duration-300"></i>
                </summary>
                <div className="pl-4 pt-2 text-gray-700 text-sm space-y-1">
                  {item.aKeys.map((aKey, aIndex) => {
                    const answerText = translate(aKey);
                    // Check if answer is a list item by checking if it starts with a number and a dot.
                    if (/^\d+\.\s/.test(answerText)) {
                      return <p key={aIndex} className="ml-4">{answerText}</p>;
                    }
                    return <p key={aIndex}>{answerText}</p>;
                  })}
                </div>
              </details>
            ))}
          </div>
        </Card>
        
        {/* Contact Support Section */}
        <Card title={translate('contactSupportTitle', "Contact Support")}>
          <p className="text-gray-600 mb-2">{translate('contactSupportDesc', "If you need further assistance or have specific issues, please contact us:")}</p>
          <p className="text-gray-700">
            <i className="fas fa-envelope mr-2 text-teal-600"></i> 
            <a href={`mailto:${translate('contactSupportEmail')}`} className="hover:underline">{translate('contactSupportEmail')}</a>
          </p>
          <p className="text-gray-700">
            <i className="fas fa-phone mr-2 text-teal-600"></i>
            <a href={`tel:${translate('contactSupportPhone').replace(/-/g, '')}`} className="hover:underline">{translate('contactSupportPhone')}</a>
          </p>
        </Card>
      </div>
    </PlaceholderScreen>
  );
}

export { 
    EmergencyContactsScreen,
    HelpScreen
};