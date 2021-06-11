import axios from 'axios';
import Register from './Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Append CSRF token on every request
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function App() {
  return (
    <Router>
      <Route path='/register' component={Register} exact />
    </Router>
  );
}

export default App;
