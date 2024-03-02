import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import './SelectionTiles.css';

export const SelectionTiles = ({ forms, onComplete }) => {
  return (
    <Container className="SelectionTiles h-100">
      <Row xs={1} md={2} className="g-4">
        {forms.map((form, idx) => (
          <Col key={idx}>
            <Card
              key={idx}
              onClick={() => onComplete(form)}
              className="SelectionTiles-Tile"
            >
              <Card.Title className="title">{form.tile.title}</Card.Title>
              <Card.Body>{form.tile.body}</Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
