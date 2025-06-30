/**
 * @file Card.tsx
 * @description A versatile and reusable Card component.
 * It serves as a container for content, providing a consistent
 * background, shadow, and rounded corners. It can optionally
 * have a title and a hover effect.
 */

import React from 'react';

// Define the props for the Card component.
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  title?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

/**
 * A styled container component for displaying content in a card format.
 * @param {CardProps} props - The component props.
 */
const Card: React.FC<CardProps> = ({ children, className = '', title, onClick, hoverEffect = false, ...rest }) => {
  // Base styles for all cards.
  const baseStyle = `bg-white shadow-lg rounded-xl overflow-hidden ${onClick ? 'cursor-pointer' : ''}`;
  
  // Optional hover effect styles.
  const hoverStyle = hoverEffect ? 'transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105' : '';
  
  return (
    <div className={`${baseStyle} ${hoverStyle} ${className}`} onClick={onClick} {...rest}>
      {/* Render the title section if a title is provided */}
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-teal-700">{title}</h3>
        </div>
      )}
      {/* The main content area of the card */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;