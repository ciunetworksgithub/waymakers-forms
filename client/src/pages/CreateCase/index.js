import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

import {
  AttachmentsModal,
  CreateTicketForm,
  SelectionTiles,
  Success,
} from './components';
import { Scene } from '../../components';
import { getTicket } from './helpers';
import { useFormDefs } from './hooks/use-form-defs';

import './index.css';


const STAGES = {
  TILES: 0,
  FORM: 1,
  FINISH: 2,
};

const CreateCasePage = () => {
  const { config, error } = useFormDefs();
  const [curStage, setCurStage] = useState(STAGES.TILES);
  const [attachments, setAttachments] = useState();
  const [showAttachmentsModal, setShowAttachmentsModal] = useState(false);
  const [formDef, setFormDef] = useState();
  const [ticket, setTicket] = useState();
  const stageXPos = `-${100 * curStage}%`;

  const getActiveClassName = stage =>
    curStage === stage ? 'active' : 'inactive';

  const handleAttachmentsUploadComplete = () => {
    setShowAttachmentsModal(false);
    next();
  };

  const handleCreateTicketSuccess = async ({
    attachments: _attachments,
    itemId,
  }) => {
    const data = await getTicket(itemId);
    setTicket(data);
    if (_attachments) {
      setAttachments(_attachments);
      setShowAttachmentsModal(true);
    } else {
      next();
    }
  };

  const handleTileSelection = selection => {
    setFormDef(selection);
    next();
  };

  const next = () => {
    setCurStage(curStage + 1);
    window.scroll({ top: 0, behavior: 'instant' });
  };

  if (error) {
    return (
      <Container>
        <Scene>
          <h2>Uh oh!</h2>
          <p>We hit a snag. Try refreshing your browser?</p>
          <Alert variant="danger">
            <p>{error.message}</p>
            <p>{error.stack}</p>
          </Alert>
        </Scene>
      </Container>
    );
  }

  if (!config) {
    return null;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Row className="justify-content-md-center">
            <Col sm={0} md={0} className="invisible"></Col>
            <Col xs={12} sm={10} md={10} lg={10} xl={7} className="mb-3">
              <div className="CreateCasePage-viewport">
                <div
                  className="CreateCasePage-viewport-stage"
                  style={{ left: stageXPos }}
                >
                  <Container className={getActiveClassName(STAGES.TILES)}>
                    <SelectionTiles
                      forms={config}
                      onComplete={handleTileSelection}
                    />
                  </Container>
                  <Scene className={getActiveClassName(STAGES.FORM)}>
                    {curStage === STAGES.FORM && (
                      <CreateTicketForm
                        formDef={formDef}
                        onCancel={() => setCurStage(STAGES.TILES)}
                        onComplete={handleCreateTicketSuccess}
                      />
                    )}
                    {showAttachmentsModal && (
                      <AttachmentsModal
                        attachments={attachments}
                        show={showAttachmentsModal}
                        ticket={ticket}
                        onComplete={handleAttachmentsUploadComplete}
                      />
                    )}
                  </Scene>
                  <Scene className={getActiveClassName(STAGES.FINISH)}>
                    <Success ticketNumber={ticket?.ticketNumber} />
                  </Scene>
                </div>
              </div>
            </Col>
            <Col sm={0} md={0} className="invisible"></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateCasePage;
