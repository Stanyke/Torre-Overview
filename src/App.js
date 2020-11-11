import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import home from './components/home'

function App() {
  return (
    <Router>
      <Route path="/" exact component={home} />
    </Router>
  );
}

export default App;
