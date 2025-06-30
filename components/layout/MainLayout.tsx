/**
 * @file MainLayout.tsx
 * @description This component defines the main layout structure for the authenticated
 * part of the application. It arranges the Sidebar, Header, and the main content
 * area where different screens will be rendered. It also manages the state for
 * the sidebar's visibility on mobile devices.
 */

import React, { useState, ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar.tsx';

// Define the props for the MainLayout component.
interface MainLayoutProps {
  children: ReactNode; // The content of the current screen to be displayed.
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // State to control the visibility of the sidebar on mobile.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar's open/closed state.
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#FFF1F5]">
      {/* The Sidebar component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* The main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* The Header component */}
        <Header toggleSidebar={toggleSidebar} />
        
        {/* The main scrollable content area where screen components are rendered */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#FFF1F5] p-6 md:p-8">
          {children}
           {/* Placeholder for a real-time chat support button (removed from UI for now) */}
            {/*
            <button
                title="Chat Support"
                className="fixed bottom-6 right-6 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
                <i className="fas fa-comments text-2xl"></i>
            </button>
            */}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;