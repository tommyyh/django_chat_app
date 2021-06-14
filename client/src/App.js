import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Header from './components/Header';
import Room from './Room';

function App() {
  return (
    <Router>
      <Header />
      <Route path='/' component={Home} exact />
      <Route path='/register' component={Register} exact />
      <Route path='/login' component={Login} exact />
      <Route path='/room/:roomName/:username' component={Room} exact />
    </Router>
  );
}

export default App;
