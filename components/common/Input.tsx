/**
 * @file Input.tsx
 * @description A standardized, styled input component for the application.
 * It includes support for a label, error message display, and consistent
 * styling for focus and error states.
 */

import React from 'react';

// Define the props for the Input component, extending standard HTML input attributes.
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // The text for the <label> element associated with the input.
  error?: string; // An error message to display below the input.
  wrapperClassName?: string; // Optional class name for the div that wraps the label and input.
}

/**
 * A styled form input component with integrated label and error message handling.
 * @param {InputProps} props - The component props.
 */
const Input: React.FC<InputProps> = ({ label, id, error, className = '', wrapperClassName = '', ...props }) => {
  // Base styling for the input element.
  const baseInputStyle = "mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-base bg-white text-gray-900 placeholder-gray-500";
  // Styling to apply when an error is present.
  const errorInputStyle = "border-red-500 focus:ring-red-500 focus:border-red-500 text-red-900 placeholder-red-700";

  return (
    <div className={`mb-4 ${wrapperClassName}`}>
      {/* Render the label if one is provided. */}
      {label && (
        <label htmlFor={id} className="block text-lg font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      {/* The input element itself, with dynamic classes for styling. */}
      <input
        id={id}
        className={`${baseInputStyle} ${error ? errorInputStyle : ''} ${className}`}
        {...props}
      />
      {/* Render the error message if one is provided. */}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;