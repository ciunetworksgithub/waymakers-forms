import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import tileDefs from '../config/tile-definitions.json';

import './SelectionTiles.css';

export const SelectionTiles = ({ onComplete }) => {
  return (
    <Container className="SelectionTiles h-100">
      <Row>
        {tileDefs.map((tileDef, idx) => (
          <Col key={idx}>
            <Card
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
