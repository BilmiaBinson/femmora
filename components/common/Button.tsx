/**
 * @file Button.tsx
 * @description A flexible and polymorphic Button component.
 * This component can be rendered as a standard <button> or any other
 * HTML element (like an <a> tag) using the `as` prop. It supports
 * different visual variants, sizes, and can include icons.
 */
import React from 'react';

// Define the props specific to our Button component.
interface ButtonOwnProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

// --- Helper types for creating a polymorphic component ---
// `as` prop allows specifying the underlying HTML element.
type AsProp<C extends React.ElementType> = {
  as?: C;
};

// Utility to omit props that are handled internally.
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

// The final props type for the polymorphic component. It combines the component's own props,
// the `as` prop, and the props of the underlying element, while omitting any conflicts.
type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// Set the default element type to 'button'.
const defaultButtonElement = 'button';

// Export the final ButtonProps type, which can be used for type annotations.
export type ButtonProps<C extends React.ElementType = typeof defaultButtonElement> =
  PolymorphicComponentProps<C, ButtonOwnProps>;

/**
 * A versatile button component that can be rendered as different elements.
 * @template C - The HTML element type to render. Defaults to 'button'.
 * @param {ButtonProps<C>} props - The component props.
 */
const Button = <C extends React.ElementType = typeof defaultButtonElement>({
  as,
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  ...restProps
}: ButtonProps<C>) => {
  // Determine the component to render. If 'as' prop is provided, use it; otherwise, use the default.
  const Component = as || defaultButtonElement;

  // Base styling applied to all buttons.
  const baseStyle = 'font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ease-in-out inline-flex items-center justify-center';
  
  // Determine variant-specific styles.
  let variantStyle = '';
  switch (variant) {
    case 'primary':
      variantStyle = 'bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500';
      break;
    case 'secondary':
      variantStyle = 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400';
      break;
    case 'danger':
      variantStyle = 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500';
      break;
    case 'link':
      variantStyle = 'bg-transparent hover:text-teal-700 text-teal-600 focus:ring-teal-500 underline';
      break;
  }

  // Determine size-specific styles.
  let sizeStyle = '';
  switch (size) {
    case 'sm':
      sizeStyle = 'px-3 py-1.5 text-sm';
      break;
    case 'md':
      sizeStyle = 'px-4 py-2 text-base';
      break;
    case 'lg':
      sizeStyle = 'px-6 py-3 text-lg';
      break;
  }

  // Determine width style.
  const widthStyle = fullWidth ? 'w-full' : '';

  // Ensure that if the component is a <button>, it has a `type` attribute
  // to prevent accidental form submissions. Default to 'button'.
  let finalProps = restProps;
  if (Component === 'button' && !(restProps as React.ButtonHTMLAttributes<HTMLButtonElement>).type) {
    finalProps = { ...restProps, type: 'button' } as typeof restProps;
  }

  return (
    <Component
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${widthStyle} ${className}`}
      {...finalProps}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </Component>
  );
};

export default Button;