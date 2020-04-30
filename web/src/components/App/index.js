// == Import npm
import React from 'react';
import { Route, Switch } from 'react-router-dom';


// == Import
import Login from 'src/components/Login';
import Profile from 'src/components/Profile';
import Signup from 'src/components/Signup';
import Header from 'src/components/Header';
import './styles.css';

// Ajout d'une route /signup

// == Composant
const App = () => {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </Switch>
    </div>
  );
};

// == Export
export default App;
