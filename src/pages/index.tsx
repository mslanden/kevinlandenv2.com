import Head from 'next/head';
import styled, { keyframes, css } from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import ScrollHint from '../components/ScrollHint';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled components
const Main = styled.main`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  position: relative;
  scroll-snap-type: y proximity;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  scroll-behavior: smooth;
  background-color: #000000;
  color: #f5f5f5;
  
  /* This ensures scroll events propagate correctly */
  -webkit-overflow-scrolling: touch;
`;

const Section = styled.section<{ bgImage?: string, bgColor?: string, fadeBottom?: boolean, isStorySection?: boolean }>`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2rem;
  scroll-snap-align: ${props => props.isStorySection ? 'none' : 'start'};
  scroll-snap-stop: ${props => props.isStorySection ? 'normal' : 'always'};
  background-color: ${props => props.bgColor || 'transparent'};
  background-image: ${props => props.bgImage ? css`url(${props.bgImage})` : 'none'};
  background-size: cover;
  background-position: center;
  transition: all 0.5s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.bgImage ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
    z-index: 1;
  }
  
  ${props => props.fadeBottom && css`
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100px;
      background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
      pointer-events: none;
      z-index: 10;
    }
  `}
`;

const SectionContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  width: 100%;
  opacity: 1;
  transform: translateY(0);
`;

const DotNavigation = styled.div`
  position: fixed;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  z-index: 9999;
  pointer-events: auto;
`;

const Dot = styled.div<{ active: boolean, showLabel: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
    background-color: #fff;
    
    &::after {
      opacity: 1;
      transform: translateY(-50%);
    }
  }

  ${props => (props.active || props.showLabel) && css`
    &::after {
      opacity: 1;
      transform: translateY(-50%);
    }
  `}

  ${props => props.active && css`
    &::after {
      opacity: 1 !important;
      transform: translateY(-50%);
    }
  `}
  
  &::after {
    content: attr(data-label);
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    background-color: transparent;
    color: #fff;
    padding: 0;
    font-size: 0.75rem;
    font-weight: bold;
    white-space: nowrap;
    opacity: 0;
    transition: all 0.3s ease;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
    text-align: right;
  }
`;

const HeroSection = styled(Section)`
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-color: #000000;
  color: white;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: inherit;
  font-weight: 600;
  position: relative;
  display: inline-block;
  font-family: "Bodoni Moda", serif;
  letter-spacing: 0.05em;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: inherit;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  font-weight: 300;
  letter-spacing: 0.03em;
  
  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #8b4513;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  letter-spacing: 0.05em;
  display: inline-block;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: #a0522d;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(210, 180, 140, 0.5), transparent);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Card = styled.div`
  background-color: rgba(30, 30, 30, 0.8);
  background-image: url('/images/wood-texture.png');
  background-blend-mode: overlay;
  background-size: cover;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  transition: all 0.4s ease;
  border: 2px solid rgba(210, 180, 140, 0.4);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, transparent, #d2b48c, transparent);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(210, 180, 140, 0.3), transparent);
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
    border-color: rgba(210, 180, 140, 0.7);
  }
  
  p {
    color: #f0f0f0;
    line-height: 1.7;
    font-size: 1.05rem;
    margin-bottom: 1.5rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
  
  ul {
    margin: 1.5rem 0;
    padding-left: 0.5rem;
    
    li {
      margin-bottom: 0.75rem;
      padding-left: 1.5rem;
      position: relative;
      color: #e8e8e8;
      line-height: 1.6;
      
      &::before {
        content: '→';
        color: #d2b48c;
        position: absolute;
        left: 0;
        font-weight: bold;
      }
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(210, 180, 140, 0.4);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: #8b4513;
    border-radius: 2px;
  }
`;

const CardIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(139, 69, 19, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.25rem;
  flex-shrink: 0;
  border: 3px solid #d2b48c;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    border: 1px dashed rgba(210, 180, 140, 0.4);
    animation: spin 30s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  img {
    width: 38px;
    height: 38px;
    filter: invert(80%) sepia(40%) saturate(376%) hue-rotate(349deg) brightness(95%) contrast(95%);
  }
`;

const CardTitle = styled.h3`
  color: #d2b48c;
  margin: 0;
  font-size: 1.75rem;
  font-family: 'Bodoni Moda', serif;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.5px;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #a0522d;
    transition: width 0.3s ease;
    margin-top: 5px;
    opacity: 0;
  }
  
  ${Card}:hover & {
    &::after {
      width: 40px;
      opacity: 1;
    }
  }
`;

const GuideButton = styled(Button)`
  background-color: #8b4513;
  border: 2px solid rgba(210, 180, 140, 0.3);
  padding: 0.85rem 1.75rem;
  margin-top: 2rem;
  font-weight: bold;
  letter-spacing: 0.8px;
  font-size: 1.05rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f5f5f5;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.6s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(to right, #8b4513, #d2b48c, #8b4513);
    transition: height 0.3s ease;
  }
  
  &:hover {
    background-color: #a0522d;
    transform: translateY(-3px);
    border-color: rgba(210, 180, 140, 0.6);
    
    &::before {
      left: 100%;
    }
    
    &::after {
      height: 6px;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  max-width: 500px;
  margin: 2rem auto 0 auto;
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

  input, textarea {
    width: 100%;
    font-family: inherit;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    padding: 1rem;
    background: white;
    transition: border-color 0.2s;
    
    &:focus {
      outline: none;
      border-color: #333;
      box-shadow: 0 0 0 2px rgba(51, 51, 51, 0.1);
    }
  }
  
  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

// Additional styled components for specific sections
const OutriderText = styled.h1`
  font-family: "Bodoni Moda", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-size: 5rem;
  letter-spacing: 0.05em;
  color: #fff;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  
  @media (min-width: 768px) {
    font-size: 7rem;
  }
`;

const RealEstateText = styled.h2`
  font-family: "Bodoni Moda", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: italic;
  font-size: 1.8rem;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.1em;
  
  @media (min-width: 768px) {
    font-size: 2.2rem;
  }
`;

const RopeTopImage = styled.img`
  width: 500px;
  height: auto;
  margin: 0 0 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const RopeBottomImage = styled.img`
  width: 500px;
  height: auto;
  margin: 10px 0 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const StoryText = styled.div`
  font-size: 1.15rem;
  line-height: 1.9;
  color: #f0f0f0;
  font-weight: 300;
  letter-spacing: 0.3px;
  
  p {
    margin-bottom: 1.2rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  strong {
    color: #d2b48c;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
  
  em {
    font-style: italic;
    color: #d2b48c;
  }
  max-width: 900px;
  margin: 0 auto;
  text-align: left;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  font-weight: 300;
  letter-spacing: 0.3px;
`;

const StoryTimeline = styled.div`
  position: relative;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 0 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
  
  /* Ensure timeline content is properly positioned */
  & > * {
    position: relative;
  }
`;

const TimelineItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  position: relative;
  padding: 0 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 1.5rem;
    background: linear-gradient(to bottom, rgba(210, 180, 140, 0.5), transparent);
  }
  
  &:last-child::after {
    display: none;
  }
`;

const TimelineLine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 3px;
  background: linear-gradient(to bottom, #d2b48c 0%, #b89b6a 100%);
  transform: translateX(-50%);
  z-index: 1;
`;

const StorySegment = styled.div<{ index: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 6rem;
  position: relative;
  z-index: 2;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 900px) {
    flex-direction: column !important;
    align-items: stretch;
    margin-bottom: 4rem;
  }
`;

const TimelineItemContent = styled.div`
  flex: 1 1 380px;
  max-width: 420px;
  padding: 2rem 2rem 2rem 2rem;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(210, 180, 140, 0.3);
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 2rem;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 900px) {
    margin: 0 0 2rem 0;
    max-width: 100%;
    width: 100%;
  }
`;

const TimelineMedia = styled.div`
  flex: 1 1 320px;
  max-width: 380px;
  min-width: 220px;
  height: 280px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(210, 180, 140, 0.3);
  background: #1a1a1a;
  margin: 0 2rem;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%);
    z-index: 1;
    opacity: 0.7;
    transition: opacity 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.5);
    
    &::before {
      opacity: 0.4;
    }
  }
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  .primary-image,
  .secondary-image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.6s ease;
  }
  
  .secondary-image {
    opacity: 0;
  }
  
  &:hover {
    .primary-image {
      opacity: 0;
    }
    
    .secondary-image {
      opacity: 1;
    }
  }

  @media (max-width: 900px) {
    margin: 0 0 2rem 0;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    height: 180px;
  }
`;

const StoryTitle = styled.h3`
  color: #d2b48c;
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #d2b48c, rgba(210, 180, 140, 0.2));
    border-radius: 2px;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
  position: relative;
  z-index: 2;
  text-align: left;
  font-family: 'Bodoni Moda', serif;
  letter-spacing: 1px;
  font-weight: 500;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(210, 180, 140, 0.3);
`;

const MainStoryTitle = styled.h2`
  color: #d2b48c;
  font-size: 3rem;
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 2;
  text-align: center;
  font-family: 'Bodoni Moda', serif;
  letter-spacing: 2px;
  font-weight: 600;
  text-transform: uppercase;
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 2px;
    background: rgba(210, 180, 140, 0.7);
    margin: 1rem auto 0;
  }
`;



const ScrollHintText = styled.div`
  margin-top: 2rem;
  color: #d2b48c;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1px;
  font-weight: 300;
  
  &::before, &::after {
    content: '→';
    margin: 0 10px;
    display: inline-block;
    transform: rotate(90deg);
  }
`;

const TimelineCard = styled.div`
  position: relative;
  width: 100%;
  padding: 2.5rem;
  border-radius: 12px;
  background: rgba(13, 13, 13, 0.95);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  margin-bottom: 3rem;
  border: 1px solid rgba(210, 180, 140, 0.25);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
    border-color: rgba(210, 180, 140, 0.4);
  }
`;

const TimelineImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #d2b48c;
  box-shadow: 0 0 15px rgba(0,0,0,0.5);
  margin: 0 auto 20px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TimelineItemYear = styled.div`
  font-family: 'Bodoni Moda', serif;
  font-size: 1.2rem;
  font-weight: bold;
  color: #d2b48c;
  margin-bottom: 5px;
  text-align: center;
`;

const TimelineTitle = styled.h4`
  margin: 0 0 15px 0;
  font-size: 1.3rem;
  color: #d2b48c;
  font-family: 'Bodoni Moda', serif;
  text-align: center;
`;

// Background image component that fills the entire width
const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/background/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  transition: opacity 0.2s ease-out;
`;

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [clickedDot, setClickedDot] = useState<string | null>(null);
  const sectionsRef = useRef<{[key: string]: HTMLElement | null}>({});
  const scrollingRef = useRef<boolean>(false);
  const mainRef = useRef<HTMLElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialRef = useRef<NodeJS.Timeout | null>(null);
  // Simplified state for new design - no special scroll handling needed
  const storyContainerRef = useRef<HTMLDivElement>(null);
  const storySegments = [
    { id: 'unformatted-disk', title: 'College Beginnings', bgImage: '/TakeNoBull/campus.jpeg', content: 'Our story begins on the seat of a college office lab chair with a black computer screen prompting: <strong>Unformatted Disk</strong>. Kevin Landen would spend the next six months typewriting his college English papers due to this unresolved hurdle. From this deficiency swelled a desire to never let computers or technology hold back his dreams for the future.' },
    { id: 'marine', title: 'Marine Corps Service', bgImage: '/TakeNoBull/marines2.jpeg', content: 'He subsequently joined the Marine Corps as a 4066, Small Computer Systems Specialist. In the years that followed the Corps, he struggled waiting tables in the service industry. To support his growing family, he constantly worked two and sometimes 3 jobs at the same time.' },
    { id: 'bartending', title: 'Service Industry Experience', bgImage: '/TakeNoBull/serving-wine.png', content: 'From waiting tables, to bartending, to financial services, to real estate - each move was to gather more knowledge and skills. The Marine Corps instilled discipline, a resolve to strive for excellence, and to leave things better than how you found them. As a restaurant server and bartender, customer service, attention to detail, and the client experience were paramount.' },
    { id: 'stocks', title: 'Financial Services', bgImage: '/TakeNoBull/stocks2.png', content: 'Financial services demonstrated ethics, compliance, professionalism, and what it means to be a fiduciary. On selling his home, as numerous others have experienced with the real estate industry, he encountered a void of communication and poor photography and marketing effort. This experience brought him back to the college computer screen so long ago.' },
    { id: 'real-estate', title: 'Real Estate Journey', bgImage: '/TakeNoBull/real-estate.png', content: 'Upon performing transactions on VRBO, Airbnb, rentals, and traditional home sales, he set off to encapsulate the standard of what an agent should be. An outrider. An outrider is a cowhand that rode beside the herd and scouted for water and the best grass to graze. As your realtor, we ride with you to professionally navigate the market conditions.' }
  ];
  
  // Define sections
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'discover', label: 'Discover' },
    { id: 'services', label: 'Services' },
    { id: 'story', label: 'Story' },
    { id: 'guide', label: 'Guide' },
    { id: 'territories', label: 'Territories' },
    { id: 'affiliate', label: 'Affiliate' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  // Scroll to section function
  const scrollToSection = (id: string) => {
    if (sectionsRef.current[id]) {
      if (scrollingRef.current) return;
      
      scrollingRef.current = true;
      setActiveSection(id);
      setClickedDot(id);
      
      const sectionElement = sectionsRef.current[id];
      if (sectionElement) {
        const mainElement = document.querySelector('main');
        if (mainElement) {
          const sectionTop = sectionElement.offsetTop;
          
          mainElement.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
          });
        }
      }
      
      // Hide the clicked label after 2 seconds
      if (id !== activeSection) {
        setTimeout(() => {
          setClickedDot(null);
        }, 2000);
      }
      
      // Reset scrolling flag after animation completes
      setTimeout(() => {
        scrollingRef.current = false;
      }, 1000);
    }
  };

  // We don't need the scroll handler anymore as we're using CSS animations

  useEffect(() => {
    // Setup intersection observer for section animations
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target as HTMLElement;
          section.querySelector('.section-content')?.classList.add('animate');
        }
      });
    }, options);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Setup intersection observer for section navigation
    const navOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };
    
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !scrollingRef.current) {
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
      Object.values(sectionsRef.current).forEach(section => {
        if (section) navObserver.unobserve(section);
      });
    };
  }, [clickedDot]);

  // Set up auto-rotating testimonials
  useEffect(() => {
    testimonialRef.current = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % 6);
    }, 5000);
    
    return () => {
      if (testimonialRef.current) {
        clearInterval(testimonialRef.current);
      }
    };
  }, []);
  
    // No custom scroll handlers needed for the new design


  // Handle scroll for background fade effect only
  useEffect(() => {
    const handleScroll = () => {
      const mainElement = mainRef.current;
      if (mainElement) {
        const scrollPosition = mainElement.scrollTop;
        
        // Get the height of the viewport to calculate the fade
        const viewportHeight = window.innerHeight;
        
        // Fade should complete when reaching the next section (around 100vh of scrolling)
        // Use 90% of viewport height to ensure it's fully faded slightly before the next section
        const fadeDistance = viewportHeight * 0.9;
        
        // Calculate opacity based on scroll position relative to the viewport height
        const newOpacity = Math.max(0, 1 - (scrollPosition / fadeDistance));
        setBackgroundOpacity(newOpacity);
      }
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
      // Initial call
      handleScroll();
    }

    return () => {
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    // Set initial story segment to -1 (title)
    setTimeout(() => {
      // No longer need to set active segment with new design
    }, 500);
  }, []);

  return (
    <>
      <Head>
        <title>Kevin Landen | Real Estate</title>
        <meta name="description" content="Outrider Real Estate with Kevin Landen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo/Logo.svg" />
      </Head>
      <Main id="main-container" ref={mainRef as React.RefObject<HTMLDivElement>} data-scroll="0">
        <ScrollHint />
        <DotNavigation>
          {sections.map(section => (
            <Dot 
              key={section.id} 
              active={activeSection === section.id}
              onClick={() => scrollToSection(section.id)}
              showLabel={clickedDot === section.id}
              data-label={section.label}
            />
          ))}
        </DotNavigation>
        
        {/* Home Section */}
        <HeroSection 
          id="home" 
          ref={(el: HTMLElement | null) => { sectionsRef.current.home = el; }}
          fadeBottom={true}
        >
          {/* Background image with JavaScript-controlled opacity */}
          <BackgroundImage 
            ref={backgroundRef}
            style={{ 
              opacity: backgroundOpacity,
              backgroundPosition: 'center bottom',
              backgroundSize: 'cover'
            }}
          />
          <SectionContent className="section-content">
            <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
              <img 
                src="/Logo/Logo.svg" 
                alt="Outrider Logo" 
                style={{ 
                  width: '120px', 
                  height: '120px', 
                  position: 'absolute',
                  top: '-140px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
                }} 
              />
              <OutriderText>OUTRIDER</OutriderText>
              <RealEstateText>-Real Estate-</RealEstateText>
            </div>
          </SectionContent>
          <ScrollHint />
        </HeroSection>
        
        {/* Discover Section */}
        <Section 
          id="discover" 
          ref={(el: HTMLElement | null) => { sectionsRef.current.discover = el; }}
          bgColor="#000000"
        >
          <SectionContent className="section-content">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <Title>Discover the Outrider Experience</Title>
              <Subtitle>
                No-nonsense advisory with professional and timely communication.
              </Subtitle>
              <p style={{ 
                fontSize: '1.5rem', 
                fontStyle: 'italic', 
                color: '#d2b48c', 
                marginTop: '2rem',
                fontFamily: '"Bodoni Moda", serif'
              }}>
                Let's ride...
              </p>
            </div>
          </SectionContent>
        </Section>

        {/* Our Services Section */}
        <Section 
          id="services" 
          ref={(el: HTMLElement | null) => { sectionsRef.current.services = el; }}
          bgImage="/images/bull-background.png"
          bgColor="#0d0d0d"
          style={{ backgroundPosition: 'center top' }}
        >
          <SectionContent className="section-content">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <Title style={{ color: '#d2b48c', margin: 0, position: 'relative', zIndex: 2 }}>Our Services</Title>
              <Subtitle>
                Professional real estate solutions that deliver results
              </Subtitle>
            </div>
            
            <div className="services-grid">
              {/* Property Sales */}
              <div className="service-card">
                <div className="service-icon">
                  <i className="bi bi-house-check-fill"></i>
                </div>
                <h3>Property Sales</h3>
                <ul className="service-features">
                  <li><i className="bi bi-check-circle-fill"></i> Strategic pricing analysis</li>
                  <li><i className="bi bi-check-circle-fill"></i> Professional photography</li>
                  <li><i className="bi bi-check-circle-fill"></i> Expert market positioning</li>
                  <li><i className="bi bi-check-circle-fill"></i> Skilled negotiation</li>
                  <li><i className="bi bi-check-circle-fill"></i> Smooth transaction management</li>
                </ul>
                <div className="service-footer">
                  <span><i className="bi bi-stars"></i> Maximum value. Minimum hassle.</span>
                </div>
              </div>
              
              {/* Property Acquisition */}
              <div className="service-card">
                <div className="service-icon">
                  <i className="bi bi-house-heart-fill"></i>
                </div>
                <h3>Property Acquisition</h3>
                <ul className="service-features">
                  <li><i className="bi bi-check-circle-fill"></i> Personalized property search</li>
                  <li><i className="bi bi-check-circle-fill"></i> In-depth property evaluation</li>
                  <li><i className="bi bi-check-circle-fill"></i> Strategic offer preparation</li>
                  <li><i className="bi bi-check-circle-fill"></i> Thorough due diligence</li>
                  <li><i className="bi bi-check-circle-fill"></i> Expert negotiation</li>
                </ul>
                <div className="service-footer">
                  <span><i className="bi bi-stars"></i> Finding your perfect match.</span>
                </div>
              </div>
              
              {/* Property Marketing */}
              <div className="service-card">
                <div className="service-icon">
                  <i className="bi bi-bullseye"></i>
                </div>
                <h3>Property Marketing</h3>
                <ul className="service-features">
                  <li><i className="bi bi-check-circle-fill"></i> High-quality photography</li>
                  <li><i className="bi bi-check-circle-fill"></i> Immersive 3D virtual tours</li>
                  <li><i className="bi bi-check-circle-fill"></i> Targeted digital campaigns</li>
                  <li><i className="bi bi-check-circle-fill"></i> Premium print materials</li>
                  <li><i className="bi bi-check-circle-fill"></i> Wide network exposure</li>
                </ul>
                <div className="service-footer">
                  <span><i className="bi bi-stars"></i> Standing out in any market.</span>
                </div>
              </div>
              
              {/* Market Analysis */}
              <div className="service-card">
                <div className="service-icon">
                  <i className="bi bi-graph-up-arrow"></i>
                </div>
                <h3>Market Analysis</h3>
                <ul className="service-features">
                  <li><i className="bi bi-check-circle-fill"></i> Comprehensive market reports</li>
                  <li><i className="bi bi-check-circle-fill"></i> Comparable property analysis</li>
                  <li><i className="bi bi-check-circle-fill"></i> Price trend forecasting</li>
                  <li><i className="bi bi-check-circle-fill"></i> Investment potential assessment</li>
                  <li><i className="bi bi-check-circle-fill"></i> Customized valuation</li>
                </ul>
                <div className="service-footer">
                  <span><i className="bi bi-stars"></i> Data-driven decisions.</span>
                </div>
              </div>
            </div>
            
            <style jsx>{`
              .services-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 2rem;
                max-width: 1100px;
                margin: 0 auto;
              }
              
              .service-card {
                background: rgba(30, 30, 30, 0.9);
                border-radius: 8px;
                padding: 2rem;
                display: flex;
                flex-direction: column;
                border: 1px solid rgba(210, 180, 140, 0.3);
                transition: all 0.3s ease;
                height: 100%;
                box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
              }
              
              .service-card:hover {
                transform: translateY(-5px);
                border-color: #d2b48c;
                box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
              }
              
              .service-icon {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: linear-gradient(135deg, rgba(139, 69, 19, 0.25), rgba(210, 180, 140, 0.2));
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1.5rem;
                border: 2px solid rgba(210, 180, 140, 0.3);
                transition: all 0.3s ease;
              }
              
              .service-icon i {
                font-size: 2.2rem;
                color: #d2b48c;
                transition: all 0.3s ease;
              }
              
              .service-card:hover .service-icon {
                background: linear-gradient(135deg, rgba(210, 180, 140, 0.25), rgba(139, 69, 19, 0.2));
                transform: scale(1.1) rotate(5deg);
              }
              
              .service-card:hover .service-icon i {
                transform: scale(1.1);
              }
              
              .service-card h3 {
                color: #d2b48c;
                font-family: 'Bodoni Moda', serif;
                font-size: 1.4rem;
                margin: 0 0 1.2rem 0;
                letter-spacing: 0.5px;
              }
              
              .service-features {
                list-style: none;
                padding: 0;
                margin: 0 0 1.5rem 0;
                flex-grow: 1;
              }
              
              .service-features li {
                position: relative;
                padding-left: 1.8rem;
                margin-bottom: 0.7rem;
                color: #e0e0e0;
                font-size: 0.95rem;
                display: flex;
                align-items: center;
                transition: all 0.2s ease;
              }
              
              .service-features li:hover {
                color: #ffffff;
                transform: translateX(5px);
              }
              
              .service-features li i {
                margin-right: 0.7rem;
                color: #d2b48c;
                font-size: 0.8rem;
                transition: all 0.2s ease;
              }
              
              .service-features li:hover i {
                transform: scale(1.2);
              }
              
              .service-footer {
                margin-top: auto;
                padding-top: 1rem;
                border-top: 1px solid rgba(210, 180, 140, 0.2);
                font-style: italic;
                color: #d2b48c;
                font-size: 0.95rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                transition: all 0.3s ease;
              }
              
              .service-footer i {
                color: #d2b48c;
                animation: pulse 2s infinite;
              }
              
              @keyframes pulse {
                0% { transform: scale(1); opacity: 0.7; }
                50% { transform: scale(1.2); opacity: 1; }
                100% { transform: scale(1); opacity: 0.7; }
              }
              
              @media (max-width: 768px) {
                .service-card {
                  padding: 1.5rem;
                }
                
                .service-card h3 {
                  font-size: 1.2rem;
                }
                
                .service-features li {
                  font-size: 0.9rem;
                  margin-bottom: 0.5rem;
                }
              }
            `}</style>
          </SectionContent>
        </Section>
        
        {/* Story/About Section */}
        <Section 
          id="story" 
          ref={(el: HTMLElement | null) => { sectionsRef.current.story = el; }}
          isStorySection={true}
        >
          <SectionContent className="section-content">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
                <RopeTopImage src="/images/rope-top.png" alt="Rope decoration" />
              </div>
              
              {/* New Timeline Design for Story Section */}
              <div style={{ padding: '2rem', position: 'relative' }} ref={storyContainerRef}>
                <MainStoryTitle 
                  style={{
                    fontSize: '3.5rem',
                    marginBottom: '3rem',
                    textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                    position: 'relative',
                    display: 'inline-block',
                    paddingBottom: '1rem'
                  }}
                >
                  Take No Bull
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #d2b48c, rgba(210, 180, 140, 0.2))',
                    borderRadius: '2px'
                  }} />
                </MainStoryTitle>
                
                <StoryTimeline>
                  {/* Vertical Timeline Line */}
                  <TimelineLine />
                  
                  {/* Timeline dots removed for cleaner design */}
                  
                  {/* Story segments without dots */}
                  {storySegments.map((segment, index) => (
                    <StorySegment key={segment.id} index={index}>

                      {/* Content Card */}
                      <TimelineCard>
                        <StoryTitle>{segment.title}</StoryTitle>
                        <StoryText dangerouslySetInnerHTML={{ __html: segment.content }} />
                      </TimelineCard>

                      {/* Media Section with hover effect */}
                      <TimelineMedia>
                        {/* Primary Image (shown by default) */}
                        <img 
                          className="primary-image"
                          src={segment.bgImage} 
                          alt={segment.title} 
                        />
                        
                        {/* Secondary Image (shown on hover) */}
                        <img 
                          className="secondary-image"
                          src={`/TakeNoBull/${segment.id}.png`} 
                          alt={`${segment.title} icon`} 
                        />
                        
                        {/* Icon indicator */}
                        <div style={{ position: 'absolute', bottom: '15px', right: '15px', zIndex: 2 }}>
                          <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #d2b48c', boxShadow: '0 2px 6px rgba(0,0,0,0.4)' }}>
                            <img 
                              src={`/TakeNoBull/${segment.id}.png`} 
                              alt={segment.title} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                          </div>
                        </div>
                      </TimelineMedia>
                    </StorySegment>
                  ))}
                </StoryTimeline>
              </div>
              
              {/* Bottom rope decoration */}
              <div style={{ maxWidth: '800px', margin: '2rem auto 0', position: 'relative' }}>
                <RopeBottomImage src="/images/rope-bottom.png" alt="Rope decoration" />
              </div>
            </div>
          </SectionContent>
        </Section>
        
        {/* Guide Section */}
        <Section 
          id="guide" 
          ref={(el: HTMLElement | null) => { sectionsRef.current.guide = el; }}
          bgColor="#0d0d0d"
        >
          <SectionContent className="section-content">
            <div style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative' }}>
              <Title 
                style={{ 
                  marginBottom: '1.5rem',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  color: '#d2b48c'
                }}
              >
                Real Estate Guides
              </Title>
              
              <div style={{ marginTop: '1.5rem', marginBottom: '3rem' }}>
                <Subtitle style={{ 
                  maxWidth: '700px', 
                  margin: '0 auto',
                  fontSize: '1.3rem',
                  lineHeight: '1.7',
                  color: '#ffffff',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  padding: '15px 25px',
                  borderRadius: '8px',
                  display: 'inline-block',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                }}>
                  Exclusive resources to help you navigate the real estate journey with confidence.
                  Download these comprehensive guides to make informed decisions in today's market.
                </Subtitle>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginTop: '2rem',
                gap: '1.5rem',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  background: 'rgba(139, 69, 19, 0.15)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ color: '#d2b48c' }}>✓</span>
                  <span>Expert Market Insights</span>
                </div>
                
                <div style={{
                  background: 'rgba(139, 69, 19, 0.15)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ color: '#d2b48c' }}>✓</span>
                  <span>Actionable Strategies</span>
                </div>
                
                <div style={{
                  background: 'rgba(139, 69, 19, 0.15)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ color: '#d2b48c' }}>✓</span>
                  <span>Free Downloads</span>
                </div>
              </div>
            </div>
            
            <Grid>
              <Card>
                <CardHeader>
                  <CardIcon>
                    <i className="bi bi-house-door-fill" style={{ fontSize: '2.5rem', color: '#d2b48c' }} />
                  </CardIcon>
                  <CardTitle>Buyer's Guide</CardTitle>
                </CardHeader>
                
                <p>
                  Your comprehensive roadmap to purchasing property in today's market. From financing to closing, we've got you covered.
                </p>
                
                <ul>
                  <li>Understanding today's unique market conditions</li>
                  <li>Financing options and securing pre-approval</li>
                  <li>Property search strategies and evaluating locations</li>
                  <li>Crafting competitive offers that stand out</li>
                  <li>Inspection process and due diligence protocols</li>
                  <li>Navigating the closing process and associated costs</li>
                </ul>
                
                <GuideButton>
                  <span style={{ marginRight: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 13L12 16L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 16L20 18C20 19.1046 19.1046 20 18 20L6 20C4.89543 20 4 19.1046 4 18L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Download Buyer's Guide
                </GuideButton>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardIcon>
                    <i className="bi bi-cash-coin" style={{ fontSize: '2.5rem', color: '#d2b48c' }} />
                  </CardIcon>
                  <CardTitle>Seller's Guide</CardTitle>
                </CardHeader>
                
                <p>
                  Maximize your property's value and streamline the selling process with our proven strategies and insider tips.
                </p>
                
                <ul>
                  <li>Preparing your home to attract maximum attention</li>
                  <li>Strategic pricing techniques for today's market</li>
                  <li>Advanced marketing and photography approaches</li>
                  <li>Negotiating offers to secure the best terms</li>
                  <li>Managing inspections and addressing concerns</li>
                  <li>Streamlining closing procedures for a smooth transition</li>
                </ul>
                
                <GuideButton>
                  <span style={{ marginRight: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 13L12 16L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 16L20 18C20 19.1046 19.1046 20 18 20L6 20C4.89543 20 4 19.1046 4 18L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Download Seller's Guide
                </GuideButton>
              </Card>
            </Grid>
            
            <div style={{ maxWidth: '800px', margin: '4rem auto 0', textAlign: 'center', position: 'relative' }}>
              <div style={{ 
                background: 'rgba(30, 30, 30, 0.85)',
                padding: '1rem 2rem',
                borderRadius: '6px',
                border: '1px solid rgba(210, 180, 140, 0.3)',
                display: 'inline-block'
              }}>
                <p style={{ 
                  margin: 0, 
                  fontStyle: 'italic',
                  color: '#d2b48c',
                  fontSize: '1.1rem'
                }}>
                  "Knowledge is power in real estate. Get yours today."
                </p>
              </div>
            </div>
          </SectionContent>
        </Section>
        
        {/* Territories Section */}
        <Section 
          id="territories" 
          ref={(el: HTMLElement | null) => { sectionsRef.current.territories = el; }}
          bgImage="/images/mother-bg.jpeg"
          bgColor="#121212"
        >
          <SectionContent className="section-content">
            <div style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative' }}>
              <Title 
                style={{ 
                  marginBottom: '1.5rem',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  color: '#d2b48c'
                }}
              >
                Service Territories
              </Title>
              
              <Subtitle style={{ 
                maxWidth: '700px', 
                margin: '0 auto',
                fontSize: '1.2rem',
                lineHeight: '1.7',
                color: '#e0e0e0'
              }}>
                We proudly serve these beautiful communities in Southern California's mountain regions,
                bringing our expertise to each unique area.
              </Subtitle>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginTop: '2rem',
                gap: '1.5rem',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  background: 'rgba(139, 69, 19, 0.15)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ color: '#d2b48c' }}>❖</span>
                  <span>Mountain Communities</span>
                </div>
                
                <div style={{
                  background: 'rgba(139, 69, 19, 0.15)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ color: '#d2b48c' }}>❖</span>
                  <span>Local Expertise</span>
                </div>
                
                <div style={{
                  background: 'rgba(139, 69, 19, 0.15)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ color: '#d2b48c' }}>❖</span>
                  <span>Market Specialists</span>
                </div>
              </div>
            </div>
            
            <div style={{ 
              width: '100%',
              maxWidth: '100%',
              margin: '0 auto',
              position: 'relative',
              padding: '1rem 0'
            }}>
              {/* Left navigation arrow */}
              <button 
                onClick={() => {
                  const container = document.querySelector('.territories-container');
                  if (container) {
                    container.scrollBy({ left: -370, behavior: 'smooth' });
                  }
                }}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 3,
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(30, 30, 30, 0.8)',
                  border: '2px solid rgba(210, 180, 140, 0.6)',
                  color: '#d2b48c',
                  fontSize: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  outline: 'none'
                }}
                aria-label="Scroll left"
              >
                &#8592;
              </button>
              
              {/* Right navigation arrow */}
              <button 
                onClick={() => {
                  const container = document.querySelector('.territories-container');
                  if (container) {
                    container.scrollBy({ left: 370, behavior: 'smooth' });
                  }
                }}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 3,
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(30, 30, 30, 0.8)',
                  border: '2px solid rgba(210, 180, 140, 0.6)',
                  color: '#d2b48c',
                  fontSize: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  outline: 'none'
                }}
                aria-label="Scroll right"
              >
                &#8594;
              </button>
              
              <div style={{
                display: 'flex',
                gap: '2rem',
                overflowX: 'auto',
                padding: '1rem 2rem',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }} className="territories-container">
              {[
                { 
                  name: 'Anza', 
                  image: '/Service-Territoy/anza.jpeg', 
                  elevation: '3,921 ft',
                  description: 'A serene rural community with wide open spaces, ranches, and breathtaking starry skies, perfect for those seeking a peaceful country lifestyle.',
                  highlights: ['Rural charm', 'Expansive land', 'Affordable properties']
                },
                { 
                  name: 'Aguanga', 
                  image: '/Service-Territoy/aguanga.jpeg', 
                  elevation: '1,955 ft',
                  description: 'A hidden gem in the heart of Southern California with a western feel, offering privacy, space, and stunning mountain vistas.',
                  highlights: ['Privacy', 'Scenic views', 'Country living']
                },
                { 
                  name: 'Idyllwild', 
                  image: '/Service-Territoy/idyllwild.jpeg', 
                  elevation: '5,413 ft',
                  description: 'An artistic mountain community nestled among tall pines, featuring unique cabins, fresh air, and a vibrant arts scene.',
                  highlights: ['Arts community', 'Mountain cabins', 'Year-round recreation']
                },
                { 
                  name: 'Mountain Center', 
                  image: '/Service-Territoy/mountain-center.jpeg', 
                  elevation: '4,518 ft',
                  description: 'A tranquil mountain retreat with diverse property options, outdoor recreation, and a close-knit community atmosphere.',
                  highlights: ['Forest surroundings', 'Mild seasons', 'Outdoor lifestyle']
                }
              ].map((territory, index) => (
                <div key={index} style={{ 
                  borderRadius: '12px', 
                  overflow: 'hidden',
                  backgroundColor: 'rgba(30, 30, 30, 0.8)',
                  backgroundImage: 'url("/images/wood-texture.png")',
                  backgroundBlendMode: 'overlay',
                  backgroundSize: 'cover',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  border: '2px solid rgba(210, 180, 140, 0.4)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                  position: 'relative',
                  minWidth: '320px',
                  maxWidth: '350px',
                  flex: '0 0 auto'
                }} className="territory-card">
                  <div style={{ 
                    height: '220px', 
                    backgroundImage: `url(${territory.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    borderBottom: '3px solid rgba(210, 180, 140, 0.5)'
                  }}>
                    {/* Image overlay with radial gradient */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)'
                    }} />
                    
                    {/* Territory badge with elevation */}
                    <div style={{ 
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      background: 'rgba(139, 69, 19, 0.85)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12L18 16V13H12V16L8 12L12 8V11H18V8L22 12Z" stroke="currentColor" fill="currentColor" />
                        <path d="M4 9H2V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V18H4V9Z" stroke="currentColor" fill="currentColor" />
                      </svg>
                      {territory.elevation}
                    </div>
                    
                    {/* Territory name */}
                    <div style={{ 
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.85))',
                      padding: '25px 20px 15px'
                    }}>
                      <h3 style={{ 
                        color: '#d2b48c', 
                        margin: 0, 
                        fontSize: '1.7rem', 
                        fontFamily: '"Bodoni Moda", serif',
                        textShadow: '1px 1px 3px rgba(0,0,0,0.7)' 
                      }}>{territory.name}</h3>
                    </div>
                  </div>
                  
                  <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ 
                        color: '#f0f0f0', 
                        marginBottom: '1.5rem', 
                        lineHeight: '1.7',
                        fontSize: '1.05rem',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                      }}>
                        {territory.description}
                      </p>
                      
                      <div style={{ marginBottom: '1.5rem' }}>
                        {territory.highlights.map((highlight, i) => (
                          <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '8px',
                            color: '#e0e0e0'
                          }}>
                            <span style={{ 
                              color: '#d2b48c', 
                              marginRight: '10px',
                              fontSize: '0.9rem'
                            }}>→</span>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div style={{
                      borderTop: '1px solid rgba(210, 180, 140, 0.3)',
                      paddingTop: '1.2rem',
                      marginTop: 'auto',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <Button style={{ 
                        padding: '0.75rem 1.5rem', 
                        fontSize: '1rem',
                        backgroundColor: '#8b4513',
                        border: '2px solid rgba(210, 180, 140, 0.3)',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                      }}>
                        <span>Explore Area</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
            
            <div style={{ 
              maxWidth: '800px', 
              margin: '4rem auto 0', 
              textAlign: 'center', 
              position: 'relative',
              background: 'rgba(30, 30, 30, 0.85)',
              padding: '1.5rem 2rem',
              borderRadius: '6px',
              border: '1px solid rgba(210, 180, 140, 0.3)'
            }}>
              <h3 style={{ 
                color: '#d2b48c', 
                margin: '0 0 1rem 0',
                fontFamily: '"Bodoni Moda", serif',
                fontSize: '1.5rem'
              }}>Serving Southern California's Mountain Communities</h3>
              <p style={{ 
                margin: 0, 
                color: '#e0e0e0',
                lineHeight: '1.7',
                fontSize: '1.05rem'
              }}>
                Each area has its own distinct charm and real estate opportunities.
                Let us guide you through the unique characteristics of these beautiful territories.
              </p>
            </div>
            
            <style jsx global>{`
              .territory-card:hover {
                transform: translateY(-10px);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
                border-color: rgba(210, 180, 140, 0.7);
              }
              
              .territory-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(to right, transparent, #d2b48c, transparent);
                opacity: 0;
                transition: opacity 0.3s ease;
              }
              
              .territory-card:hover::before {
                opacity: 1;
              }
            `}</style>
          </SectionContent>
        </Section>
        

        
        {/* Affiliate Section */}
        <Section 
          id="affiliate" 
          ref={(el: HTMLElement | null) => { sectionsRef.current.affiliate = el; }}
          bgColor="#121212"
        >
          <SectionContent className="section-content">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <Title style={{ color: '#d2b48c', margin: 0, position: 'relative', zIndex: 2 }}>Affiliate Program</Title>
              <Subtitle>
                Partner with us and grow your business while providing value to your clients.
              </Subtitle>
            </div>
            
            <Card style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h3 style={{ color: '#d2b48c', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Benefits of Partnership</h3>
              
              <ul style={{ lineHeight: '1.8', fontSize: '1.1rem', paddingLeft: '1.5rem' }}>
                <li>Competitive referral fees for successful transactions</li>
                <li>Co-marketing opportunities to expand your reach</li>
                <li>Access to exclusive property listings</li>
                <li>Joint client presentations and consultations</li>
                <li>Regular updates on market trends and opportunities</li>
                <li>Professional support throughout the entire process</li>
              </ul>
              
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Button style={{ backgroundColor: '#8b4513' }}>Join Our Affiliate Program</Button>
              </div>
            </Card>
          </SectionContent>
        </Section>
        
        {/* Testimonials Section */}
        <Section 
          id="testimonials" 
          ref={(el: HTMLElement | null) => { sectionsRef.current.testimonials = el; }}
          bgColor="#0d0d0d"
        >
          <SectionContent className="section-content">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <Title style={{ color: '#d2b48c', margin: 0, position: 'relative', zIndex: 2 }}>Client Testimonials</Title>
              <Subtitle>
                Don't just take our word for it - hear what our clients have to say.
              </Subtitle>
            </div>
            
            <div style={{ 
              width: '100%',
              maxWidth: '900px',
              margin: '0 auto',
              position: 'relative'
            }}>
              {/* Testimonial carousel */}
              <div style={{ 
                position: 'relative',
                minHeight: '300px',
                overflow: 'hidden'
              }}>
                {[
                  {
                    quote: "Kevin's no-nonsense approach was exactly what we needed. He sold our property quickly and for more than we expected. Highly recommend!",
                    author: "Sarah & John D."
                  },
                  {
                    quote: "Working with Outrider Real Estate made buying our dream ranch property a smooth process. Kevin's knowledge of rural properties is unmatched.",
                    author: "Michael T."
                  },
                  {
                    quote: "I appreciate the straight talk and honest advice. No games, just results. That's why I keep coming back to Kevin for all my real estate needs.",
                    author: "Lisa R."
                  },
                  {
                    quote: "As a first-time home buyer in the mountain area, I was overwhelmed until I found Kevin. His expertise and patience made all the difference in finding our perfect cabin retreat.",
                    author: "James & Emily W."
                  },
                  {
                    quote: "After trying to sell with two other agents, Kevin came in with a clear strategy and sold our property in just 3 weeks. His market knowledge is exceptional.",
                    author: "Robert K."
                  },
                  {
                    quote: "The Outrider team went above and beyond to help us find our dream ranch. Their knowledge of water rights and rural properties saved us from making costly mistakes.",
                    author: "Maria & David H."
                  }
                ].map((testimonial, index) => (
                  <Card key={index} style={{ 
                    backgroundColor: 'rgba(139, 69, 19, 0.2)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(210, 180, 140, 0.3)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    opacity: activeTestimonial === index ? 1 : 0,
                    transform: `translateX(${activeTestimonial === index ? 0 : (activeTestimonial > index ? -100 : 100)}%)`,
                    transition: 'opacity 0.8s ease, transform 0.8s ease',
                    pointerEvents: activeTestimonial === index ? 'auto' : 'none'
                  }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#d2b48c', fontFamily: '"Bodoni Moda", serif' }}>"</div>
                    <p style={{ 
                      fontStyle: 'italic', 
                      marginBottom: '1.5rem',
                      lineHeight: '1.6',
                      fontSize: '1.1rem'
                    }}>{testimonial.quote}</p>
                    <div style={{ 
                      fontWeight: 'bold',
                      color: '#d2b48c'
                    }}>- {testimonial.author}</div>
                  </Card>
                ))}
              </div>
              
              {/* Carousel indicators */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginTop: '2rem',
                gap: '0.5rem'
              }}>
                {[0, 1, 2, 3, 4, 5].map(index => (
                  <button 
                    key={index}
                    onClick={() => {
                      setActiveTestimonial(index);
                      
                      // Reset the auto-rotation timer when manually changing
                      if (testimonialRef.current) {
                        clearInterval(testimonialRef.current);
                      }
                      
                      testimonialRef.current = setInterval(() => {
                        setActiveTestimonial(prev => (prev + 1) % 6);
                      }, 5000);
                    }}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: activeTestimonial === index ? '#d2b48c' : 'rgba(210, 180, 140, 0.3)',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease'
                    }}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </SectionContent>
        </Section>

        {/* Contact Section */}
        <Section 
          id="contact" 
          ref={(el: HTMLElement | null) => { sectionsRef.current.contact = el; }}
          bgColor="#121212"
        >
          <SectionContent className="section-content">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <Title 
                style={{ 
                  marginBottom: '1.5rem',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  color: '#d2b48c'
                }}
              >
                Contact Us
              </Title>
              <Subtitle style={{ 
                maxWidth: '700px', 
                margin: '0 auto',
                fontSize: '1.2rem',
                lineHeight: '1.7',
                color: '#e0e0e0'
              }}>
                Ready to start your real estate journey? Get in touch with us today.
              </Subtitle>
            </div>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {/* Contact Form */}
              <div style={{ 
                backgroundColor: 'rgba(30, 30, 30, 0.8)',
                backgroundImage: 'url("/images/wood-texture.png")',
                backgroundBlendMode: 'overlay',
                backgroundSize: 'cover',
                borderRadius: '12px',
                padding: '2.5rem',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                border: '2px solid rgba(210, 180, 140, 0.4)'
              }}>
                <h3 style={{ 
                  color: '#d2b48c', 
                  marginBottom: '1.5rem', 
                  fontSize: '1.5rem',
                  fontFamily: '"Bodoni Moda", serif',
                  textAlign: 'center'
                }}>
                  Send Us a Message
                </h3>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    color: '#d2b48c',
                    fontSize: '0.9rem'
                  }}>
                    Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="Your name"
                    style={{ 
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid rgba(210, 180, 140, 0.3)',
                      borderRadius: '4px',
                      color: '#fff',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    color: '#d2b48c',
                    fontSize: '0.9rem'
                  }}>
                    Email
                  </label>
                  <input 
                    type="email" 
                    placeholder="Your email"
                    style={{ 
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid rgba(210, 180, 140, 0.3)',
                      borderRadius: '4px',
                      color: '#fff',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    color: '#d2b48c',
                    fontSize: '0.9rem'
                  }}>
                    Message
                  </label>
                  <textarea 
                    placeholder="How can we help you?"
                    rows={5}
                    style={{ 
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid rgba(210, 180, 140, 0.3)',
                      borderRadius: '4px',
                      color: '#fff',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  ></textarea>
                </div>
                
                <Button style={{ 
                  backgroundColor: '#8b4513',
                  border: '2px solid rgba(210, 180, 140, 0.3)',
                  padding: '0.85rem 1.75rem',
                  width: '100%',
                  fontWeight: 'bold',
                  fontSize: '1.05rem',
                  borderRadius: '6px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                }}>
                  Send Message
                </Button>
              </div>
              
              {/* Contact Information */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ 
                    color: '#d2b48c', 
                    marginBottom: '1.5rem', 
                    fontSize: '1.5rem',
                    fontFamily: '"Bodoni Moda", serif'
                  }}>
                    Get In Touch
                  </h3>
                  
                  <div style={{ marginBottom: '2rem' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{ 
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'rgba(139, 69, 19, 0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1rem',
                        flexShrink: 0,
                        border: '1px solid rgba(210, 180, 140, 0.3)'
                      }}>
                        <i className="bi bi-telephone-fill" style={{ color: '#d2b48c', fontSize: '1.1rem' }} />
                      </div>
                      <div>
                        <h4 style={{ color: '#d2b48c', marginBottom: '0.5rem' }}>Phone</h4>
                        <p style={{ color: '#e0e0e0', lineHeight: '1.6' }}>(555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{ 
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'rgba(139, 69, 19, 0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1rem',
                        flexShrink: 0,
                        border: '1px solid rgba(210, 180, 140, 0.3)'
                      }}>
                        <i className="bi bi-envelope-fill" style={{ color: '#d2b48c', fontSize: '1.1rem' }} />
                      </div>
                      <div>
                        <h4 style={{ color: '#d2b48c', marginBottom: '0.5rem' }}>Email</h4>
                        <p style={{ color: '#e0e0e0', lineHeight: '1.6' }}>info@outriderrealestate.com</p>
                      </div>
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start'
                    }}>
                      <div style={{ 
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'rgba(139, 69, 19, 0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1rem',
                        flexShrink: 0,
                        border: '1px solid rgba(210, 180, 140, 0.3)'
                      }}>
                        <i className="bi bi-geo-alt-fill" style={{ color: '#d2b48c', fontSize: '1.1rem' }} />
                      </div>
                      <div>
                        <h4 style={{ color: '#d2b48c', marginBottom: '0.5rem' }}>Location</h4>
                        <p style={{ color: '#e0e0e0', lineHeight: '1.6' }}>Serving Anza, Aguanga, Idyllwild, and Mountain Center</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionContent>
        </Section>

        {/* Footer Section */}
        <footer style={{
          backgroundColor: '#121212',
          borderTop: '1px solid rgba(210, 180, 140, 0.3)',
          padding: '3rem 1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
              <img 
                src="/Logo/Logo.svg" 
                alt="Outrider Logo" 
                style={{ 
                  width: '80px', 
                  height: '80px',
                  marginBottom: '1rem',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }} 
              />
              <div style={{ 
                fontSize: '1.5rem', 
                fontFamily: '"Bodoni Moda", serif',
                color: '#d2b48c',
                marginBottom: '0.5rem'
              }}>
                OUTRIDER REAL ESTATE
              </div>
              <div style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>
                Professionally navigating the market conditions
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '2rem',
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}>
              <div>
                <h4 style={{ color: '#d2b48c', marginBottom: '1rem', fontSize: '1.1rem' }}>Contact</h4>
                <div style={{ color: '#a0a0a0', marginBottom: '0.5rem' }}>info@outriderrealestate.com</div>
                <div style={{ color: '#a0a0a0', marginBottom: '0.5rem' }}>(555) 123-4567</div>
              </div>
              
              <div>
                <h4 style={{ color: '#d2b48c', marginBottom: '1rem', fontSize: '1.1rem' }}>Service Areas</h4>
                <div style={{ color: '#a0a0a0', marginBottom: '0.5rem' }}>Anza • Aguanga</div>
                <div style={{ color: '#a0a0a0', marginBottom: '0.5rem' }}>Idyllwild • Mountain Center</div>
              </div>
              
              <div>
                <h4 style={{ color: '#d2b48c', marginBottom: '1rem', fontSize: '1.1rem' }}>Follow Us</h4>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <a href="#" style={{ color: '#d2b48c', fontSize: '1.2rem' }}>FB</a>
                  <a href="#" style={{ color: '#d2b48c', fontSize: '1.2rem' }}>IG</a>
                  <a href="#" style={{ color: '#d2b48c', fontSize: '1.2rem' }}>LI</a>
                </div>
              </div>
            </div>
            
            <div style={{ borderTop: '1px solid rgba(210, 180, 140, 0.2)', paddingTop: '1.5rem' }}>
              <div style={{ color: '#707070', fontSize: '0.8rem' }}>
                © {new Date().getFullYear()} Outrider Real Estate. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </Main>
    </>
  );
}