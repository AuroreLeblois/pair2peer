/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-indent */
// == Import : npm
import React from 'react'; // couche 1
import { render } from 'react-dom'; // couche 2
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { getAuthentified, getUserInbox } from 'src/store/actions';

// == Import : local
// Composants
import App from 'src/components/App';
import store from 'src/store';

const userSession = JSON.parse(sessionStorage.getItem('user'));
const inboxUserInfo = JSON.parse(sessionStorage.getItem('inbox'));

if (userSession) {
  store.dispatch(getAuthentified(userSession));
  store.dispatch(getUserInbox(inboxUserInfo));
}

// == Render
// 1. Élément React racine (celui qui contient l'ensemble de l'app)
//    => crée une structure d'objets imbriqués (DOM virtuel)
const rootReactElement = (
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
// 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
const target = document.getElementById('root');
// 3. Déclenchement du rendu de React (virtuel) => DOM (page web)
render(rootReactElement, target);
