import styled from 'styled-components';

const ServicesSection = styled.div`
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.text};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ServiceCard = styled.div`
  background-color: ${props => props.theme.colors.light};
  border-radius: 8px;
  padding: 2.5rem 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.primary};
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
`;

const ContactWrapper = styled.div`
  margin-top: 3rem;
  text-align: center;
`;

const ContactText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
`;

const ContactButton = styled.a`
  display: inline-block;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.light};
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
`;

const Services = () => {
  const services = [
    {
      id: 1,
      icon: '🏡',
      title: 'Property Listings',
      description: 'Comprehensive listings of country western properties, ranches, and rural estates tailored to your specific needs and preferences.'
    },
    {
      id: 2,
      icon: '💼',
      title: 'Buying Assistance',
      description: 'Expert guidance throughout the buying process, from property selection to negotiations and closing, ensuring a smooth transaction.'
    },
    {
      id: 3,
      icon: '📊',
      title: 'Selling Services',
      description: 'Strategic marketing and selling services to showcase your property to the right buyers and maximize your return on investment.'
    },
    {
      id: 4,
      icon: '🔍',
      title: 'Property Valuation',
      description: 'Accurate property valuation services based on market trends, property features, and comparable sales in your area.'
    },
    {
      id: 5,
      icon: '🏘️',
      title: 'Investment Advice',
      description: 'Personalized investment advice for those looking to expand their real estate portfolio in the country western property market.'
    },
    {
      id: 6,
      icon: '📝',
      title: 'Legal Assistance',
      description: 'Comprehensive legal support for all aspects of real estate transactions, ensuring your interests are protected throughout the process.'
    }
  ];

  return (
    <ServicesSection id="services">
      <SectionTitle>Our Services</SectionTitle>
      <SectionSubtitle>
        Kevin Landen provides a comprehensive range of real estate services tailored to country western properties
      </SectionSubtitle>
      
      <ServicesGrid>
        {services.map(service => (
          <ServiceCard key={service.id}>
            <ServiceIcon>{service.icon}</ServiceIcon>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
          </ServiceCard>
        ))}
      </ServicesGrid>
      
      <ContactWrapper>
        <ContactText>
          Looking for a specific service that's not listed? We offer customized solutions for unique needs.
        </ContactText>
        <ContactButton href="/contact">Contact Us</ContactButton>
      </ContactWrapper>
    </ServicesSection>
  );
};

export default Services;