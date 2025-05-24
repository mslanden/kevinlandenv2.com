import React, { useEffect, useRef } from 'react';

interface SmoothScrollManagerProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sectionsRef: React.MutableRefObject<{[key: string]: HTMLElement | null}>;
  clickedDot: string | null;
}

const SmoothScrollManager: React.FC<SmoothScrollManagerProps> = ({
  activeSection,
  setActiveSection,
  sectionsRef,
  clickedDot
}) => {
  const scrollingRef = useRef<boolean>(false);
  
  useEffect(() => {
    // Setup intersection observer for section navigation
    const navOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is 20% from the top and 60% from the bottom
      threshold: 0,
    };
    
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !scrollingRef.current) {
          // Only update active section if not from a click
          const sectionId = entry.target.id;
          if (sectionId && sectionId !== clickedDot) {
            setActiveSection(sectionId);
          }
        }
      });
    }, navOptions);
    
    // Observe all sections for navigation
    Object.values(sectionsRef.current).forEach(section => {
      if (section) navObserver.observe(section);
    });

    return () => {
      navObserver.disconnect();
    };
  }, [clickedDot, setActiveSection, sectionsRef]);

  // Add smooth scrolling behavior to the page
  useEffect(() => {
    const htmlStyle = document.createElement('style');
    htmlStyle.innerHTML = `
      html {
        scroll-behavior: smooth;
      }
      
      section {
        scroll-snap-align: start;
        scroll-margin-top: 80px; /* Adjust based on your header height */
      }
      
      @media (prefers-reduced-motion: reduce) {
        html {
          scroll-behavior: auto;
        }
      }
    `;
    document.head.appendChild(htmlStyle);

    return () => {
      document.head.removeChild(htmlStyle);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SmoothScrollManager;
