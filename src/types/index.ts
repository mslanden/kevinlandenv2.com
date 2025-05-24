/**
 * Type definitions for Kevin Landen Website
 */

// Property Types
export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  acreage?: number;
  location: string;
  address?: string;
  city: string;
  state: string;
  zip_code?: string;
  featured: boolean;
  status: PropertyStatus;
  main_image_url?: string;
  created_at: string;
  updated_at: string;
  property_images?: PropertyImage[];
  property_features?: PropertyFeature[];
}

export type PropertyType = 'ranch' | 'farm' | 'country-home' | 'land' | 'luxury' | 'mountain';

export type PropertyStatus = 'available' | 'pending' | 'sold';

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  description?: string;
  display_order: number;
  created_at: string;
}

export interface PropertyFeature {
  id: string;
  property_id: string;
  feature: string;
  created_at: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  category: string;
  image_url?: string;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  read: boolean;
  created_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Theme Types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    light: string;
    dark: string;
  };
  fonts: {
    main: string;
    heading: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    largeDesktop: string;
  };
}