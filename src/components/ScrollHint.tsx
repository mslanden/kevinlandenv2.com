import { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
  40% { transform: translateY(-10px) translateX(-50%); }
  60% { transform: translateY(-5px) translateX(-50%); }
`;

const ScrollHintContainer = styled.div<{ opacity: number }>`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #d2b48c;
  font-size: 1rem;
  font-weight: bold;
  opacity: ${props => props.opacity};
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  z-index: 100;
  transition: opacity 0.8s ease;
  pointer-events: none; /* Ensures it doesn't interfere with clicks */
  
  &::after {
    content: '↓';
    margin-top: 0.5rem;
    font-size: 1.5rem;
    animation: ${bounce} 2s infinite;
  }
`;

const ScrollHint = () => {
  // Use useRef to track the previous opacity for smooth transitions
  const opacityRef = useRef(0.9);
  const [opacity, setOpacity] = useState(0.9);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Wait a short time to ensure DOM is fully loaded
    const timer = setTimeout(() => {
      const handleScroll = () => {
        // Find the main container that has the custom scrolling
        const mainContainer = document.getElementById('main-container');
        if (mainContainer) {
          // Calculate opacity based on scroll position
          // Fade should complete by 200px of scrolling
          const scrollPosition = mainContainer.scrollTop;
          const fadeDistance = 200;
          
          // Calculate opacity based on scroll position relative to the fade distance
          const newOpacity = Math.max(0, 0.9 - (scrollPosition / fadeDistance) * 0.9);
          
          // Always update the DOM with the new opacity value for smooth transitions
          setOpacity(newOpacity);
          opacityRef.current = newOpacity;
          
          // Only completely hide the component when fully faded out
          if (newOpacity <= 0.05) {
            // Use a timeout to ensure the fade completes before removing from DOM
            setTimeout(() => {
              setIsVisible(false);
            }, 800); // Match this with the transition duration
          } else {
            setIsVisible(true);
          }
        }
      };

      // Get the main container reference
      const mainContainer = document.getElementById('main-container');
      
      // Add scroll listener to the main container instead of window
      if (mainContainer) {
        mainContainer.addEventListener('scroll', handleScroll, { passive: true });
        
        // Make sure we're at the top to show the hint
        if (mainContainer.scrollTop > 0) {
          mainContainer.scrollTop = 0;
        }
        
        // Initial call to set correct opacity
        handleScroll();
        
        return () => mainContainer.removeEventListener('scroll', handleScroll);
      }
      
      // Fallback to window scroll listener if main container not found
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, 300); // Reduced timeout for faster initialization
    
    return () => clearTimeout(timer);
  }, []);

  // If not visible at all, don't render
  if (!isVisible && opacity <= 0.05) return null;

  return <ScrollHintContainer opacity={opacity}>Scroll to explore</ScrollHintContainer>;
};

export default ScrollHint;
