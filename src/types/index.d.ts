import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
      light: string;
      dark: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
      largeDesktop: string;
    };
  }
}

export type SectionRefs = {
  [key: string]: HTMLElement | null;
} & {
  home: HTMLElement | null;
  about: HTMLElement | null;
  services: HTMLElement | null;
  work: HTMLElement | null;
  testimonials: HTMLElement | null;
  contact: HTMLElement | null;
  newsletter: HTMLElement | null;
  guide: HTMLElement | null;
  affiliate: HTMLElement | null;
  marketing: HTMLElement | null;
}

export interface GuideCardType {
  id: string;
  title: string;
  content: string;
  backContent?: string;
}

export interface LocationCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  buttonText: string;
}

export interface SectionProps {
  id?: string;
  bgImage?: string;
  bgColor?: string;
  customHeight?: string;
  ref?: React.RefObject<HTMLElement> | ((instance: HTMLElement | null) => void);
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  fullWidth?: boolean;
}

export interface TestimonialCardProps {
  children: React.ReactNode;
  author?: string;
  role?: string;
}

export interface GuideTabProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export interface GuideCardProps {
  position: 'left' | 'center' | 'right';
  isFlipped?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  onFlip?: () => void;
}

export interface GuideNavButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
}
