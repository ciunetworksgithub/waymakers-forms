import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import './SelectionTiles.css';

const Tile = ({ onClick, children }) => {
  return (
    <Card onClick={onClick} className="SelectionTiles-Tile">
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export const SelectionTiles = ({ onComplete }) => {
  const rows = 2;
  const cols = 3;
  const grid = Array.from({ length: rows }, () => Array(cols).fill(null));

  return (
    <Container className="SelectionTiles h-100 d-inline-block">
      {grid.map((row, rowIndex) => (
        <Row key={rowIndex} className="mb-3">
          {row.map((col, colIndex) => (
            <Col key={colIndex}>
              <Tile onClick={onComplete}>
                {`Row ${rowIndex + 1}, Col ${colIndex + 1}`}
              </Tile>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};
