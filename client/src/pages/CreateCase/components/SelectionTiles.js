import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import tileDefs from '../config/tile-definitions.json';

import './SelectionTiles.css';

const Tile = ({ onClick, children }) => {
  return (
    <Card onClick={onClick} className="SelectionTiles-Tile">
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export const SelectionTiles = ({ onComplete }) => {
  return (
    <Container className="SelectionTiles h-100">
      <Row>
        {tileDefs.map((tileDef, idx) => (
          <Col key={idx}>
            <Tile key={idx} onClick={() => onComplete(tileDef)}>{tileDef.subject}</Tile>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
