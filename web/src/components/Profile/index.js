// == Import npm
import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Icon, Image } from 'semantic-ui-react'

// == Import

// == Composant
const Profile = () => {
  const user = useSelector((state) => state.user)

  return (
  <Card>
    <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2015</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>
  );
};

// == Export
export default Profile;