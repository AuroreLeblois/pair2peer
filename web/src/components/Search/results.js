// == Import npm
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Grid, Card, Pagination } from 'semantic-ui-react';

// == import utils/actions
import { API_URI, buildSearchData } from 'src/store/utils';
import { getSearchData } from 'src/store/actions';

// == Import component
import Cards from './cards';

// == Composant
const Results = () => {
  const [activePage, setActivePage] = useState(1);
  const [pendingMaxPage, setPendingMaxPage] = useState(10);

  const users = useSelector((state) => state.usersData.users);
  const maxPage = useSelector((state) => {
    if (!state.usersData.maxPage) {
      return pendingMaxPage;
    }
    return state.usersData.maxPage;
  });

  const dispatch = useDispatch();

  const onChange = (evt, pageInfo) => {
    setActivePage(pageInfo.activePage);
  };

  const getUsersData = () => {
    axios.get(
      `${API_URI}/search?page_nb=${activePage}&user_nb=12`,
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

  useEffect(getUsersData, [activePage]);

  const PaginationComponent = () => (
    <Pagination
      activePage={activePage}
      onPageChange={onChange}
      boundaryRange={0}
      ellipsisItem={null}
      firstItem={null}
      lastItem={null}
      siblingRange={1}
      totalPages={maxPage}
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
