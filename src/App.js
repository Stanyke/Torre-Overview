import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import home from './components/home'
import jobs from './components/jobs'

function App() {
  return (
    <Router>
      <Route path="/" exact component={home} />
      <Route path="/jobs" component={jobs} />
    </Router>
  );
}

export default App;
