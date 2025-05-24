import styled, { css } from 'styled-components';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  as?: 'button' | 'a';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
}

const ButtonStyles = css<{
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
}>`
  display: inline-block;
  font-family: ${props => props.theme.fonts.main};
  font-weight: 600;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  /* Size variants */
  ${props => props.size === 'small' && css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `}
  
  ${props => props.size === 'medium' && css`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  `}
  
  ${props => props.size === 'large' && css`
    padding: 1rem 2rem;
    font-size: 1.125rem;
  `}
  
  /* Color variants */
  ${props => props.variant === 'primary' && css`
    background-color: ${props.theme.colors.primary};
    color: ${props.theme.colors.light};
    border: none;
    
    &:hover {
      background-color: ${props.theme.colors.accent};
    }
    
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `}
  
  ${props => props.variant === 'secondary' && css`
    background-color: ${props.theme.colors.secondary};
    color: ${props.theme.colors.dark};
    border: none;
    
    &:hover {
      background-color: ${props.theme.colors.accent};
      color: ${props.theme.colors.light};
    }
    
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `}
  
  ${props => props.variant === 'outline' && css`
    background-color: transparent;
    color: ${props.theme.colors.primary};
    border: 2px solid ${props.theme.colors.primary};
    
    &:hover {
      background-color: ${props.theme.colors.primary};
      color: ${props.theme.colors.light};
    }
    
    &:disabled {
      border-color: #ccc;
      color: #ccc;
      cursor: not-allowed;
    }
  `}
  
  ${props => props.variant === 'text' && css`
    background-color: transparent;
    color: ${props.theme.colors.primary};
    border: none;
    padding-left: 0;
    padding-right: 0;
    
    &:hover {
      color: ${props.theme.colors.accent};
      text-decoration: underline;
    }
    
    &:disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  `}
`;

const StyledButton = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
}>`
  ${ButtonStyles}
`;

const StyledLink = styled(Link)<{
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
}>`
  ${ButtonStyles}
  text-decoration: none;
`;

const StyledAnchor = styled.a<{
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
}>`
  ${ButtonStyles}
  text-decoration: none;
`;

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  as = 'button',
  href,
  onClick,
  disabled = false,
  type = 'button',
  children,
  className,
}) => {
  if (as === 'a' && href) {
    // If href starts with http, we use a regular anchor tag
    if (href.startsWith('http')) {
      return (
        <StyledAnchor
          href={href}
          variant={variant}
          size={size}
          fullWidth={fullWidth}
          className={className}
          onClick={onClick}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </StyledAnchor>
      );
    }
    
    // For internal links, we use Next.js Link component
    return (
      <StyledLink
        href={href}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        className={className}
        onClick={onClick}
      >
        {children}
      </StyledLink>
    );
  }
  
  // Otherwise, we render a button
  return (
    <StyledButton
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </StyledButton>
  );
};

export default Button;