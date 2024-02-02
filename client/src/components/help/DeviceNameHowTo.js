import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

import './DeviceNameHowTo.css';

export const DeviceNameHowTo = () => {
  return (
    <Card className="DeviceNameHowTo">
      <Card.Body>
      <Image src="/img/device-name-how-to.gif" rounded />
      </Card.Body>
    </Card>
  );
};
