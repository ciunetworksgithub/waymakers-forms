import Container from 'react-bootstrap/esm/Container';

export const Scene = ({ children }) => {
  return (
    <Container>
      <div className="card m-b-10">
        <div className="card-body">{children}</div>
      </div>
    </Container>
  );
};
