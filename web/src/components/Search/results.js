// == Import npm
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URI, buildSearchData } from 'src/store/utils';
import { getSearchData } from 'src/store/actions';
import axios from 'axios';
import { Grid, Card, Pagination, Container } from 'semantic-ui-react';

// == Import component
import Cards from './cards';

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

  const PaginationComponent = () => (
    <Pagination
      boundaryRange={0}
      defaultActivePage={1}
      ellipsisItem={null}
      firstItem={null}
      lastItem={null}
      siblingRange={1}
      totalPages={10}
    />
  );

  return (
    <Grid.Column width={12}>
      <Grid>
        <Grid.Row>
          <Card.Group itemsPerRow={3}>
            <Cards users={users} />
          </Card.Group>
        </Grid.Row>
        <Grid.Row textAlign="right">
          <Grid.Column>
            <PaginationComponent />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Grid.Column>
  );
};

// == Export
export default Results;
