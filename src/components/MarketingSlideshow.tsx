import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-30px); }
`;

const ArrowButton = styled.button<{
  position: 'left' | 'right';
}>`
  position: absolute;
  top: 50%;
  ${p => p.position === 'left' ? 'left: 24px;' : 'right: 24px;'}
  transform: translateY(-50%);
  background: rgba(255,255,255,0.2);
  border: 2px solid rgba(255,255,255,0.6);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: white;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  backdrop-filter: blur(4px);
  
  &:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-50%) scale(1.05);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255,255,255,0.4);
  }
  
  @media (max-width: 700px) {
    width: 40px;
    height: 40px;
    font-size: 1.4rem;
    left: ${p => p.position === 'left' ? '10px' : 'auto'};
    right: ${p => p.position === 'right' ? '10px' : 'auto'};
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 2rem;
  position: relative;
  z-index: 5;
`;

const Dot = styled.button<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  background: ${p => (p.active ? '#5e3a1a' : 'transparent')};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  opacity: ${p => (p.active ? 1 : 0.7)};
  transform: ${p => (p.active ? 'scale(1.2)' : 'scale(1)')};  
  box-shadow: ${p => (p.active ? '0 0 8px rgba(255,255,255,0.5)' : 'none')};
  
  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255,255,255,0.4);
  }
`;

const SlideContainer = styled.div`
  width: 100%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem 0;
  margin: 1rem 0;
`;

const SlideContent = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 0 2rem;
  animation: ${p => p.isActive ? fadeIn : fadeOut} 0.6s forwards;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${p => p.isActive ? 1 : 0};
  pointer-events: ${p => p.isActive ? 'all' : 'none'};
`;

const SlideImage = styled.img`
  width: 100%;
  max-width: 480px;
  height: 280px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 28px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  border: 3px solid rgba(255,255,255,0.2);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const SlideTitle = styled.h3`
  color: #fff;
  font-size: 2.2rem;
  margin-bottom: 12px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const SlideDescription = styled.p`
  color: #fff;
  font-size: 1.2rem;
  max-width: 600px;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
`;

export interface MarketingSlide {
  title: string;
  description: string;
  image: string;
}

const slides: MarketingSlide[] = [
  {
    title: 'Professional Photography',
    description: 'High-quality, professional photos to showcase your property in the best light.',
    image: '/images/marketing1.jpg',
  },
  {
    title: 'Online Listings',
    description: 'Your property featured on major real estate platforms for maximum exposure.',
    image: '/images/marketing2.jpg',
  },
  {
    title: 'Social Media Campaigns',
    description: 'Targeted ads and posts to reach buyers on Facebook, Instagram, and more.',
    image: '/images/marketing3.jpg',
  },
  {
    title: 'Print Marketing',
    description: 'Beautiful brochures and flyers distributed locally and regionally.',
    image: '/images/marketing4.jpg',
  },
  {
    title: 'Open Houses & Events',
    description: 'In-person and virtual events to attract interested buyers.',
    image: '/images/marketing5.jpg',
  },
];

const MarketingSlideshow: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => setCurrent((c) => (c + 1) % slides.length);
  const prevSlide = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const goToSlide = (idx: number) => setCurrent(idx);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 10000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  return (
    <SlideContainer>
      <ArrowButton aria-label="Previous" position="left" onClick={prevSlide}>
        &#8592;
      </ArrowButton>
      
      {slides.map((slide, idx) => (
        <SlideContent key={idx} isActive={idx === current}>
          <SlideImage src={slide.image} alt={slide.title} />
          <SlideTitle>{slide.title}</SlideTitle>
          <SlideDescription>{slide.description}</SlideDescription>
        </SlideContent>
      ))}
      
      <ArrowButton aria-label="Next" position="right" onClick={nextSlide}>
        &#8594;
      </ArrowButton>
      
      <Dots>
        {slides.map((_, idx) => (
          <Dot 
            key={idx} 
            active={idx === current} 
            onClick={() => goToSlide(idx)} 
            aria-label={`Go to slide ${idx+1}`} 
          />
        ))}
      </Dots>
    </SlideContainer>
  );
};

export default MarketingSlideshow;
