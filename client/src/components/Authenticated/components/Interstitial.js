import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export const Interstitial = ({ onLogin = () => true }) => {
  return (
    <Container
      className="Authenticated-Authorizing Authenticated-Interstitial"
      onClick={onLogin}
    >
      <p>
        <Button onClick={onLogin}>Click to Login</Button>
      </p>
      <p>If you have any trouble logging in, please call CIU directly at:</p>
      <p>562-795-1700</p>
    </Container>
  );
};
