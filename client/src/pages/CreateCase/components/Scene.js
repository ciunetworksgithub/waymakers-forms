import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

export const Scene = ({ children }) => {
  return (
    <Container>
      <Card>
        <Card.Body>{children}</Card.Body>
      </Card>
    </Container>
  );
};
