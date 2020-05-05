// == Import npm
import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getFiltersList } from 'src/store/actions';
import { API_URI } from 'src/store/utils';
import axios from 'axios';


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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loginCheck = useCallback((path, component) => {
    if (!user) {
      return <Redirect to={path} />;
    }
    return component;
  }, [user]);

  // Req to get filters list
  const getFilters = () => {
    axios.get(
      `${API_URI}/`,
      { withCredentials: true },
    )
      .then((res) => {
        const data = res.data;
        console.log(data)
        const filtersList = {};
        const usersData = {};
        filtersList.it_language = data.it_language;
        filtersList.language = data.language;
        filtersList.localisation = data.localisation;
        usersData.maxUser = data.maxUser;
        console.log(usersData)
        dispatch(getFiltersList(filtersList, usersData));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(getFilters, []);


  return (
    <div className="app">
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profile" render={() => loginCheck('/login', <Profile />)} />
          <Route exact path="/search" render={() => loginCheck('/login', <Search />)} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

// == Export
export default App;
