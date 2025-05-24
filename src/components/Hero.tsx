import styled, { keyframes } from 'styled-components';
import { useEffect, useRef, useState } from 'react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const HeroSection = styled.section`
  height: 100vh;
  width: 100%;
  background-image: url('/images/highland-cattle-hero.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5));
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: ${props => props.theme.colors.light};
  max-width: 800px;
  padding: 0 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease forwards;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 3.5rem;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    font-size: 4.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 0.3s;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }
`;

const HeroButton = styled.a`
  display: inline-block;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.light};
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 0.6s;
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    transform: translateY(-3px);
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  animation: ${float} 2s ease-in-out infinite;
  cursor: pointer;
  opacity: 0;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  animation-name: ${fadeIn}, ${float};
  animation-duration: 0.8s, 2s;
  animation-timing-function: ease, ease-in-out;
  animation-iteration-count: 1, infinite;
`;

const ChevronDown = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid ${props => props.theme.colors.light};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &::after {
    content: '';
    width: 12px;
    height: 12px;
    border-right: 2px solid ${props => props.theme.colors.light};
    border-bottom: 2px solid ${props => props.theme.colors.light};
    transform: rotate(45deg) translateY(-2px);
  }
`;

const FloatingCow = styled.div<{ delay: number, duration: number, xPos: number }>`
  position: absolute;
  width: 150px;
  height: 100px;
  background-image: url('/images/highland-cattle-silhouette.png');
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.7;
  animation: ${float} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  bottom: ${props => 20 + Math.random() * 10}%;
  left: ${props => props.xPos}%;
  z-index: 1;
`;

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [cows, setCows] = useState<{id: number, delay: number, duration: number, xPos: number}[]>([]);
  
  useEffect(() => {
    // Create floating cows
    const numCows = 3;
    const newCows = [];
    
    for (let i = 0; i < numCows; i++) {
      newCows.push({
        id: i,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        xPos: 10 + (i * 30) + (Math.random() * 10)
      });
    }
    
    setCows(newCows);
  }, []);

  const scrollToProperties = () => {
    const propertiesSection = document.getElementById('properties');
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection ref={sectionRef}>
      {cows.map(cow => (
        <FloatingCow 
          key={cow.id}
          delay={cow.delay}
          duration={cow.duration}
          xPos={cow.xPos}
        />
      ))}
      
      <HeroContent>
        <HeroTitle>Experience Country Western Living</HeroTitle>
        <HeroSubtitle>
          Discover exceptional properties with Kevin Landen, your trusted partner in real estate
        </HeroSubtitle>
        <HeroButton href="/properties">View Properties</HeroButton>
      </HeroContent>
      
      <ScrollIndicator onClick={scrollToProperties}>
        <ChevronDown />
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero;