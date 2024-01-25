import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import './SelectionTiles.css';

import tileDefs from '../config/tile-definitions.json';

export const SelectionTiles = ({ onComplete }) => {
  return (
    <Container className="SelectionTiles h-100">
      <Row xs={1} md={2} className="g-4">
        {tileDefs.map((tileDef, idx) => (
          <Col key={idx}>
            <Card
              key={idx}
              onClick={() => onComplete(tileDef)}
              className="SelectionTiles-Tile"
            >
              <Card.Title className="title">{tileDef.subject}</Card.Title>
              <Card.Body>{tileDef.help}</Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
