import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={ LoginPage } />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
