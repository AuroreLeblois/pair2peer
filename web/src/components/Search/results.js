// == Import npm
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Columns, Pagination } from 'react-bulma-components';

// == import utils/actions
import { API_URI } from 'src/store/utils';
import { getUsersList } from 'src/store/actions';

// == Import component
import Cards from './cards';

// == Composant
const Results = () => {
  const [activePage, setActivePage] = useState(1);
  // pending MaxPage waiting from axios
  const [pendingMaxPage, setPendingMaxPage] = useState(10);

  const { usersData, search } = useSelector((state) => state);

  const maxPage = useSelector((state) => {
    if (!state.usersData.maxPage) {
      return pendingMaxPage;
    }
    return state.usersData.maxPage;
  });

  const dispatch = useDispatch();

  const handleChange = (page) => {
    setActivePage(page)
  };

  const getUsersData = () => {
    axios.post(
      `${API_URI}/search?page_nb=${activePage}&user_nb=12`,
      search,
      { withCredentials: true },
    )
      .then((res) => {
        const data = res.data
        const usersData = {};
        usersData.maxPage = data.maxPage;
        usersData.maxUsers = data.maxUser;
        usersData.users = data.users;
        dispatch(getUsersList(usersData));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(getUsersData, [activePage, search]);

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
    // <Grid stretched>
    //   <Grid.Row centered>
    //     <Message attached color="black">{usersData.maxUsers} développeurs disponibles</Message>
    //   </Grid.Row>
    //   <Grid.Row stretched>
    //     <Card.Group stackable itemsPerRow={4}>
    //       <Cards users={usersData.users} />
    //     </Card.Group>
    //   </Grid.Row>
    //   <Grid.Row textAlign="right">
    //     <Grid.Column>
    //       <PaginationComponent />
    //     </Grid.Column>
    //   </Grid.Row>
    // </Grid>
    <>
      <Columns>
        <Cards users={usersData.users} />
      </Columns>
      <Columns>
        <Columns.Column>
          <Pagination current={activePage} total={maxPage} onChange={handleChange} delta={maxPage} />
        </Columns.Column>
      </Columns>
    </>
  );
};

// == Export
export default Results;
