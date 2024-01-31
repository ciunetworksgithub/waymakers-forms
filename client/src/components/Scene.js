import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

export const Scene = ({ className, children }) => {
  return (
    <Container className={className}>
      <Card>
        <Card.Body>{children}</Card.Body>
      </Card>
    </Container>
  );
};
