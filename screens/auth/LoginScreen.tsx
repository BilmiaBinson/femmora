/**
 * @file LoginScreen.tsx
 * @description This component provides the user login interface.
 * It includes a form for users to enter their email and password.
 * For this demonstration, login is simulated with hardcoded credentials.
 */
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { APP_ROUTES } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import AppLogo from '../../components/common/AppLogo';

const LoginScreen: React.FC = () => {
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State for displaying form errors
  const [error, setError] = useState('');
  
  const navigate = ReactRouterDOM.useNavigate();
  const { login } = useAuth();
  const { translate } = useLanguage();

  /**
   * Handles the form submission event.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(''); // Clear previous errors

    // --- Simulation of login ---
    // In a real application, this would be an API call to a backend server.
    // Here, we check against hardcoded credentials for demonstration purposes.
    if (email === 'user@example.com' && password === 'password') {
      login({ id: '1', name: 'Demo User', email: 'user@example.com' });
      navigate(APP_ROUTES.HOME); // Navigate to home on successful login
    } else {
      setError('Invalid email or password. (Hint: user@example.com / password)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
           <AppLogo size={80} className="mx-auto mb-4 text-teal-600" />
          <h2 className="text-3xl font-bold text-teal-700">{translate('login')}</h2>
        </div>
        
        {/* Display error message if there is one */}
        {error && <p className="mb-4 text-center text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="email"
            label={translate('email')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your.email@example.com"
          />
          <Input
            id="password"
            label={translate('password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Your password"
          />
          <Button type="submit" fullWidth size="lg">
            {translate('login')}
          </Button>
        </form>
        
        {/* Link to the registration screen for new users */}
        <p className="mt-8 text-center text-gray-600 text-lg">
          {translate('dontHaveAccount')}{' '}
          <ReactRouterDOM.Link to={APP_ROUTES.REGISTER} className="font-semibold text-teal-600 hover:text-teal-700">
            {translate('register')}
          </ReactRouterDOM.Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;