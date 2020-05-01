// == Import npm
import React from 'react';
import { Menu, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions } from 'src/store/actions';

// == Import
import './styles.css';

// == Composant
const Header = () => {
  const dispatch = useDispatch();

  const handleClickSearch = () => {
    dispatch({ type: actions.POST_SEARCH });
  };

  return (
    <Menu stackable secondary inverted>

      <Menu.Item className="logo2">
        <Link to="/">
          <Icon color="yellow" name="code branch" />
          <span className="logo primary">Pair2Peer</span>
        </Link>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item name="map">Carte</Menu.Item>
        <Menu.Item name="about">A Propos</Menu.Item>
        <Menu.Item name="contact">Contact</Menu.Item>
        <Menu.Item name="search">
          <Link to="/search" onClick={handleClickSearch}>
            Search
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/signup">
            <Button color="red" content="S'inscrire" />
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/login">
            <Button content="Se Connecter" />
          </Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

// == Export
export default Header;
