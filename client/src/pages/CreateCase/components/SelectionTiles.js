import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import './SelectionTiles.css';

const tiles = [
  [
    {
      account: 'Bullfrogs',
      description: 'I need my network fixed',
      subject: 'Networking',
    },
    {
      account: 'Bullfrogs with computers',
      description: 'I need my computer fixed',
      subject: 'Desktop Issue',
    },
    {
      account: 'Bullfrogs with cellies',
      description: 'I need my cell phone fixed',
      subject: 'Cell Phone Issue',
    },
  ],
  [
    {
      account: 'Bullfrogs with friends',
      description: 'I need my social life fixed',
      subject: 'Personnel',
    },
    {
      account: 'Friendless Bullfrogs',
      description: 'I need some friends',
      subject: 'Other',
    },
  ],
];

const Tile = ({ onClick, children }) => {
  return (
    <Card onClick={onClick} className="SelectionTiles-Tile">
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export const SelectionTiles = ({ onComplete }) => {
  return (
    <Container className="SelectionTiles h-100 d-inline-block">
      {tiles.map((row, rowIndex) => (
        <Row key={rowIndex} className="mb-3">
          {row.map((data, colIndex) => (
            <Col key={colIndex}>
              <Tile onClick={() => onComplete(data)}>{data.subject}</Tile>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};
