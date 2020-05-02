// == Import npm
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';


// == Import
import Login from 'src/components/Login';
import Profile from 'src/components/Profile';
import Signup from 'src/components/Signup';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Search from 'src/components/Search';
import './styles.css';

// Ajout d'une route /signup

// == Composant
const App = () => {
  const user = useSelector((state) => state.user);
  const loginCheck = useCallback(() => {
    if (!user) {
      return <Redirect to="/login" />;
    }
    return <Search />;
  }, [user]);


  return (
    <div className="app">
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/search" render={loginCheck} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

// == Export
export default App;
