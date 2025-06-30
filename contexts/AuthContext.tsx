/**
 * @file AuthContext.tsx
 * @description This file defines the authentication context for the application.
 * It provides a way to manage user authentication state (e.g., whether a user is
 * logged in, and who the user is) and share this state across all components.
 * It also handles persisting the user's session to localStorage.
 */

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types'; // Ensure this path is correct

// Define the shape of the authentication context
interface AuthContextType {
  isAuthenticated: boolean; // True if the user is logged in
  user: User | null; // The authenticated user's data, or null if not logged in
  login: (userData: User) => void; // Function to handle user login
  logout: () => void; // Function to handle user logout
  loading: boolean; // True while checking for an existing session
}

// Create the React context with an initial undefined value.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * The provider component that makes the authentication context available to its children.
 * It encapsulates all the logic for authentication state management.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components that will have access to this context.
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Start in a loading state

  // This effect runs once when the component mounts to check for a persisted session.
  useEffect(() => {
    // Simulate checking for an existing session from localStorage.
    const storedUser = localStorage.getItem('femmoraUser');
    if (storedUser) {
      try {
        // If user data is found in localStorage, parse it and set the auth state.
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user data", error);
        // If parsing fails, the data is corrupt, so remove it.
        localStorage.removeItem('femmoraUser');
      }
    }
    // Finished checking, set loading to false.
    setLoading(false);
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  /**
   * Handles the login process.
   * @param {User} userData - The data of the user who is logging in.
   */
  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    // Persist the user's data to localStorage to maintain the session across browser refreshes.
    localStorage.setItem('femmoraUser', JSON.stringify(userData));
  };

  /**
   * Handles the logout process.
   */
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Remove the user's data from localStorage to end the session.
    localStorage.removeItem('femmoraUser');
  };

  // While checking for authentication, display a loading screen to prevent UI flicker.
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF1F5]">
        <p className="text-gray-700">Loading authentication...</p>
      </div>
    );
  }

  // Provide the authentication state and functions to all child components.
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * A custom hook for consuming the AuthContext.
 * This makes it easy for any component to access authentication state and functions.
 * It also includes an error check to ensure it's used within an AuthProvider.
 * @returns {AuthContextType} The authentication context values.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};