// == Import npm
import React, { useState } from 'react';
import {Container, Heading} from 'react-bulma-components';
import Logo404 from './logo_apo.png';


const NotFound = () => {
  return (
    <Container>
      <Heading>
        404: Oh... On dirait qu'il y a eu un petit problème...
      </Heading>
      <img src={Logo404} alt="Petit logo" />
    </Container>
  )
};

export default NotFound;
