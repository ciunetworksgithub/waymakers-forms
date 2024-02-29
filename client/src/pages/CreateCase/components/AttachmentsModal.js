import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';

const getStatusButtonVariant = status => {
  switch (status) {
    case 'Uploading':
      return 'warning';
    case 'Done':
      return 'success';
    default:
      return 'danger';
  }
};

const UploadStatus = ({ attachment }) => {
  const { name, status } = attachment;
  return (
    <p>
      <Badge style={{ width: 80 }} bg={getStatusButtonVariant(status)}>
        {status || 'Pending'}
      </Badge>{' '}
      {name}
    </p>
  );
};

export const AttachmentsModal = ({
  attachments,
  onComplete = () => true,
  ticket,
  ...props
}) => {
  const [uploads, setUploads] = useState();

  useEffect(() => {
    if (!attachments) return;

    if (!uploads) {
      setUploads(
        attachments?.reduce((acc, cur) => ({ [cur.name]: cur, ...acc }), {})
      );
      return;
    }

    const values = Object.values(uploads);
    if (values.every(({ status }) => !status)) {
      values.forEach((attachment, idx) => {
        if (!attachment.status) {
          attachment.status = 'Uploading';
          setTimeout(() => {
            uploads[attachment.name].status = 'Done';
            setUploads({ ...uploads });
          }, 2000 * (idx + 1));
        }
      });
      setUploads({ ...uploads });
    }

    if (values.every(({ status }) => status === 'Done')) {
      return onComplete();
    }
  }, [attachments, onComplete, uploads]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Uploading Attachments
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h6>Attachments:</h6> */}
        <Alert variant="warning">
          Wait until all the attachments are finished uploading before closing
          this browser tab.
        </Alert>
        {uploads &&
          Object.values(uploads).map((attachment, idx) => (
            <UploadStatus attachment={attachment} key={idx} />
          ))}
      </Modal.Body>
    </Modal>
  );
};
