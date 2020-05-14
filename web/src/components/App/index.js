// == Import npm
import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { getFiltersList, getAuthentified, getUserInbox } from 'src/store/actions';
import { API_URI } from 'src/store/utils';
import { Container, Hero } from 'react-bulma-components';
import axios from 'axios';


// == Import
import Login from 'src/components/Login';
import Profile from 'src/components/Profile';
import Signup from 'src/components/Signup';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Search from 'src/components/Search';
import Home from 'src/components/Home';
import NotFound from 'src/components/Page404';
import Messaging from 'src/components/Messaging';
import UserMap from 'src/components/Map';
import About from 'src/components/About';
import UserProfile from 'src/components/UserProfile';

import './styles.css';

// Ajout d'une route /signup

// == Composant
const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  console.log(document.cookie);

  const sessionUser = () => {
    console.log('coucou')
    if (!user) {
      const userInfo = JSON.parse(sessionStorage.getItem('user'));
      const inbuxUserInfo = JSON.parse(sessionStorage.getItem('inbox'));
      if (userInfo) {
        dispatch(getAuthentified(history, userInfo));
        dispatch(getUserInbox(inbuxUserInfo));
      }
    }
  };

  const loginCheck = useCallback((component) => {
    if (!user) {
      return <Redirect to="/login" />;
    }
    return component;
  }, [user]);

  useEffect(sessionUser, [user]);

  // Req to get filters list
  const getFilters = () => {
    axios.get(
      `${API_URI}/`,
      { withCredentials: true },
    )
      .then((res) => {
        const data = res.data;
        const filtersList = {};
        let usersData = {};
        console.log(res.data);
        filtersList.it_language = data.it_language;
        filtersList.language = data.language;
        filtersList.localisation = data.localisation;
        usersData = data.maxUser;
        dispatch(getFiltersList(filtersList, usersData));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(getFilters, [user]);

  return (
    <div className="app">
      <Hero color="light" size="fullheight">
        <Hero.Head>
          <Header />
        </Hero.Head>

        <Hero.Body color="primary">
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/map" component={UserMap} />
              <Route exact path="/profile" render={() => loginCheck(<Profile />)} />
              <Route exact path="/profile/:pseudo" render={() => loginCheck(<UserProfile />)} />
              <Route exact path="/search" render={() => loginCheck(<Search />)} />
              <Route exact path="/inbox" render={() => loginCheck(<Messaging />)} />
              <Route exact path="/about" render={About} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Hero.Body>

        <Hero.Footer>
          <Footer />
        </Hero.Footer>
      </Hero>
    </div>
  );
};

// == Export
export default App;
