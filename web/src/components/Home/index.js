// == Import npm
import React from 'react';
import { Container, Heading } from 'react-bulma-components';


// == Composant
const Home = () => {
  return (
    <Container>
      <Heading>
        Peer2Pair
      </Heading>
      <Heading subtitle size={3}>
        Le site de pair-programming entre pairs
      </Heading>
     <p>Ici vous pourrez rechercher des développeurs plus expérimentés pour coder avec vous,
       ou des élèves si vous souhaitez partager votre savoir...</p>
      <p> Rentrez votre niveau, dites-nous si vous souhaitez coder en remote ou en personne.
       Et c'est parti!</p> 
    </Container>
  );
};

// == Export
export default Home;
