// == Import npm
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, Header, Dropdown, Radio } from 'semantic-ui-react';
import { firstLetterToUppercase } from 'src/store/utils';
import useInputChange from 'src/store/hooks/useInputChange';


// == Import component
import ITSkills from './itSkills';

// == Composant
const ProfileEdit = () => {

  const [input, handleInputChange] = useInputChange();
  const [radioValue, setRadioValue] = useState();
  const [languageValue, setLanguageValue] = useState();
  let key = 1;

  const { user, filters } = useSelector((state) => state);

  const handleRadioChange = (evt, result) => {
    setRadioValue(result.value);
  };

  const onAddLanguage = (evt, { value }) => {
    console.log(value);
  };

  const langOptions = () => (
    filters.language.map((language) => ({
      key: key++,
      text: firstLetterToUppercase(language),
      value: language,
    }))
  );

  return (
    <>
      <Header as="h2" inverted>Editer le profil</Header>
      <Form size="tiny" inverted>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Pseudo"
            placeholder="Pseudo"
            name="pseudo"
            defaultValue={user.pseudo}
            onChange={handleInputChange}
          />
          <Form.Field
            control={Input}
            name="email"
            label="Email"
            placeholder="Email"
            value={user.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="password"
            label="Mot de passe"
            placeholder="Mot de passe"
            onChange={handleInputChange}
          />
          <Form.Field
            control={Input}
            name="validePassword"
            label="Confirmer le mot de passe"
            placeholder="Confirmer le mot de passe"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="country"
            label="Pays"
            placeholder="Pays"
            value={user.country}
            onChange={handleInputChange}
          />
          <Form.Field
            control={Input}
            name="city"
            label="Ville"
            placeholder="Ville"
            value={user.city}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.TextArea
          label="Description"
          name="description"
          placeholder="Parlez-nous un peu de vous ..."
          value={user.description}
          onChange={handleInputChange}
        />
        {/* <Form.Field
          control={Select}
          label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
          placeholder="Gender"
          search
        /> */}
        <ITSkills it_language={user.it_language} it_lvl={user.level} />
        <Header as="h6" inverted>Langues</Header>
        <Dropdown
          placeholder="Langues que vous maîtrisez"
          name="language"
          options={langOptions()}
          search
          multiple
          selection
          fluid
          allowAdditions
          value={user.language}
          onAddItem={onAddLanguage}
          onChange={handleInputChange}
        />

        <Header as="h6" inverted>Quelle méthode de travail préférez-vous ?</Header>
        <Form.Field>
          <Radio
            label="Remote"
            name="remote"
            value="true"
            checked={radioValue === 'true'}
            onChange={handleRadioChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            size="small"
            label="Rencontre"
            name="remote"
            value="false"
            checked={radioValue === 'false'}
            onChange={handleRadioChange}
          />
        </Form.Field>
      </Form>
    </>
  );
};

// == Export
export default ProfileEdit;
