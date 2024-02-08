import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import './Success.css';

export const Success = ({ ticketNumber }) => {
  return (
    <Container className="Success">
      <Card.Title>Thank you!</Card.Title>
      <Card.Body>
        <p>We'll be in touch soon.</p>
        {ticketNumber && (
          <p>
            Your ticket number is:{' '}
            <span className="Success-TicketNumber">{ticketNumber}</span>
          </p>
        )}
      </Card.Body>
    </Container>
  );
};
