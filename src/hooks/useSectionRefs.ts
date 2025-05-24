import { useRef, useCallback, MutableRefObject } from 'react';

type SectionRefs = {
  [key: string]: HTMLElement | null;
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
};

export const useSectionRefs = () => {
  const sectionsRef = useRef<SectionRefs>({
    home: null,
    about: null,
    services: null,
    work: null,
    testimonials: null,
    contact: null,
    newsletter: null,
    guide: null,
    affiliate: null,
    marketing: null,
  });
  
  const scrollToSection = useCallback((id: string) => {
    const element = sectionsRef.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const setSectionRef = useCallback((id: keyof SectionRefs) => (el: HTMLElement | null) => {
    if (el) {
      sectionsRef.current[id] = el;
    }
  }, []);

  return {
    sectionsRef,
    scrollToSection,
    setSectionRef,
  };
};
