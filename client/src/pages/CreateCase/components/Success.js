import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

export const Success = () => {
  return (
    <Container>
      <Card.Title>Thank you!</Card.Title>
      <Card.Body>We'll be in touch soon.</Card.Body>
    </Container>
  );
};
