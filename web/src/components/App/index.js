// == Import npm
import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getFiltersList } from 'src/store/actions';
import { API_URI } from 'src/store/utils';
import { Container, Hero, Progress } from 'react-bulma-components';
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
        const filtersList = {};
        const usersData = {};
        filtersList.it_language = data.it_language;
        filtersList.language = data.language;
        filtersList.localisation = data.localisation;
        usersData.maxUser = data.maxUser;
        dispatch(getFiltersList(filtersList, usersData));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(getFilters, []);


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
              <Route exact path="/profile" render={() => loginCheck('/login', <Profile />)} />
              <Route exact path="/search" render={() => loginCheck('/login', <Search />)} />
              <Route component={NotFound}/>
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
