/* eslint-disable no-plusplus */
// == Import npm
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { firstLetterToUppercase } from 'src/store/utils';
import { syncSearchInputs } from 'src/store/actions';
import { Form, Columns, Container, Content } from 'react-bulma-components';

// == Import

// == Composant
const Filter = () => {
  const dispatch = useDispatch();
  // const [countryValue, setCountryValue] = useState();
  // const [cityOptions, setCityOptions] = useState([]);
  // const [itOptions, setItOptions] = useState();

  // Key to increment for select inputs
  const { filters, search } = useSelector((state) => state);

  // const handleCountryChange = (evt) => {
  //   evt.preventDefault();
  //   const target = evt.target
  //   setCountryValue(target.value);
  // };

  // const handleItChange = (evt) => {
  //   evt.preventDefault();
  //   const target = evt.target
  //   setItOptions(target.value);
  // };

  // const getArrayFromLocalisation = useCallback(() => {
  //   const cityArray = [];
  //   if (search.country) {
  //     const country = filters.localisation.filter((localisation) => (
  //       localisation.country === search.country
  //     ));
  //     const city = country.map((obj) => obj.city.map((city) => cityArray.push(city)));
  //     setCityOptions(cityArray);
  //   }
  //   return null;
  // }, [search.country, filters.localisation]);

  // useEffect(() => {
  //   setCityOptions(getArrayFromLocalisation);
  // }, [getArrayFromLocalisation]);

  // Object for city select input options
  // const CityOptions = () => {
  //   return filters.localisation.map((city) => (
  //     <option key={city} name={city} value={city}>{firstLetterToUppercase(city)}</option>
  //   ));
  // };

  // Object for country select input options
  const CountryOptions = () => {
    if (filters.localisation) {
      return filters.localisation.map((localisation) => (
        <option key={localisation.country} name={localisation.country} value={localisation.country}>{firstLetterToUppercase(localisation.country)}</option>
      ));
    }
    return null;
  };

  // Object for it_language select input options
  const ItOptions = () => {
    if (filters.it_language) {
      return filters.it_language.map((language) => (
        <option key={language} value={language}>{firstLetterToUppercase(language)}</option>
      ));
    }
    return null;
  };

  // Object for language select input options
  const LangOptions = () => {
    if (filters.language) {
      return filters.language.map((language) => (
        <option key={language} value={language}>{firstLetterToUppercase(language)}</option>
      ));
    }
    return null;
  };
  const LvlOptions = () => {
    return (
      <>
        <option key="1" value="">{null}</option>
        <option key="2" value="1">1</option>
        <option key="3" value="2">2</option>
        <option key="4" value="3">3</option>
        <option key="5" value="4">4</option>
        <option key="6" value="5">5</option>
        <option key="7" value="6">6</option>
        <option key="8" value="7">7</option>
        <option key="9" value="8">8</option>
        <option key="10" value="9">9</option>
        <option key="11" value="10">10</option>
      </>
    );
  };


  // Object for remote select input options
  const RemoteOptions = () => (
    <>
      <option value="">{null}</option>
      <option value="true">Remote</option>
      <option value="false">Rencontre</option>
    </>
  );

  const handleChange = (evt) => {
    const target = evt.target;
    dispatch(syncSearchInputs(target.name, target.value));
  };

  return (
    <form>
      <Form.Field>
        <Form.Field.Body>
          <Form.Field>
            <Form.Control>
              <Form.Label>Langue</Form.Label>
              <Form.Select name="language" value={search.language} onChange={handleChange}>
                <option value="">{null}</option>
                <LangOptions />
              </Form.Select>
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Control>
              <Form.Label>Technologie</Form.Label>
              <Form.Select name="it_language" value={search.it_language} onChange={handleChange}>
                <option value="">{null}</option>
                <ItOptions />
              </Form.Select>
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Control>
              <Form.Label>Niveau</Form.Label>
              <Form.Select name="level" value={search.level} onChange={handleChange}>
                <LvlOptions />
              </Form.Select>
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Control>
              <Form.Label>Pays</Form.Label>
              <Form.Select name="country" value={search.country} onChange={handleChange}>
                <option value="">{null}</option>
                <CountryOptions />
              </Form.Select>
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Control>
              <Form.Label>Ville</Form.Label>
              <Form.Input name="city" value={search.city} onChange={handleChange} />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Control>
              <Form.Label>Mode de travail</Form.Label>
              <Form.Select name="remote" value={search.remote} onChange={handleChange}>
                <RemoteOptions />
              </Form.Select>
            </Form.Control>
          </Form.Field>
        </Form.Field.Body>
      </Form.Field>
    </form>
  );
};

// == Export
export default Filter;
