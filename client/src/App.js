import CreateCasePage from './pages/CreateCase/index.js';
import { Header } from './components';

import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      {/* <div className="app-background--top fixed-top" /> */}
      <CreateCasePage />
      <div className="app-background--bottom fixed-bottom" />
    </div>
  );
}

export default App;
