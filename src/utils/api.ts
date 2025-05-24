/**
 * API utility for making requests to the backend server
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

async function fetchApi<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const {
    method = 'GET',
    body,
    headers = {}
  } = options;

  const requestOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    credentials: 'include'
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, requestOptions);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

export const api = {
  // Properties endpoints
  properties: {
    getAll: () => fetchApi('/properties'),
    getFeatured: () => fetchApi('/properties/featured'),
    getById: (id: string) => fetchApi(`/properties/${id}`),
    filter: (params: Record<string, string | number>) => {
      const queryString = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryString.append(key, String(value));
        }
      });
      return fetchApi(`/properties/filter?${queryString}`);
    }
  },
  
  // Blog endpoints
  blog: {
    getAll: () => fetchApi('/blog'),
    getById: (id: string) => fetchApi(`/blog/${id}`),
    getByCategory: (category: string) => fetchApi(`/blog/category/${category}`),
    getRecent: (limit = 3) => fetchApi(`/blog/recent/${limit}`)
  },
  
  // Contact endpoint
  contact: {
    submit: (data: any) => fetchApi('/contact', {
      method: 'POST',
      body: data
    })
  }
};