import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';

export const SelectionTiles = ({ onComplete }) => {
  return (
    <Container>
      <div>Tiles</div>
      <Button
        variant="primary"
        type="submit"
        onClick={onComplete}
      >
        Next
      </Button>
    </Container>
  );
};
