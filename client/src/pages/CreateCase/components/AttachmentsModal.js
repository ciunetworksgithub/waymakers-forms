import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { createAttachment } from '../helpers';

const getStatusButtonVariant = status => {
  switch (status) {
    case 'Done':
      return 'success';
    case 'Error':
      return 'danger';
    case 'Uploading':
      return 'warning';
    default:
      return 'primary';
  }
};

const UploadStatus = ({ attachment }) => {
  const { name, status } = attachment;
  const variant = getStatusButtonVariant(status);
  return (
    <p>
      <Badge style={{ width: 80 }} bg={variant}>
        {status}
      </Badge>{' '}
      {name}
    </p>
  );
};

export const AttachmentsModal = ({
  attachments,
  ticket,
  onComplete = () => true,
}) => {
  const [isDone, setIsDone] = useState(false);
  const [uploads, setUploads] = useState(
    attachments.reduce(
      (acc, cur) => ({
        [cur.name]: {
          contactId: ticket.contactID,
          status: 'Pending',
          ticketId: ticket.id,
          ...cur,
        },
        ...acc,
      }),
      {}
    )
  );

  useEffect(() => {
    const values = Object.values(uploads);

    if (values.every(({ status }) => status === 'Pending')) {
      (async () => {
        for (const attachment of values) {
          try {
            attachment.status = 'Uploading';
            setUploads({ ...uploads });
            await createAttachment(attachment);
            attachment.status = 'Done';
            setUploads({ ...uploads });
          } catch (e) {
            attachment.status = 'Error';
            attachment.name = e.message;
          }
        }
      })();
      setUploads({ ...uploads });
    }

    if (values.every(({ status }) => status === 'Done' || status === 'Error')) {
      setIsDone(true);
    }
  }, [uploads]);

  if (isDone) {
    onComplete();
  }

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Uploading Attachments
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isDone && (
          <Alert variant="warning">
            Wait until all the attachments are finished uploading before closing
            this browser tab.
          </Alert>
        )}
        {uploads &&
          Object.values(uploads).map((attachment, idx) => (
            <UploadStatus attachment={attachment} key={idx} />
          ))}
      </Modal.Body>
    </Modal>
  );
};
