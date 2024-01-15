import './App.css';
import CreateCasePage from './pages/CreateCase/index.js';

function App() {
  return (
    <div className="app">
      <div className="app-background--top fixed-top" />
      <CreateCasePage />
      <div className="app-background--bottom fixed-bottom" />
    </div>
  );
}

export default App;
