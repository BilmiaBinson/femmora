/**
 * @file SectionTitle.tsx
 * @description A simple component for rendering a standardized section title.
 * It provides a consistent look for main headings and optional subheadings
 * on different pages.
 */

import React from 'react';

// Define the props for the SectionTitle component.
interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

/**
 * Renders a styled title and optional subtitle for a page section.
 * @param {SectionTitleProps} props - The component props.
 */
const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-3xl font-bold text-teal-700 sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-2 text-lg text-gray-600">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;