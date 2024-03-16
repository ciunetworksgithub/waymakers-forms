import Image from 'react-bootstrap/Image';

import './Header.css';

const getTitleSuffix = () => window.location.pathname.replace(/\//, '');

export const Header = () => {
  return (
    <h1 className="Header mt-3 mb-3">
      <Image width="150" src="/img/logo.jpg" />
      Support Center {getTitleSuffix()}
    </h1>
  );
};
