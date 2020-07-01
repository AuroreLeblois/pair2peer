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
            <p className="main-paragraph-content">
              Il n'est pas toujours évident d'avancer seul. <br/>
              Beaucoup de personnes tentent d'apprendre par eux-mêmes mais finissent bien souvent par abandonner à cause d'une difficulté trop élevée, manque de motivation ou d'encadrement.
            </p>
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
            <p className="main-paragraph-content">
              Pair2Peer vous offre la chance d'apprendre en échangant avec d'autres passionnés par le biais du <strong>pair-programming</strong>. <br/>
              Que vous soyez un débutant désireux d'apprendre, un autodidacte perdu dans les méandres de la programmation, un professionnel souhaitant faire sa veille technologique ou vous souhaitez simplement découvrir un nouveau langage. <br/>
              N'hésitez plus à sauter le pas !
            </p>
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
