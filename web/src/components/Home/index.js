// == Import npm
import React from 'react';
import { Container, Heading } from 'react-bulma-components';
// == Import css
// import './style.css';

// == Composant
const Home = () => {
  return (
    <Container className="Container">
      <Heading>
        Pair2Peer
      </Heading>
      <Heading subtitle size={3}>
        Le site de pair-programming entre pairs
      </Heading>
      <Heading subtitle size={4}>
      Tous seul, on va plus vite, ensemble on va plus loin! 
     </Heading>
      <p>Tel est notre credo!
      Ce site met en avant les valeurs du partage et de l'entraide. </p>
     <p>Vous pourrez rechercher des développeurs plus expérimentés pour coder avec vous sur un projet, un concept, une idée,
       ou des élèves si vous souhaitez partager votre savoir...</p>
   <br></br>
       <Heading subtitle size={4}>
        <em>Comment faire?</em> 
     </Heading>
     <p>Très simple, il vous suffit de créer un compte et de vous connecter.</p>
      <p> Rentrez votre niveau, dites-nous si vous souhaitez coder en remote ou en personne.
      Et c'est parti pour la recherche de pairs!</p> 
       
     
    </Container>
  );
};

// == Export
export default Home;
