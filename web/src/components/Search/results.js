// == Import npm
import React, { useEffect } from 'react';
import { Grid, Image, Card, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URI, buildSearchData } from 'src/store/utils';
import { getSearchData } from 'src/store/actions';
import axios from 'axios';

// == Composant
const Results = () => {
  const users = useSelector((state) => state.usersData.users);
  const dispatch = useDispatch();

  const getUsersData = () => {
    axios.get(
      `${API_URI}/search?page_nb=1&user_nb=12`,
      { withCredentials: true },
    )
      .then((res) => {
        const data = buildSearchData(res.data);
        dispatch(getSearchData(data.filters, data.users));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(getUsersData, []);

  const Cards = () => {
    if (!users) {
      return null;
    }
    return users.map((user) => (
      <Card>
        <Image src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg" wrapped ui={false} />
        <Card.Content>
          <Card.Header>Daniel</Card.Header>
          <Card.Meta>Joined in 2016</Card.Meta>
          <Card.Description>
            Daniel is a comedian living in Nashville.
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            10 Friends
          </a>
        </Card.Content>
      </Card>
    ));
  };


  return (
    <Grid.Column width={12}>
      <Card.Group itemsPerRow={3}>
        <Cards />
      </Card.Group>
    </Grid.Column>
  );
};

// == Export
export default Results;
