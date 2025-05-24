import React from 'react';
import styled from 'styled-components';

const DotNavigationContainer = styled.div`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  z-index: 100;
  
  @media (max-width: 768px) {
    right: 1rem;
    gap: 1rem;
  }
`;

const Dot = styled.button<{ isActive: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ isActive }) => isActive ? '#8B4513' : 'rgba(0, 0, 0, 0.3)'};
  border: 2px solid ${({ isActive }) => isActive ? '#8B4513' : 'transparent'};
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.3);
    background-color: #8B4513;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.3);
  }
`;

const Tooltip = styled.span<{ isActive: boolean }>`
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: #8B4513;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
  margin-right: 1rem;
  pointer-events: none;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -4px;
    transform: translateY(-50%);
    border-width: 4px 0 4px 4px;
    border-style: solid;
    border-color: transparent transparent transparent #8B4513;
  }
`;

interface DotNavigationProps {
  sections: Array<{ id: string; label: string }>;
  activeSection: string;
  onDotClick: (id: string) => void;
}

const DotNavigation: React.FC<DotNavigationProps> = ({ 
  sections, 
  activeSection,
  onDotClick
}) => {
  const [hoveredDot, setHoveredDot] = React.useState<string | null>(null);

  return (
    <DotNavigationContainer>
      {sections.map(({ id, label }) => (
        <div 
          key={id}
          style={{ position: 'relative' }}
          onMouseEnter={() => setHoveredDot(id)}
          onMouseLeave={() => setHoveredDot(null)}
        >
          <Tooltip isActive={hoveredDot === id || activeSection === id}>
            {label}
          </Tooltip>
          <Dot
            isActive={activeSection === id}
            onClick={() => onDotClick(id)}
            aria-label={`Scroll to ${label}`}
            aria-current={activeSection === id ? 'location' : undefined}
          />
        </div>
      ))}
    </DotNavigationContainer>
  );
};

export default DotNavigation;
