import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface GenericTemplateProps {
  heading: string;
  body: string;
  ctaText?: string;
  ctaLink?: string;
}

export const GenericTemplate = ({
  heading,
  body,
  ctaText = 'Visit Website',
  ctaLink = 'https://www.theestifanos.com',
}: GenericTemplateProps) => (
  <Html>
    <Head />
    <Preview>{heading}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={header}>ESTIFANOS WEDDING</Text>
        <Heading style={title}>{heading}</Heading>
        <Text style={paragraph}>{body}</Text>
        <Section style={btnContainer}>
          <Button style={button} href={ctaLink}>{ctaText}</Button>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default GenericTemplate;

const main = {
  backgroundColor: '#F9F7F2',
  fontFamily: '"Times New Roman", Times, serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
  textAlign: 'center' as const,
};

const header = {
  color: '#D4A845',
  fontSize: '12px',
  letterSpacing: '4px',
  marginBottom: '20px',
  textTransform: 'uppercase' as const,
};

const title = {
  color: '#1B3B28',
  fontSize: '32px',
  margin: '0 0 20px',
};

const paragraph = {
  color: '#1B3B28',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 20px',
};

const btnContainer = {
  textAlign: 'center' as const,
  marginTop: '30px',
};

const button = {
  backgroundColor: '#1B3B28',
  color: '#D4A845',
  fontSize: '14px',
  fontWeight: 'bold',
  textDecoration: 'none',
  padding: '12px 24px',
  border: '1px solid #D4A845',
};
