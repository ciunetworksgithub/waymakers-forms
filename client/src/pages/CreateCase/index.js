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
  const [ticketDef, setTicketDef] = useState();
  const [ticketId, setTicketId] = useState();
  const stageXPos = `-${100 * curStage}%`;

  const handleCreateTicketSuccess = ({ itemId }) => {
    setTicketId(itemId);
    next();
  };

  const handleTileSelection = tile => {
    setTicketDef(tile);
    next();
  };

  const next = () => {
    setCurStage(curStage + 1);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Row className="justify-content-md-center mt-5">
            <Col sm md className="invisible"></Col>
            <Col sm md className="mb-3">
              <div className="CreateCasePage-viewport">
                <div
                  className="CreateCasePage-viewport-stage"
                  style={{ left: stageXPos }}
                >
                  <Scene>
                    <SelectionTiles onComplete={handleTileSelection} />
                  </Scene>
                  <Scene>
                    {curStage === STAGES.FORM && (
                      <CreateTicketForm
                        ticketDef={ticketDef}
                        onCancel={() => setCurStage(STAGES.TILES)}
                        onComplete={handleCreateTicketSuccess}
                      />
                    )}
                  </Scene>
                  <Scene>
                    <Success ticketId={ticketId} />
                  </Scene>
                </div>
              </div>
            </Col>
            <Col sm md className="invisible"></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateCasePage;
