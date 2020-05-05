// == Import npm
import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, Header, Dropdown } from 'semantic-ui-react';
import { firstLetterToUppercase } from 'src/store/utils';


// == Import component
import ITSkills from './itSkills';

// == Composant
const ProfileEdit = () => {
  let key = 1;
  const { user, filters } = useSelector((state) => state);

  const langOptions = () => (
    filters.language.map((language) => ({
      key: key++,
      text: firstLetterToUppercase(language),
      value: language,
    }))
  );

  console.log(langOptions());

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
            value={user.pseudo}
          />
          <Form.Field
            control={Input}
            name="email"
            label="Email"
            placeholder="Email"
            value={user.email}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="password"
            label="Mot de passe"
            placeholder="Mot de passe"
          />
          <Form.Field
            control={Input}
            name="validePassword"
            label="Confirmer le mot de passe"
            placeholder="Confirmer le mot de passe"
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="country"
            label="Pays"
            placeholder="Pays"
            value={user.country}
          />
          <Form.Field
            control={Input}
            name="city"
            label="Ville"
            placeholder="Ville"
            value={user.city}
          />
        </Form.Group>
        <Form.TextArea
          label="Description"
          name="description"
          placeholder="Parlez-nous un peu de vous ..."
          value={user.description}
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
          options={langOptions()}
          search
          multiple
          selection
          fluid
          allowAdditions
          value={user.language}
          // onAddItem
          // onChange
        />
      </Form>
    </>
  );
};

// == Export
export default ProfileEdit;
