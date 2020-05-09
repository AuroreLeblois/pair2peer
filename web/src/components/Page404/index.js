// == Import npm
import React, { useState } from 'react';
import Logo404 from './logo_apo.png'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import {Container, Heading} from 'react-bulma-components';

const NotFound = () => {
return (

  <Container>
  <Heading>
    404: Oh... On dirait qu'il y a eu un petit problème...
  </Heading>
  <img src={Logo404} alt="Petit logo" />
  </Container>
)
}
export default NotFound;
