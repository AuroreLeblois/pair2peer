// == Import npm
import React from 'react';
import { Hero, Container, Content } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';

// == Import
import './styles.scss';

// == Composant
const Footer = () => {
  return (
    <Hero color="info">
      <Hero.Body>
        <Container>
          <Content size="small" style={{ textAlign: 'center' }}>
            <p>Projet de fin d'étude réalisé par 4 étudiants with ❤️</p>
            <FontAwesomeIcon icon={faCodeBranch} />
            <span className="logo">Pair2Peer</span>
          </Content>
        </Container>
      </Hero.Body>
    </Hero>
  );
};

// == Export
export default Footer;
