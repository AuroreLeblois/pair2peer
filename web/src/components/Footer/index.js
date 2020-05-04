// == Import npm
import React from 'react';
import { Segment, Container, Grid, Header, List, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// == Import
import './styles.scss';

// == Composant
const Footer = () => {
  return (
    <Segment className="footer" basic>
      <Container>
        <Grid padded="horizontally" verticalAlign="middle" stackable>
          <Grid.Column textAlign="left" width={7}>
            <Icon name="code branch" />
            <span className="logo">Pair2Peer</span>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header as="h4" content="Group 1" />
          </Grid.Column>
          <Grid.Column width={3}>
            <Header as="h4" content="Group 2" />
          </Grid.Column>
          <Grid.Column width={3}>
            <Header as="h4" content="Group 3" />
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  );
};

// == Export
export default Footer;
