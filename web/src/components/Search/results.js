/* eslint-disable react/jsx-filename-extension */
// == Import npm
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Columns, Pagination } from 'react-bulma-components';

// == import utils/actions
import { API_URI } from 'src/store/utils';
import { getUsersList } from 'src/store/actions';

// == Import component
import Cards from './cards';
import ModalDetails from './ModalDetails';

// == Composant
const Results = ({ setActiveModalDetails }) => {
  const [activePage, setActivePage] = useState(1);
  // pending MaxPage waiting from axios
  const [pendingMaxPage, setPendingMaxPage] = useState(10);
  const [modalUserDetails, setModalUserDetails] = useState(false);

  const { usersData, search } = useSelector((state) => state);

  const maxPage = useSelector((state) => {
    if (!state.usersData.maxPage) {
      return pendingMaxPage;
    }
    return state.usersData.maxPage;
  });

  const history = useHistory()
  const dispatch = useDispatch();

  const handleChange = (page) => {
    setActivePage(page);
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

  return (
    <>
      <Columns>
        <Cards users={usersData.users} setModalUserDetails={setModalUserDetails} />
      </Columns>
      <Columns>
        <Columns.Column>
          <Pagination color="danger" current={activePage} total={maxPage} onChange={handleChange} delta={maxPage} />
        </Columns.Column>
      </Columns>
      <ModalDetails modalUserDetails={modalUserDetails} setModalUserDetails={setModalUserDetails} />
    </>
  );
};

// == Export
export default Results;
