// == Import npm
import React from 'react';
import { Container, Heading } from 'react-bulma-components';

// == Import css

// == Composant
const About = () => {
  return (
    <Container class="Container">
      <div>
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
     </div>
     <div>
     <Heading subtitle size={3}>
       J'ai trouvé un développeur!
      </Heading>
      <p>C'est génial! Il ne vous reste plus qu'à le contacter avec un petit message! Mais d'abord....</p>
      <Heading subtitle size={4}>
        Les commandements du premier contact
      </Heading>
    <p>C'est bien gentil tout ça mais il faudrait vérifier que vos messages respectent certaines... normes</p>
    <br></br>
    <ol type="I">
      <li> <Heading subtitle size={5}>Dire bonjour tu n'ometras pas!</Heading>
       Eh oui... c'est toujours plus agréable de commencer une nouvelle rencontre par une formule de politesse</li>
      <li><Heading subtitle size={5}>Poli/e et courtois/e tu resteras</Heading> 
      Les administrateurs n'aiment pas les gens impolis et les punissent</li>
      <li><Heading subtitle size={5}>Si rencontre il y a, prudent/e tu resteras</Heading>
      Nous comprenons que certaines personnes ont du mal à coder en remote. Cependant lorsqu'on ne connait pas bien la personne qui nous contacte, on opte pour un lieu public et fréquenté pour une session de pair-programming</li>
      <li><Heading subtitle size={5}>Ton orthographe tu surveilleras</Heading>
      Alors, tu n'es pas Shakespeare et nous non plus.. mais entre "Salut j'ai vu ton profil et ça serait cool que l'on code ensemble un truc" et 
      "cc sa te dirai de coD un truc ensemble"... Tu préfères quoi?
      On ne demande pas des pros de l'orthographe, juste une petite surveillance de ce que tu écris avant de l'envoyer</li>
    </ol>
    </div>
    </Container>
  );
};

// == Export
export default About;
