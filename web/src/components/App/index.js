// == Import npm
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// == Import
import Login from 'src/components/Login';
import Profile from 'src/components/Profile';
import Signup from 'src/components/Signup';
import './styles.css';

// == Composant
const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
      </Switch>
    </div>
  );
};

// == Export
export default App;
