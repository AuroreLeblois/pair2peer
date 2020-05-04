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
        <Menu.Item name="map">
          <Link to="/map">Carte</Link>
        </Menu.Item>
        <Menu.Item name="about">
          <Link to="/map">A Propos</Link>
        </Menu.Item>
        <Menu.Item name="contact">
          <Link to="/contact">Contact</Link>
        </Menu.Item>
        <Menu.Item name="search">
          <Link to="/search">
            Rechercher
          </Link>
        </Menu.Item>
        {(user) ? <UserConnected /> : <NoUser />}
      </Menu.Menu>
    </Menu>
  );
};

// == Export
export default Header;