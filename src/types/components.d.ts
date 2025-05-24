import React from 'react';

export interface SectionProps {
  id: string;
  bgColor?: string;
  textColor?: string;
  children: React.ReactNode;
  ref?: React.RefObject<HTMLElement> | ((instance: HTMLElement | null) => void);
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

export interface DotNavigationProps {
  sections: Array<{ id: string; label: string }>;
  activeSection: string;
  onDotClick: (id: string) => void;
}

export interface MenuButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

export interface MenuIconProps {
  open: boolean;
}

export interface MobileNavProps {
  open: boolean;
  children: React.ReactNode;
}

export interface NavLinkProps {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export interface TestimonialCardProps {
  children: React.ReactNode;
}

export interface PropertyCardProps {
  children: React.ReactNode;
}

export interface ServiceCardProps {
  children: React.ReactNode;
}

export interface FormGroupProps {
  children: React.ReactNode;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
