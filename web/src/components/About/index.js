// == Import npm
import React from 'react';
import { Container, Heading } from 'react-bulma-components';
// == Import css
// import './style.css';

// == Composant
const About = () => {
  return (
    <Container class="Container">
      <Heading>
        Peer2Pair Késsékéssé?
      </Heading>
      <Heading subtitle size={3}>
        Un site pour trouver des gens avec qui programmer!
      </Heading>
      <p>Oui! vous avez bien compris, ici on trouve des gens avec qui programmer, on consulte leur profil et on les contacte via la messagerie</p>
      <Heading subtitle size={3}>
        <em>Comment faire?</em> 
     </Heading>
     <p>C'est assez simple mais pour ça, vous devez être connecté/e. Les personnes non connectées n'ont que accès à la map ici et à cette très belle page d'exposition...</p>
     <p>Un fois connecté/e, vous aurez accès aux fonctionnalités du site: la recherche et le contacte via la messagerie</p>
     <Heading subtitle size={3}>
       J'ai trouvé un développeur!
      </Heading>
      <p>C'est génial! Il ne vous reste plus qu'à le contacter avec un petit message! Mais d'abord....</p>
      <Heading>
        Les 11 commandements du premier contact
      </Heading>
    <p>C'est bien gentil tout ça mais il faudrait vérifier que vos messages respectent certaines... normes</p>
    <ol>
      
    </ol>
    </Container>
  );
};

// == Export
export default About;
