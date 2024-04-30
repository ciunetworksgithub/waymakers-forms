import { MsalProvider } from '@azure/msal-react';

import CreateCasePage from './pages/CreateCase/index.js';
import { Authenticated, Header } from './components';

import './App.css';

function App({ pca }) {
  return (
    <MsalProvider instance={pca}>
      <div className="app">
        <Header />
        <Authenticated>
          <CreateCasePage />
        </Authenticated>
        <div className="app-background--bottom fixed-bottom" />
      </div>
    </MsalProvider>
  );
}

export default App;
