// == Import npm
import React from 'react';
import { useSelector } from 'react-redux';
import { Menu, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// == Import
import './styles.css';

// == Composant
const Header = () => {
  const { user } = useSelector((state) => state);

  const NoUser = () => (
    <>
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
    </>
  );

  const UserConnected = () => (
    <>
      <Menu.Item>
        <Link to="/profile">
          <Button content="Profile" />
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/logout">
          <Button color="red" content="Déconnexion" />
        </Link>
      </Menu.Item>
    </>
  );

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
          <Link to="/search">
            Search
          </Link>
        </Menu.Item>
        {(user) ? <UserConnected /> : <NoUser />}
      </Menu.Menu>
    </Menu>
  );
};

// == Export
export default Header;