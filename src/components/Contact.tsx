import { useState } from 'react';
import styled from 'styled-components';

const ContactSection = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactInfo = styled.div`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.light};
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContactTitle = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
`;

const ContactDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  opacity: 0.9;
`;

const ContactInfoList = styled.div`
  margin-top: 2rem;
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactIcon = styled.div`
  font-size: 1.3rem;
  margin-right: 1rem;
  min-width: 1.5rem;
`;

const ContactText = styled.div`
  font-size: 1rem;
  line-height: 1.5;
`;

const ContactLabel = styled.p`
  font-weight: 600;
  margin-bottom: 0.2rem;
`;

const ContactValue = styled.p`
  opacity: 0.9;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.light};
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const ContactForm = styled.div`
  padding: 3rem 2rem;
  background-color: ${props => props.theme.colors.light};
`;

const ContactFormTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.primary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SubmitButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.light};
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background-color: #dff2bf;
  color: #4f8a10;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real application, this would send data to an API
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form and show success message
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactSection id="contact">
      <ContactContainer>
        <ContactInfo>
          <ContactTitle>Get In Touch</ContactTitle>
          <ContactDescription>
            Interested in a property or have questions? Kevin Landen is here to help you find your perfect country western property.
          </ContactDescription>
          
          <ContactInfoList>
            <ContactInfoItem>
              <ContactIcon>ud83dudccd</ContactIcon>
              <ContactText>
                <ContactLabel>Address:</ContactLabel>
                <ContactValue>123 Country Road, Jackson, WY 83001</ContactValue>
              </ContactText>
            </ContactInfoItem>
            
            <ContactInfoItem>
              <ContactIcon>ud83dudcf1</ContactIcon>
              <ContactText>
                <ContactLabel>Phone:</ContactLabel>
                <ContactValue>(307) 555-1234</ContactValue>
              </ContactText>
            </ContactInfoItem>
            
            <ContactInfoItem>
              <ContactIcon>ud83dudce7</ContactIcon>
              <ContactText>
                <ContactLabel>Email:</ContactLabel>
                <ContactValue>info@kevinlanden.com</ContactValue>
              </ContactText>
            </ContactInfoItem>
            
            <ContactInfoItem>
              <ContactIcon>ud83dudcc5</ContactIcon>
              <ContactText>
                <ContactLabel>Hours:</ContactLabel>
                <ContactValue>Monday - Friday: 9am - 5pm</ContactValue>
                <ContactValue>Weekends: By appointment</ContactValue>
              </ContactText>
            </ContactInfoItem>
          </ContactInfoList>
          
          <SocialLinks>
            <SocialLink href="#" aria-label="Facebook">u{1F4E1}</SocialLink>
            <SocialLink href="#" aria-label="Instagram">u{1F4F8}</SocialLink>
            <SocialLink href="#" aria-label="LinkedIn">u{1F4BC}</SocialLink>
            <SocialLink href="#" aria-label="Twitter">u{1F4AC}</SocialLink>
          </SocialLinks>
        </ContactInfo>
        
        <ContactForm>
          <ContactFormTitle>Send a Message</ContactFormTitle>
          
          {isSubmitted && (
            <SuccessMessage>
              Thank you for your message! We'll get back to you shortly.
            </SuccessMessage>
          )}
          
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="subject">Subject</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>
          </Form>
        </ContactForm>
      </ContactContainer>
    </ContactSection>
  );
};

export default Contact;