// == Import npm
import React from 'react';
import { Container, Heading } from 'react-bulma-components';


// == Import

// == Composant
const Home = () => {
  return (
    <Container>
      <Heading>
        Hero title Primary
      </Heading>
      <Heading subtitle size={3}>
        Subtitle
      </Heading>
    </Container>
  );
};

// == Export
export default Home;
