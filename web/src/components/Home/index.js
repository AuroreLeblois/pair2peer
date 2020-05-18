/* eslint-disable react/jsx-filename-extension */
// == Import npm
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heading, Container, Content, Columns, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';

// == import
import './style.scss';

// == Composant
const Home = () => {
  const { user } = useSelector((state) => state);

  return (
  //   <Container className="Container">
  //     <Heading>
  //       Pair2Peer
  //     </Heading>
  //     <Heading subtitle size={3}>
  //       Le site de pair-programming entre pairs
  //     </Heading>
  //     <Heading subtitle size={4}>
  //     Tous seul, on va plus vite, ensemble on va plus loin!
  //    </Heading>
  //     <p>Tel est notre credo!
  //     Ce site met en avant les valeurs du partage et de l'entraide. </p>
  //    <p>Vous pourrez rechercher des développeurs plus expérimentés pour coder avec vous sur un projet, un concept, une idée,
  //      ou des élèves si vous souhaitez partager votre savoir...</p>
  //  <br></br>
  //      <Heading subtitle size={4}>
  //       <em>Comment faire?</em>
  //    </Heading>
  //    <p>Très simple, il vous suffit de créer un compte et de vous connecter.</p>
  //     <p> Rentrez votre niveau, dites-nous si vous souhaitez coder en remote ou en personne.
  //     Et c'est parti pour la recherche de pairs!</p>
  //   </Container>

    <Container className="main-page">
      <Content style={{ textAlign: 'center' }}>
        <Heading className="main-title" size={4}>{(user) ? `Ravi de vous revoir ${user.pseudo}` : 'Trouvez un coworker, echangez, et commencez à travailler' }</Heading>
        <Heading className="main-title-sub" size={1}>{(user) ? 'On se met au travail ?' : 'Ensemble' }</Heading>
        {(user) ? <Link to="/inbox"><Button rounded color="danger" size="large">Messagerie</Button></Link> : null }
      </Content>
      <Content className="main-arrow" style={{ textAlign: 'center' }}>
        <Icon color="dark">
          <FontAwesomeIcon size="2x" icon={faAngleDoubleDown} pull="right" />
        </Icon>
      </Content>
      <Content style={{ textAlign: 'left' }}>
        <Columns className="main-right-image">
          <Columns.Column>
            <Heading className="main-paragraph-title" size={2}>Progresser seul</Heading>
            <p className="main-paragraph-content">You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man.</p>
          </Columns.Column>
          <Columns.Column />
        </Columns>
      </Content>
      <Content className="main-arrow" style={{ textAlign: 'center' }}>
        <Icon color="dark">
          <FontAwesomeIcon size="2x" icon={faAngleDoubleDown} pull="right" />
        </Icon>
      </Content>
      <Content style={{ textAlign: 'right' }}>
        <Columns className="main-left-image">
          <Columns.Column />
          <Columns.Column>
            <Heading className="main-paragraph-title" size={2}>L'entraide</Heading>
            <p className="main-paragraph-content">Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun in American crime. Like they're actually proud of that shit. </p>
          </Columns.Column>
        </Columns>
      </Content>
      <Content className="main-arrow" style={{ textAlign: 'center' }}>
        <Icon color="dark">
          <FontAwesomeIcon size="2x" icon={faAngleDoubleDown} pull="right" />
        </Icon>
      </Content>
      <Content className="main-arrow" style={{ textAlign: 'center' }}>
        <Link to="/signup">
          <Columns>
            <Columns.Column />
            <Columns.Column size={6}>
              <Link to="/signup">
                <Button rounded fullwidth color="danger" size="large">DÉCOUVRIR</Button>
              </Link>
            </Columns.Column>
            <Columns.Column />
          </Columns>
        </Link>
      </Content>
    </Container>
  );
};

// == Export
export default Home;
