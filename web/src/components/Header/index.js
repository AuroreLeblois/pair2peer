// == Import npm
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { firstLetterToUppercase } from 'src/store/utils';
import { Navbar, Button, Heading, Container } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';

// == Import
import { submitLogout } from 'src/store/actions';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import './styles.css';

// == Composant
const Header = () => {
  const [activeNavbar, setActiveNavbar] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(submitLogout(history));
    setActiveNavbar(!activeNavbar);
  };

  const { user } = useSelector((state) => state);
  console.log(user)

  const NoUser = () => (
    <>
      <Navbar.Item renderAs="div">
        <Link to="/signup">
          <Button color="info" light onClick={() => setActiveNavbar(!activeNavbar)}>Inscription</Button>
        </Link>
      </Navbar.Item>
      <Navbar.Item renderAs="div">
        <Link to="/login">
          <Button color="info" outlined onClick={() => setActiveNavbar(!activeNavbar)}>Connexion</Button>
        </Link>
      </Navbar.Item>
    </>
  );

  const UserConnected = () => (
    <>
      <Navbar.Item dropdown hoverable>
        <Navbar.Link renderAs="div">
          {firstLetterToUppercase(user.pseudo)}
        </Navbar.Link>
        <Navbar.Dropdown>
          <Link to="/profile">
            <Navbar.Item onClick={() => setActiveNavbar(!activeNavbar)}>
              Profile
            </Navbar.Item>
          </Link>
          <Link to="/logout">
            <Navbar.Item onClick={handleLogout}>
              Déconnexion
            </Navbar.Item>
          </Link>
        </Navbar.Dropdown>
      </Navbar.Item>
    </>
  );

  return (
    <Navbar active={activeNavbar}>
      <Container>
        <Navbar.Brand>
          <Navbar.Item renderAs="div">
            <Link to="/">
              <Heading subtitle size={6}>
                <FontAwesomeIcon icon={faCodeBranch} />
                <span className="logo">Pair2Peer</span>
              </Heading>
            </Link>
          </Navbar.Item>
          <Navbar.Burger onClick={() => setActiveNavbar(!activeNavbar)} />
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Container position="end">
            <Navbar.Container>
              <Navbar.Item onClick={() => setActiveNavbar(!activeNavbar)}>
                <Link to="/">
                  <Heading subtitle size={6}>
                    Accueil
                  </Heading>
                </Link>
              </Navbar.Item>
              <Navbar.Item onClick={() => setActiveNavbar(!activeNavbar)}>
                <Link to="/map">
                  <Heading subtitle size={6}>Carte</Heading>
                </Link>
              </Navbar.Item>
              <Navbar.Item onClick={() => setActiveNavbar(!activeNavbar)}>
                <Link to="/about">
                  <Heading subtitle size={6}>A Propos</Heading>
                </Link>
              </Navbar.Item>
              <Navbar.Item onClick={() => setActiveNavbar(!activeNavbar)}>
                <Link to="/contact">
                  <Heading subtitle size={6}>Contact</Heading>
                </Link>
              </Navbar.Item>
              <Navbar.Item onClick={() => setActiveNavbar(!activeNavbar)}>
                <Link to="/search">
                  <Heading subtitle size={6}>Rechercher</Heading>
                </Link>
              </Navbar.Item>
            </Navbar.Container>
            <Navbar.Container>
              {(user) ? <UserConnected /> : <NoUser />}
            </Navbar.Container>
          </Navbar.Container>
        </Navbar.Menu>
      </Container>
    </Navbar>
  );
};

// == Export
export default Header;
