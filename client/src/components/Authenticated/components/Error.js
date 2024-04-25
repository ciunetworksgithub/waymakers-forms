import Alert from 'react-bootstrap/Alert';

export const Error = ({ error }) => (
  <>
    <h2>Uh oh!</h2>
    <p>We were unable to authenticate you. Try refreshing your browser?</p>
    <Alert variant="danger">
      <Alert.Heading>Error</Alert.Heading>
      <p>{JSON.stringify(error, null, 2)}</p>
    </Alert>
  </>
);
