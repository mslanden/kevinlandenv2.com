import styled from 'styled-components';
import Container from './Container';

interface SectionProps {
  id?: string;
  bgColor?: string;
  padding?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
}

const StyledSection = styled.section<{ bgColor?: string; padding: string }>`
  background-color: ${props => props.bgColor || 'transparent'};
  
  ${props => props.padding === 'small' && `
    padding: 2rem 0;
  `}
  
  ${props => props.padding === 'medium' && `
    padding: 4rem 0;
    
    @media (min-width: ${props.theme.breakpoints.tablet}) {
      padding: 5rem 0;
    }
  `}
  
  ${props => props.padding === 'large' && `
    padding: 5rem 0;
    
    @media (min-width: ${props.theme.breakpoints.tablet}) {
      padding: 7rem 0;
    }
  `}
`;

const Section: React.FC<SectionProps> = ({
  id,
  bgColor,
  padding = 'medium',
  children,
  className,
  fluid = false,
}) => {
  return (
    <StyledSection 
      id={id} 
      bgColor={bgColor} 
      padding={padding}
      className={className}
    >
      <Container fluid={fluid}>
        {children}
      </Container>
    </StyledSection>
  );
};

export default Section;