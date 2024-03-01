import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

import CreateTicketForm from './components/CreateTicketForm';
import { SelectionTiles } from './components/SelectionTiles';
import { Scene } from '../../components';
import { Success } from './components/Success';

import './index.css';
import { getTicket } from './helpers';
import { AttachmentsModal } from './components/AttachmentsModal';

const STAGES = {
  TILES: 0,
  FORM: 1,
  FINISH: 2,
};

const CreateCasePage = () => {
  const [curStage, setCurStage] = useState(STAGES.TILES);
  const [attachments, setAttachments] = useState();
  const [showAttachmentsModal, setShowAttachmentsModal] = useState(false);
  const [ticketDef, setTicketDef] = useState();
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

  const handleTileSelection = tile => {
    setTicketDef(tile);
    next();
  };

  const next = () => {
    setCurStage(curStage + 1);
    window.scroll({ top: 0, behavior: 'instant' });
  };

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
                    <SelectionTiles onComplete={handleTileSelection} />
                  </Container>
                  <Scene className={getActiveClassName(STAGES.FORM)}>
                    {curStage === STAGES.FORM && (
                      <CreateTicketForm
                        ticketDef={ticketDef}
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
