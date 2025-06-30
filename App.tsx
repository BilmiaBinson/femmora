/**
 * @file App.tsx
 * @description The root component of the Femmora application.
 * It sets up the main application structure, including context providers for
 * authentication and language, and defines all the client-side routes
 * using React Router. It also implements a protected route mechanism
 * to restrict access to certain parts of the application to authenticated users.
 */

import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.tsx';
import { LanguageProvider } from './contexts/LanguageContext.tsx';
import MainLayout from './components/layout/MainLayout.tsx';
import WelcomeScreen from './screens/WelcomeScreen.tsx';
import RegistrationScreen from './screens/auth/RegistrationScreen.tsx';
import LoginScreen from './screens/auth/LoginScreen.tsx';
import HomeScreen from './screens/dashboard/HomeScreen.tsx'; 
// ProfileScreen import removed as route is removed for now
import SettingsScreen from './screens/settings/SettingsScreen.tsx';

// Updated imports for placeholder screens:
import { 
  EmergencyContactsScreen,
  HelpScreen,
} from './screens/PlaceholderScreen.tsx'; 

import AwarenessLifeSkillsScreen from './screens/awareness/AwarenessLifeSkillsScreen.tsx';
import { WomenAwarenessScreen } from './screens/awareness/WomenAwarenessScreen.tsx'; // Changed to named import
import WomenLawAwarenessScreen from './screens/awareness/WomenLawAwarenessScreen.tsx';
import LearnToUseAppsScreen from './screens/digitalLearning/LearnToUseAppsScreen.tsx';
import GuidancePathwayScreen from './screens/guidance/GuidancePathwayScreen.tsx';
import BrainQuizzesScreen from './screens/games/BrainQuizzesScreen.tsx'; 
import { APP_ROUTES } from './constants.ts';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * A wrapper component that protects routes requiring authentication.
 * If the user is not authenticated, it redirects them to the login page.
 * Otherwise, it renders the child components.
 * @param {ProtectedRouteProps} props - The component props.
 * @returns {JSX.Element} The child components or a redirect.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page.
    // `replace` prevents the user from going back to the protected route via the browser's back button.
    return <ReactRouterDOM.Navigate to={APP_ROUTES.LOGIN} replace />;
  }
  // If authenticated, render the requested component.
  return <>{children}</>;
};

/**
 * The main App component that orchestrates the entire application.
 * It wraps the application in necessary context providers and sets up routing.
 */
const App: React.FC = () => {
  return (
    // The LanguageProvider makes language state and translation functions available throughout the app.
    <LanguageProvider>
      {/* The AuthProvider manages user authentication state and makes it available to all child components. */}
      <AuthProvider>
        {/* HashRouter is used for client-side routing, compatible with static hosting environments. */}
        <ReactRouterDOM.HashRouter>
          {/* The Routes component defines all possible application routes. */}
          <ReactRouterDOM.Routes>
            {/* Public routes accessible to everyone */}
            <ReactRouterDOM.Route path={APP_ROUTES.WELCOME} element={<WelcomeScreen />} />
            <ReactRouterDOM.Route path={APP_ROUTES.REGISTER} element={<RegistrationScreen />} />
            <ReactRouterDOM.Route path={APP_ROUTES.LOGIN} element={<LoginScreen />} />
            
            {/* Protected routes that require authentication */}
            {/* Each protected route is wrapped in the MainLayout, which includes the sidebar and header. */}
            <ReactRouterDOM.Route 
              path={APP_ROUTES.HOME} 
              element={
                <ProtectedRoute>
                  <MainLayout><HomeScreen /></MainLayout>
                </ProtectedRoute>
              } 
            />
             <ReactRouterDOM.Route 
              path={APP_ROUTES.SETTINGS} 
              element={
                <ProtectedRoute>
                  <MainLayout><SettingsScreen /></MainLayout>
                </ProtectedRoute>
              } 
            />
             <ReactRouterDOM.Route 
              path={APP_ROUTES.WOMEN_AWARENESS} // This is for age-specific awareness
              element={
                <ProtectedRoute>
                  <MainLayout><WomenAwarenessScreen /></MainLayout>
                </ProtectedRoute>
              } 
            />
            <ReactRouterDOM.Route 
              path={APP_ROUTES.WOMEN_LAW_AWARENESS} // New route for Law Awareness
              element={
                <ProtectedRoute>
                  <MainLayout><WomenLawAwarenessScreen /></MainLayout> 
                </ProtectedRoute>
              } 
            />
            {/* SCHEMES_BENEFITS Route Removed 
            <ReactRouterDOM.Route 
              path={APP_ROUTES.SCHEMES_BENEFITS} 
              element={
                <ProtectedRoute>
                  <MainLayout><GovernmentSchemesScreen /></MainLayout> 
                </ProtectedRoute>
              } 
            />
            */}
            <ReactRouterDOM.Route 
              path={APP_ROUTES.BRAIN_QUIZZES} 
              element={
                <ProtectedRoute>
                  <MainLayout><BrainQuizzesScreen /></MainLayout>
                </ProtectedRoute>
              } 
            />
            <ReactRouterDOM.Route 
              path={APP_ROUTES.EMERGENCY_CONTACTS} 
              element={
                <ProtectedRoute>
                  <MainLayout><EmergencyContactsScreen /></MainLayout>
                </ProtectedRoute>
              } 
            />
             <ReactRouterDOM.Route 
              path={APP_ROUTES.HELP} 
              element={
                <ProtectedRoute>
                  <MainLayout><HelpScreen /></MainLayout>
                </ProtectedRoute>
              } 
            />
             <ReactRouterDOM.Route 
              path={APP_ROUTES.SMART_PATHWAY}
              element={
                <ProtectedRoute>
                  <MainLayout><GuidancePathwayScreen /></MainLayout>
                </ProtectedRoute>
              } 
            />
            <ReactRouterDOM.Route 
              path={APP_ROUTES.AWARENESS_LIFE_SKILLS} 
              element={
                <ProtectedRoute>
                  <MainLayout><AwarenessLifeSkillsScreen /></MainLayout>
                </ProtectedRoute>
              } 
            />
            <ReactRouterDOM.Route 
              path={APP_ROUTES.LEARN_TO_USE_APPS} 
              element={
                <ProtectedRoute>
                  <MainLayout><LearnToUseAppsScreen /></MainLayout>
                </ProtectedRoute>
              } 
            />
            {/* Fallback route: If no other route matches, redirect to the welcome screen. */}
            <ReactRouterDOM.Route path="*" element={<ReactRouterDOM.Navigate to={APP_ROUTES.WELCOME} replace />} />
          </ReactRouterDOM.Routes>
        </ReactRouterDOM.HashRouter>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;