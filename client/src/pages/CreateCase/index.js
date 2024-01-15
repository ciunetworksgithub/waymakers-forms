import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

import CreateTicketForm from './components/CreateTicketForm';
import { SelectionTiles } from './components/SelectionTiles';
import { Scene } from './components/Scene';
import { Success } from './components/Success';

import './index.css';

const STAGES = {
  TILES: 0,
  FORM: 1,
  FINISH: 2,
};

const CreateCasePage = () => {
  const [curStage, setCurStage] = useState(STAGES.TILES);
  const stageXPos = `-${100 * curStage}%`;

  const next = () => setCurStage(curStage + 1);

  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <h1 className="page-title">Create a Case</h1>
          </Row>
          <Row className="justify-content-md-center">
            <Col sm md className="mb-3">
              <div className="CreateCasePage-viewport">
                <div
                  className="CreateCasePage-viewport-stage"
                  style={{ left: stageXPos }}
                >
                  <Scene>
                    <SelectionTiles onComplete={next} />
                  </Scene>
                  <Scene>
                    <CreateTicketForm
                      onCancel={() => setCurStage(STAGES.TILES)}
                      onComplete={next}
                    />
                  </Scene>
                  <Scene>
                    <Success />
                  </Scene>
                </div>
              </div>
            </Col>
            <Col sm md>
              {curStage !== STAGES.FINISH && (
                <Container>
                  <h4>How to submit a Case</h4>
                  <p>
                    Please do not submit personally identifiable information.
                  </p>
                  <p>
                    Fill in lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                  </p>
                </Container>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateCasePage;
