import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { DeviceNameHowTo } from './';

import './HelpIcon.css';

const components = {
  DeviceNameHowTo: DeviceNameHowTo,
};

export const HelpIcon = ({ componentName }) => {
  const Component = components[componentName];

  const renderTooltip = props => (
    <Tooltip className="HelpIcon-tooltip" {...props}>
      <Component />
    </Tooltip>
  );
  return (
    <OverlayTrigger
      className="HelpIcon"
      trigger="click"
      placement="top"
      overlay={renderTooltip}
      rootClose={true}
    >
      <i className="bi bi-question-circle HelpIcon-trigger"></i>
    </OverlayTrigger>
  );
};
