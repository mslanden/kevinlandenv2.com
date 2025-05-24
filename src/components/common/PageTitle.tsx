import styled from 'styled-components';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const TitleContainer = styled.div<{ centered: boolean }>`
  margin-bottom: 2.5rem;
  text-align: ${props => props.centered ? 'center' : 'left'};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.75rem;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  max-width: 700px;
  margin: ${props => props.theme.text === 'center' ? '0 auto' : '0'};
  line-height: 1.6;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.25rem;
  }
`;

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subtitle,
  centered = false,
  className,
}) => {
  return (
    <TitleContainer centered={centered} className={className}>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </TitleContainer>
  );
};

export default PageTitle;