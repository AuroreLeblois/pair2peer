/* eslint-disable no-plusplus */
// == Import npm
import React, { useEffect } from 'react';
import { Button, Form, Input, Select, Grid } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { firstLetterToUppercase, API_URI } from 'src/store/utils';
import { syncSearchInputs, actions, getFiltersList } from 'src/store/actions';

// == Import

// == Composant
const Filter = () => {
  const dispatch = useDispatch();

  // Req to get filters list
  const getFilters = () => {
    axios.get(
      `${API_URI}/search?page_nb=1&user_nb=12`,
      { withCredentials: true },
    )
      .then((res) => {
        const data = res.data;
        console.log(data)
        const filtersList = {};
        filtersList.it_language = data.it_language;
        filtersList.language = data.language;
        filtersList.localisation = data.localisation;
        dispatch(getFiltersList(filtersList));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(getFilters, []);

  // Key to increment for select inputs
  let key = 1;

  const { filters } = useSelector((state) => state);

  // Object for it_language select input options
  const itOptions = () => (filters.it_language.map((language) => ({
    key: key++,
    text: firstLetterToUppercase(language),
    value: language,
  })));

  // Object for language select input options
  const langOptions = () => (filters.language.map((language) => ({
    key: key++,
    text: firstLetterToUppercase(language),
    value: language,
  })));

  // Object for level select input options
  const lvlOptions = [
    { key: '1', text: '1', value: '1' },
    { key: '2', text: '2', value: '2' },
    { key: '3', text: '3', value: '3' },
    { key: '4', text: '4', value: '4' },
    { key: '5', text: '5', value: '5' },
    { key: '6', text: '6', value: '6' },
    { key: '7', text: '7', value: '7' },
    { key: '8', text: '8', value: '8' },
    { key: '9', text: '9', value: '9' },
    { key: '10', text: '10', value: '10' },
  ];

  // Object for remote select input options
  const remoteOptions = [
    { key: '1', text: 'Remote', value: 'true' },
    { key: '2', text: 'Rencontre', value: 'false' },
  ];

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch({ type: actions.SUBMIT_FILTERS_SEARCH });
  };

  const handleChange = (evt, { name, value }) => {
    dispatch(syncSearchInputs(name, value));
  };

  return (
    <Form size="mini" inverted onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Field>
          <Select
            name="language"
            options={langOptions()}
            placeholder="Langue"
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Select
            name="it_language"
            options={itOptions()}
            placeholder="Technologie"
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Select
            name="level"
            options={lvlOptions}
            placeholder="Niveau"
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            name="country"
            placeholder="Pays"
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            name="city"
            placeholder="Ville"
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Select
            name="remote"
            options={remoteOptions}
            placeholder="Remote"
            onChange={handleChange}
          />
        </Form.Field>
      </Form.Group>
    </Form>
  );
};

// == Export
export default Filter;
