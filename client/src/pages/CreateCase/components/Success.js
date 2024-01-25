import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import './Success.css';

export const Success = ({ ticketId }) => {
  return (
    <Container className="Success">
      <Card.Title>Thank you!</Card.Title>
      <Card.Body>
        <p>We'll be in touch soon.</p>
        <p>
          Your ticket ID is: <span className="Success-TicketId">{ticketId}</span>.
        </p>
      </Card.Body>
    </Container>
  );
};
