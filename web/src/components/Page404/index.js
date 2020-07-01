// == Import npm
import React, { useState } from 'react';
import {Container, Heading} from 'react-bulma-components';
import Logo404 from './logo_apo.png';

// == Import css
import './style.css';

const NotFound = () => {
  return (
    <Container>
      <Heading id="center">
        404: Oh... On dirait qu'il y a eu un petit problème...
      </Heading>
     <div id="connect"> 
    
      <img src={Logo404} alt="Petit logo" /></div>
    </Container>
  )
};

export default NotFound;
