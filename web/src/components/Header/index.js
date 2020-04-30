// == Import npm
import React from 'react';
import { Menu, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

// == Import
import './styles.css'

// == Composant
const Header = () => {
  return (
    <Menu secondary stackable inverted>
      <Menu.Item className="logo2">
        <Icon name='code branch' />
        <span className="logo">Pair2Peer</span>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item name='testimonials'>Carte</Menu.Item>
        <Menu.Item name='testimonials'>A Propos</Menu.Item>
        <Menu.Item name='sign-in'>Contact</Menu.Item>
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