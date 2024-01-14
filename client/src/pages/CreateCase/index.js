import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CreateTicketForm from './components/CreateTicketForm.js';

const CreateCasePage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <h1 className="page-title">Create a Case</h1>
          </Row>
          <Row>
            <Col>
              <CreateTicketForm />
            </Col>
            <Col>
              <h4>How to submit a Case</h4>
              <p>Please do not submit personally identifiable information.</p>
              <p>
                Fill in lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateCasePage;
