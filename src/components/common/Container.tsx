import styled from 'styled-components';

interface ContainerProps {
  fluid?: boolean;
  children: React.ReactNode;
  className?: string;
}

const StyledContainer = styled.div<{ fluid: boolean }>`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1rem;
  padding-left: 1rem;
  
  ${props => !props.fluid && `
    max-width: 1200px;
    
    @media (max-width: ${props.theme.breakpoints.desktop}) {
      max-width: 960px;
    }
    
    @media (max-width: ${props.theme.breakpoints.tablet}) {
      max-width: 720px;
    }
    
    @media (max-width: ${props.theme.breakpoints.mobile}) {
      max-width: 100%;
    }
  `}
`;

const Container: React.FC<ContainerProps> = ({ 
  fluid = false, 
  children, 
  className 
}) => {
  return (
    <StyledContainer fluid={fluid} className={className}>
      {children}
    </StyledContainer>
  );
};

export default Container;