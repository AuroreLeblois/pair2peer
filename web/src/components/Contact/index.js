/* eslint-disable react/jsx-filename-extension */
// == Import npm
import React, { useState } from 'react';
import { Button } from 'react-bulma-components';



const Contact = () => {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newMessage = {
      name,
      email,
      message,
    };

    axios.post(`${API_URI}`)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      // Au cas où erreur avec le serveur, renvoie un console.log
      console.log(err);
    });
};

	return (
  	<div>
      Pour toute question, demande de récupération de mot de passe ou autre <br/>
      <textarea class="form-control" placeholder="Message"></textarea>
      <Button  type="submit" color="success">Envoyer</Button>
    </div>
	);
  
};

export default Contact;
